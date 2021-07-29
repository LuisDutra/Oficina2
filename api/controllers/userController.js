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

  if(!await UserModel.findOne({ _id: userId })) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  const plant = await PlantModel.findOne({ _id: plantId });

  if(!plant) {
    return res.status(400).json({ success: false, message: 'invalid plant' });
  }

  if(await UserModel.findOne({ _id: userId, plants: plantId })) {
    return res.status(400).json({ success: false, message: 'plant already added to profile' });
  }

  const userUpdate = await UserModel.findByIdAndUpdate(userId, { $push: { plants: [plant._id] }}, { new: true, upsert: true });

  return res.json({ message: "planta adicionada", userUpdate });
};

const deletePlant = async (req, res) => {
  const userId = req.userId;
  const plantId = req.query.plantId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  if (!plantId) {
    return res.status(400).json({ success: false, message: 'invalid plant' });
  }

  if(!await UserModel.findOne({ _id: userId })) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  const plant = await PlantModel.findOne({ _id: plantId });

  if(!plant) {
    return res.status(400).json({ success: false, message: 'invalid plant' });
  }

  if(await UserModel.findOne({ _id: userId, plants: plantId })) {
    const userUpdate = await UserModel.findByIdAndUpdate(userId, { $pull: { plants: plant._id }}, { new: true, upsert: true });

    return res.json({ message: "planta deletada", userUpdate });
  }
};

const getUserPlants = async(req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'must provide an id' });
  }

  const user = await UserModel.findOne({ _id: req.userId }, {plants: 1});

  if (!user) {
    return res.status(401).json({ success: false, message: 'user not found' });
  }

  const plants = await PlantModel.find({_id: {$in: user.plants}});

  return res.json({ plants });
}

exports.info = infoUser;
exports.update = updateUser;
exports.delete = deleteUser;
exports.deletePlant = deletePlant;
exports.addPlant = addPlant;
exports.getUserPlants = getUserPlants;