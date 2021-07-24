const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  birth: {type: Date, required: true},
  name: {   
            first: String,
            last: String 
        },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, select: false, required: true },
  isActive: { type: Boolean, default: true },
  isAdmin: Boolean,
  location: {
      city: String,
      address: String,
      zipcode: String,  
    },
  whishlist: [mongoose.ObjectId],
  plants: [mongoose.ObjectId],
  createAt: { type: Date, default: Date.now },
  updateAt: {type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;