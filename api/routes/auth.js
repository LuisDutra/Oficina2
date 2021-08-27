const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/forgot",(req, res) => authController.forgotPassword(req, res));

module.exports = router;