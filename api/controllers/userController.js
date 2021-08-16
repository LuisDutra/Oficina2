const UserModel = require("../models/userModel");
const PlantModel = require("../models/plantModel");
const CategoryModel = require("../models/CategoryModel");

const infoUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.userId });

  res.send({ user });
};

const getById = async ({ query }, res) => {
  const user = await UserModel.findOne({ _id: query.userId });

  res.send({ user });
};

const getByName = async ({ query }, res) => {
  const userName = query.userName;

  const user = await UserModel.find({
    "$or": [
        { "name.first": { '$regex': userName, '$options': 'i' } },
        { "name.last": { '$regex': userName, '$options': 'i' } }
    ]
  });

  if(!user || user.length === 0) {
    return res.status(400).json({ success: false, message: 'no users were found' });
  }

  return res.json({ success: true, message: 'users found in database', user });
};

const updateUser = async ({ userId, body }, res) => {
  const user = await UserModel.findOneAndUpdate({ _id: userId }, body, {new: true});
  console.log(user)

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

const addWish = async (req, res) => {
  const userId = req.userId;
  const wishId = req.query.categoryId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  if (!wishId) {
    return res.status(400).json({ success: false, message: 'invalid wish' });
  }

  if(!await UserModel.findOne({ _id: userId })) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  const wish = await CategoryModel.findOne({ _id: wishId });

  if(!wish) {
    return res.status(400).json({ success: false, message: 'invalid wish' });
  }

  if(await UserModel.findOne({ _id: userId, wishlist: wishId })) {
    return res.status(400).json({ success: false, message: 'wish already added to profile' });
  }

  const userUpdate = await UserModel.findByIdAndUpdate(userId, { $push: { wishlist: [wishId] }}, { new: true, upsert: true });

  return res.json({ message: "interesse adicionado", userUpdate });
};

const deleteWish = async (req, res) => {
  const userId = req.userId;
  const wishId = req.query.categoryId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  if (!wishId) {
    return res.status(400).json({ success: false, message: 'invalid wish' });
  }

  if(!await UserModel.findOne({ _id: userId })) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  const wish = await CategoryModel.findOne({ _id: wishId });

  if(!wish) {
    return res.status(400).json({ success: false, message: 'invalid wish' });
  }

  if(await UserModel.findOne({ _id: userId, wishlist: wishId })) {
    const userUpdate = await UserModel.findByIdAndUpdate(userId, { $pull: { wishlist: wish.id }}, { new: true, upsert: true });

    return res.json({ message: "interesse deletado", userUpdate });
  }
}

const getUserWishes = async({ query }, res) => {
  const userId = query.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'must provide an id' });
  }

  const user = await UserModel.findOne({ _id: userId }, {wishlist: 1});

  if (!user) {
    return res.status(401).json({ success: false, message: 'user not found' });
  }

  const wish = await CategoryModel.find({_id: {$in: user.wishlist}});

  return res.json({ wish });
}

exports.info = infoUser;
exports.getById = getById;
exports.getByName = getByName;
exports.update = updateUser;
exports.delete = deleteUser;
exports.deletePlant = deletePlant;
exports.addPlant = addPlant;
exports.getUserPlants = getUserPlants;
exports.addWish = addWish;
exports.getWishes = getUserWishes;
exports.deleteWish = deleteWish;