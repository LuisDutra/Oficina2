const PlantModel = require("../models/plantModel");
const UserModel = require("../models/userModel");

const getById = async ({ query }, res) => {
  const plant = await PlantModel.findOne({ _id: query.plantId });

  res.send({ plant });
};

const getAll = async ({}, res) => {
  const plants = await PlantModel.find();

  res.send({ plants });
};

const getByName = async ({ query }, res) => {
  const plantName = query.plantName;

  const plants = await PlantModel.find({
    "$or": [
        { name: { '$regex': plantName, '$options': 'i' } },
        { popularNames: { '$regex': plantName, '$options': 'i' } },
        { scientificName: { '$regex': plantName, '$options': 'i' } }
    ]
  });

  if(!plants || plants.length === 0) {
    return res.status(400).json({ success: false, message: 'no plants were found' });
  }

  return res.json({ success: true, message: 'plants found in database', plants });
};

const registerPlant = async ({ body }, res) => {
  try{
    const plant = await PlantModel.create(body);

    return res.json({ message: "planta registrada com sucesso", plant });
  } catch(err) {
    return res.status(400).send({ message: "Falha ao registrar planta" });
  }
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

  const plant = await PlantModel.findOneAndUpdate(req.params.id, req.body, {new: true});

  return res.json({ message: "planta atualizada com sucesso", plant });
};

exports.info = getById;
exports.register = registerPlant;
exports.update = updatePlant;
exports.getAll = getAll;
exports.getByName = getByName;