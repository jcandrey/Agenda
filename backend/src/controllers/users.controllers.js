const usersCtrl = {};
const UserModel = require("../models/user");

usersCtrl.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

usersCtrl.getUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  res.json(user);
};

usersCtrl.createUser = async (req, res) => {
  const { nombre, apellido, email } = req.body;
  const nuevoUser = new UserModel({
    nombre,
    apellido,
    email,
  });
  await nuevoUser.save();
  res.json(nuevoUser);
};

usersCtrl.deleteUser = async (req, res) => {
  const { id } = req.params;
  await UserModel.findByIdAndDelete(id);
  res.json({ messaje: "Usuario eliminado" });
};

usersCtrl.updateUser = async (req, res) => {
  const { id } = req.params;
  const userUpdate = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
  };
  await UserModel.findByIdAndUpdate(id, userUpdate);
  res.json({ messaje: "Usuario actualizada" });
};

module.exports = usersCtrl;
