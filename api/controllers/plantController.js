const PlantModel = require("../models/plantModel");

const registerPlant = async ({ body }, res) => {
    const plant = await PlantModel.create(body);

    return res.json({ message: "planta registrada com sucesso", plant });
};

const updatePlant = async ({ params, body }, res) => {
  const plant = await PlantModel.findOneAndUpdate(params.id, body);

  return res.json({ message: "planta atualizada com sucesso", plant });
};

exports.register = registerPlant;
exports.update = updatePlant;