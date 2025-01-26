const mongoose = require('mongoose');

const planoSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  preco: { 
    type: Number, 
    required: true 
  },
  duracao: { 
    type: Number, 
    required: true 
  },
  desconto: { 
    type: Number, 
    required: true 
  },
  beneficios: { 
    type: [String], 
    required: true 
  }
}, { timestamps: true, toJSON: { virtuals: true, transform: docToJsonTransform }, toObject: { virtuals: true, transform: docToJsonTransform }, versionKey: false });

// Transforma o campo `_id` para `id` nas consultas
function docToJsonTransform(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  return ret;
}

const Plano = mongoose.model('Plano', planoSchema);

module.exports = Plano;
