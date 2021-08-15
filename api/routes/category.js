const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryController");

router.use(authMiddleware);

router.post("/register", categoryController.register);
router.put("/update", categoryController.update);
router.get("/info", categoryController.getById);
router.get("/all", categoryController.all);
router.delete("/delete", categoryController.delete);

module.exports = router;