const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  birth: {type: Date},
  name: {   
      first: {type: String, required: true},
      last: {type: String, required: true }
    },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, select: false, required: true },
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  location: {
      city: String,
      address: String,
      zipcode: String,  
    },
  wishlist: [mongoose.ObjectId],
  plants: [mongoose.ObjectId],
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;