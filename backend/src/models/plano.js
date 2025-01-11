const mongoose = require('mongoose');

const planoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  duracao: { type: Number, required: true },
  desconto: { type: Number, required: true },
  beneficios: { type: [String], required: true }
});

const Plano = mongoose.model('Plano', planoSchema);

module.exports = Plano;
