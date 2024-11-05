const express = require("express");
const {
  postTicket,
  getAllTickets,
  getTicket,
  updateTicketDetails,
  updateTicketPeople,
  updateTicketDescription,
} = require("../controllers/ticket.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const router = express.Router();

router.post("/postTicket", verifyToken, postTicket);
router.get("/getAllTickets", verifyToken, getAllTickets);
router.get("/getTicket/:ticketId", verifyToken, getTicket);
router.put("/updateTicketDetails/:ticketId", verifyToken, updateTicketDetails);
router.put("/updateTicketPeople/:ticketId", verifyToken, updateTicketPeople);
router.put(
  "/updateTicketDescription/:ticketId",
  verifyToken,
  updateTicketDescription
);

module.exports = router;
