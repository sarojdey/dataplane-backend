const mongoose = require("mongoose");
const commentSchema = require("./comment.model.js");

const ticketSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    ticketNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    issueType: {
      type: String,
      required: true,
    },
    severity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    waitingOn: {
      type: String,
      required: true,
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;
