const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
 user_id: mongoose.ObjectId,
 plant_id: mongoose.ObjectId,
 image: {
     data: Buffer,
     contentType: String       
 },
 createAt: { type: Date, default: Date.now },
 updateAt: {type: Date, default: Date.now },
});

const PlantModel = mongoose.model("Plant", PlantSchema);

module.exports = PlantModel;