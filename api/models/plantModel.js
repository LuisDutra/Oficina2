const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
 name: String,
 popularNames: [{type: String}],
 scientificName: String,
 description: String,
 instructions: {
     sow: String,
     space: String,
     harvest: String
 },
 hints: String,
 culinaryHints: String,
 picture: mongoose.ObjectId,
 createAt: { type: Date, default: Date.now },
 updateAt: {type: Date, default: Date.now },
});

const PlantModel = mongoose.model("Plant", PlantSchema);

module.exports = PlantModel;