const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.use(authMiddleware);

router.get("/info", userController.info);
router.get("/plants", userController.getUserPlants);
router.post("/update", userController.update);
router.delete("/delete", userController.delete);
router.put("/addPlant", userController.addPlant);

module.exports = router;