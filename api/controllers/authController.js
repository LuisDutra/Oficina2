const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailer = require("../../api/modules/mailer");

const UserModel = require("../models/userModel");
const authConfig = require("../config/auth.json");

const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
};

const generateHash = async (value) => await bcript.hash(value, 10);

const registerAuth = async ({ body }, res) => {
  const { email, password } = body;

  try {
    if (await UserModel.findOne({ email })) {
      return res.status(400).send({ message: "Usuário já existe" });
    }

    body.password = await generateHash(password);

    const user = await UserModel.create(body);
    const token = generateToken({ id: user.id });

    user.password = undefined;

    return res.send({ user, token });
  } catch (err) {
    return res.status(400).send({ message: "Falha ao registrar usuário" });
  }
};

const loginAuth = async ({ body }, res) => {
  const { email, password } = body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    res.status(400).send({ message: "Usuário não encontrado" });
  }

  if (!(await bcript.compare(password, user.password))) {
    res.status(400).send({ message: "Usuário ou senha inválida" });
  }

  const token = generateToken({ id: user.id });

  user.password = undefined;

  return res.send({ user, token });
};

const forgotPassword = async ( req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if(!user)
      return res.status(400).send({ error: 'User not found'});

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await UserModel.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    });

    mailer.sendMail({
      to: email,
      from: 'luisvinicius99@hotmail.com',
      template: 'auth/forgot_password',
      context: { token },
    }, (err) => {
      if (err)
        console.log(err)
        return res.status(400).send({ error: 'Cannot send forgot password email'});

      return res.send();  
    })
  } catch (err){
    console.log(err)
    res.status(400).send({erro: 'Erro on forgot password, try again'})
  }
}
// 17:47

exports.forgotPassword = forgotPassword;
exports.register = registerAuth;
exports.login = loginAuth;