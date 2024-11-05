const express = require("express");
const { updateUserDetails } = require("../controllers/user.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.put("/updateUserDetails", verifyToken, updateUserDetails);

module.exports = router;
