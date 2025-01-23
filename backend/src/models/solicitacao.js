const mongoose = require('mongoose');

// Schema da Solicitacao
const solicSchema = new mongoose.Schema({
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
},
{ timestamps: true, toJSON: { virtuals: true, transform: docToJsonTransform }, toObject: { virtuals: true, transform: docToJsonTransform }, versionKey: false }
);

// Transforma o campo `_id` para `id` nas consultas
function docToJsonTransform(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  return ret;
}

// Criar o modelo com base no schema
const Solicitacao = mongoose.model('Solicitacao', solicSchema);

// Exportar o modelo
module.exports = Solicitacao;