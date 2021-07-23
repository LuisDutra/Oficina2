const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.use(authMiddleware);

router.get("/info", userController.info);
router.post("/update", userController.update);
router.delete("/delete", userController.delete);

module.exports = router;