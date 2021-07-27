const PlantModel = require("../models/plantModel");
const UserModel = require("../models/userModel");

const registerPlant = async ({ body }, res) => {
    const plant = await PlantModel.create(body);

    return res.json({ message: "planta registrada com sucesso", plant });
};

const updatePlant = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  const user = await UserModel.findOne({ _id: userId });

  if(!user.isAdmin) {
    return res.status(401).json({ success: false, message: 'this user is not admin' });
  }

  const plant = await PlantModel.findOneAndUpdate(req.params.id, req.body);

  return res.json({ message: "planta atualizada com sucesso", plant });
};

exports.register = registerPlant;
exports.update = updatePlant;