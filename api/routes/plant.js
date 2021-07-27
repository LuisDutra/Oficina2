const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const plantController = require("../controllers/plantController");

router.use(authMiddleware);

router.get("/info", plantController.info);
router.post("/register", plantController.register);
router.put("/update", plantController.update);

module.exports = router;