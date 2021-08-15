const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.use(authMiddleware);

router.get("/info", userController.info);
router.get("/getById", userController.getById);
router.get("/getByName", userController.getByName);
router.get("/plants", userController.getUserPlants);
router.put("/update", userController.update);
router.delete("/delete", userController.delete);
router.delete("/deletePlant", userController.deletePlant)
router.put("/addPlant", userController.addPlant);
router.put("/addWish", userController.addWish);
router.get("/getWishes", userController.getWishes);
router.delete("/deleteWish", userController.deleteWish);

module.exports = router;