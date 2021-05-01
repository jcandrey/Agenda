const notesCtrl = {};
const NotaModel = require("../models/note");

notesCtrl.getNotes = async (req, res) => {
  const notas = await NotaModel.find();
  res.json(notas);
};

notesCtrl.getNote = async (req, res) => {
  const { id } = req.params;
  const nota = await NotaModel.findById(id);
  res.json(nota);
};

notesCtrl.createNote = async (req, res) => {
  const { titulo, cuerpo, autor, fecha } = req.body;
  const nuevaNota = new NotaModel({
    titulo,
    cuerpo,
    autor,
    fecha,
  });
  await nuevaNota.save();
  res.json(nuevaNota);
};

notesCtrl.deleteNote = async (req, res) => {
  const { id } = req.params;
  await NotaModel.findByIdAndDelete(id);
  res.json({ messaje: "Nota eliminada" });
};

notesCtrl.updateNote = async (req, res) => {
  const { id } = req.params;
  const notaUpdate = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    autor: req.body.autor,
  };
  await NotaModel.findByIdAndUpdate(id, notaUpdate);
  res.json({ messaje: "Nota actualizada" });
};

module.exports = notesCtrl;
