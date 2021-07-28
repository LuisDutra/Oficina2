const UserModel = require("../models/userModel");
const PlantModel = require("../models/plantModel");

const infoUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.userId });

  res.send({ user });
};

const updateUser = async ({ params, body }, res) => {
  const user = await UserModel.findOneAndUpdate(params.id, body, {new: true});

  return res.json({ message: "usuário atualizado", user });
};

const deleteUser = async ({ params }, res) => {
  await UserModel.findOneAndRemove(params.id);

  return res.json({ message: "usuário excluído" });
};

const addPlant = async (req, res) => {
  const userId = req.userId;
  const plantId = req.query.plantId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  if (!plantId) {
    return res.status(400).json({ success: false, message: 'invalid plant' });
  }

  const user = await UserModel.findOne({ _id: userId });

  if(!user) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  const plant = await PlantModel.findOne({ _id: plantId });

  if(!plant) {
    return res.status(400).json({ success: false, message: 'invalid plant' });
  }

  const userPlant = await UserModel.find({ _id: userId, plants: { $in: [plantId] } });

  if(userPlant) {
    return res.status(400).json({ success: false, message: 'plant already added to profile' });
  }

  const userUpdate = await UserModel.findByIdAndUpdate(userId, { $push: { plants: [plant._id] }}, { new: true, upsert: true });

  return res.json({ message: "planta adicionada", userUpdate });
};

exports.info = infoUser;
exports.update = updateUser;
exports.delete = deleteUser;
exports.addPlant = addPlant;