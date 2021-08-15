const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    createAt: { type: Date, default: Date.now },
    updateAt: {type: Date, default: Date.now },
});

CategorySchema.index({name: 'text'});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;