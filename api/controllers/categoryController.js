const CategoryModel = require("../models/CategoryModel");
const UserModel = require("../models/userModel");

const getAll = async ({}, res) => {
    const category = await CategoryModel.find();

    res.send({ category });
}

const getById = async ({ query }, res) => {
  const category = await CategoryModel.findOne({ _id: query.categoryId });

  if(!category || category.length === 0) {
    return res.status(400).json({ success: false, message: 'no categories were found' });
  }

  return res.json({ success: true, message: 'categories found in database', category });
}

const registerCategory = async (req, res) => {
  const userId = req.userId;
  const body = req.body;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  if(!user.isAdmin) {
    return res.status(401).json({ success: false, message: 'this user is not admin' });
  }

  if(body.name.length == 0){
    return res.status(400).json({ success: false, message: 'unnamed category' });
  }

  const uscategoryExistser = await CategoryModel.findOne({name: {'$regex' : '^'+body.name+'$', '$options' : 'i'}})

  if(uscategoryExistser){
    return res.status(400).json({ success: false, message: 'category already exists', uscategoryExistser });
  }

  try{
    const category = await CategoryModel.create(body);

    return res.status(400).json({ success: true, message: "Categoria registrada com sucesso", category });
  } catch(err) {
    return res.status(400).json({ success: false, message: "Falha ao registrar categoria", errors: err.message });
  }
};

const updateCategory = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  if(!user.isAdmin) {
    return res.status(401).json({ success: false, message: 'this user is not admin' });
  }

  const category = await CategoryModel.findOneAndUpdate(req.params.id, req.body, { new: true });

  return res.json({ message: "Categoria atualizada com sucesso", category });
};

const deleteCategory = async (req, res) => {
  const userId = req.userId;
  const categoryId = req.query.categoryId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  const user = await UserModel.findOne({ _id: userId });

  if(!user) {
    return res.status(401).json({ success: false, message: 'invalid authentication' });
  }

  if(!user.isAdmin) {
    return res.status(401).json({ success: false, message: 'this user is not admin' });
  }

  if (!categoryId) {
    return res.status(400).json({ success: false, message: 'invalid category' });
  }

  try{
    const category = await CategoryModel.findOne({ _id: categoryId });

    if(!category) {
      return res.status(400).json({ success: false, message: "invalid category"});
    }
    const categoryDelete = await CategoryModel.findOneAndDelete(categoryId);

    return res.json({ message: "categoria deletada", categoryDelete });
  } catch(err) {
    return res.status(400).json({ success: false, message: "Falha ao deletar categoria", errors: err.message });
  }
};

exports.all = getAll;
exports.getById = getById;
exports.register = registerCategory;
exports.update = updateCategory;
exports.delete = deleteCategory;