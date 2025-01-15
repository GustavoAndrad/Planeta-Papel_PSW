const mongoose = require('mongoose');

// Schema do Pedido
const pedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  items: [
    {
      nome: { type: String, required: true },
      qtd: { type: String, required: true }
    }
  ],
  outros: [
    {
      nome: { type: String, required: true },
      qtd: { type: String, required: true }
    }
  ],
  modalidade: { type: String, required: true },
  data: { type: Date, required: true },
  analise: {
    data: { type: Date },
    status: { type: Boolean },
    motivoNegacao: { type: String }
  }
});

// Criar o modelo com base no schema
const Pedido = mongoose.model('Pedido', pedidoSchema);

// Exportar o modelo
module.exports = Pedido;