const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const reportController = require("../controllers/reportController");

router.use(authMiddleware);

router.get("/reportPlants", reportController.reportPlants);

module.exports = router;