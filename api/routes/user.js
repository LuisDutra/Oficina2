const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.use(authMiddleware);

router.get("/info", userController.info);
router.get("/getById", userController.getById);
router.get("/getByName", userController.getByName);
router.get("/plants", userController.getUserPlants);
router.post("/update", userController.update);
router.delete("/delete", userController.delete);
router.delete("/deletePlant", userController.deletePlant)
router.put("/addPlant", userController.addPlant);

module.exports = router;