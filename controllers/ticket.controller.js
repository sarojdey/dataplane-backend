const Ticket = require("../models/ticket.model.js");
const Counter = require("../models/counter.model.js");

const postTicket = async (req, res) => {
  try {
    const body = req.body;

    const counter = await Counter.findOneAndUpdate(
      { id: "autoVal" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, useFindAndModify: false }
    );

    const ticketNumber = counter.seq;

    if (
      !body.id ||
      !body.product ||
      !body.version ||
      !body.summary ||
      !body.issueType ||
      !body.waitingOn ||
      !body.reporter ||
      !body.assignee ||
      !body.status ||
      !body.severity ||
      !body.description
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const value = {
      id: body.id,
      ticketNumber: ticketNumber,
      product: body.product,
      version: body.version,
      summary: body.summary,
      issueType: body.issueType,
      waitingOn: body.waitingOn,
      reporter: body.reporter,
      assignee: body.assignee,
      status: body.status,
      severity: body.severity,
      description: body.description,
    };

    const result = await Ticket.create(value);

    updatedTicket = await Ticket.findById(result._id)
      .populate({
        path: "comments.user",
        select: "firstName lastName avatar",
      })
      .populate({
        path: "reporter",
        select: "firstName lastName avatar",
      });
    return res.status(201).send(updatedTicket);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "An error occurred" });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .populate({
        path: "comments.user",
        select: "firstName lastName avatar",
      })
      .populate({
        path: "reporter",
        select: "firstName lastName avatar",
      });

    return res.status(200).send(tickets);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "An error occurred" });
  }
};

const getTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId)
      .populate({
        path: "comments.user",
        select: "firstName lastName avatar",
      })
      .populate({
        path: "reporter",
        select: "firstName lastName avatar",
      });

    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    return res.status(200).send(ticket);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "An error occurred" });
  }
};

const updateTicketDetails = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { product, version, summary, issueType, severity } = req.body;

    if (!product || !version || !summary || !issueType || !severity) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        product,
        version,
        summary,
        issueType,
        severity,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    const ticket = await Ticket.findById(updatedTicket._id)
      .populate({
        path: "comments.user",
        select: "firstName lastName avatar",
      })
      .populate({
        path: "reporter",
        select: "firstName lastName avatar",
      });

    return res.status(200).send(ticket);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "An error occurred" });
  }
};

const updateTicketPeople = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status, waitingOn, assignee } = req.body;

    if (!status || !waitingOn || !assignee) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status,
        waitingOn,
        assignee,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).send({ error: "Ticket not found" });
    }
    const ticket = await Ticket.findById(updatedTicket._id)
      .populate({
        path: "comments.user",
        select: "firstName lastName avatar",
      })
      .populate({
        path: "reporter",
        select: "firstName lastName avatar",
      });

    return res.status(200).send(ticket);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "An error occurred" });
  }
};

const updateTicketDescription = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).send({ error: "Description required" });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        description,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    const ticket = await Ticket.findById(updatedTicket._id)
      .populate({
        path: "comments.user",
        select: "firstName lastName avatar",
      })
      .populate({
        path: "reporter",
        select: "firstName lastName avatar",
      });
    return res.status(200).send(ticket);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "An error occurred" });
  }
};

module.exports = {
  postTicket,
  getAllTickets,
  getTicket,
  updateTicketDetails,
  updateTicketPeople,
  updateTicketDescription,
};
