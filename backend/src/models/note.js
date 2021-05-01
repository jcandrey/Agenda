const { Schema, model } = require("mongoose");

const notaSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  cuerpo: {
    type: String,
    required: true,
    trim: true,
  },
  autor: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Nota", notaSchema);
