const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    birth: { type: Date },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, select: false, required: true },
    img: { type: String },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    location: {
      city: String,
      address: String,
      zipcode: String,
    },
    wishlist: [mongoose.ObjectId],
    plants: [mongoose.ObjectId],
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
