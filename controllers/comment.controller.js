const Ticket = require("../models/ticket.model.js");

const addComment = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).send({ error: "userId and content are required" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    const comment = {
      commentId: ticket.commentCount + 1,
      user: userId,
      content,
      createdAt: new Date(),
    };

    ticket.comments.push(comment);
    ticket.commentCount += 1;
    await ticket.save();

    const updatedTicket = await Ticket.findById(ticketId)
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

const updateComment = async (req, res) => {
  try {
    const { ticketId, commentId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).send({ error: "userId and content are required" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    const comment = ticket.comments.find(
      (comment) => comment.commentId === Number(commentId)
    );
    if (!comment) {
      return res.status(404).send({ error: "Comment not found" });
    }

    comment.user = userId;
    comment.content = content;
    comment.updatedAt = new Date();

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticketId)
      .populate({
        path: "comments.user",
        select: "firstName lastName avatar",
      })
      .populate({
        path: "reporter",
        select: "firstName lastName avatar",
      });

    return res.status(200).send(updatedTicket);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ error: "An error occurred" });
  }
};

module.exports = {
  addComment,
  updateComment,
};
