const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
 name: String,
 popularNames: [{ type: String }],
 scientificName: String,
 description: String,
 instructions: {
     sow: String,
     space: String,
     harvest: String
 },
 hints: String,
 culinaryHints: String,
 img: String,
 picture: mongoose.ObjectId,
 isApproved: { type: Boolean, default: false },
 isActive: { type: Boolean, default: true },
 createAt: { type: Date, default: Date.now },
 updateAt: {type: Date, default: Date.now },
});

PlantSchema.index({name: 'text', popularNames: 'text', scientificName: 'text'});

const PlantModel = mongoose.model("Plant", PlantSchema);

module.exports = PlantModel;