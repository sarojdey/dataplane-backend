const express = require("express");
const {
  login,
  logout,
  signup,
  checkAuth,
} = require("../controllers/auth.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
