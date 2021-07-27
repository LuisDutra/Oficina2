const UserModel = require("../models/userModel");

const infoUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.userId });

  res.send({ user });
};

const updateUser = async ({ params, body }, res) => {
  const user = await UserModel.findOneAndUpdate(params.id, body, {new: true});

  return res.json({ message: "usuário atualizado", user });
};

const deleteUser = async ({ params }, res) => {
  await UserModel.findOneAndRemove(params.id);

  return res.json({ message: "usuário excluído" });
};

exports.info = infoUser;
exports.update = updateUser;
exports.delete = deleteUser;