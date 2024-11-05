const express = require("express");
const {
  addComment,
  updateComment,
} = require("../controllers/comment.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.post("/addComment/:ticketId", verifyToken, addComment);

router.put("/updateComment/:ticketId/:commentId", verifyToken, updateComment);

module.exports = router;
