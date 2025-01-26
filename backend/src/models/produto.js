const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: [true, "O nome é obrigatório"], 
    unique: [true, "O nome deve ser único"] 
  },
  preco: { 
    type: Number,
    required: [true, "O nome é obrigatório"], 
  },
  descricao: { 
    type: String, 
    required: false,
    default: ""
  },
  imagem: {
    type: [{
        type: String,
        trim: true,
    }],
    validate: {
        validator: function(arr) {
            return (arr.length <= 3) && (arr.length>0);
        },
        message: 'Deve haver, nó maximo, 3 e imagen e, no mínimo, 1'
    },
    required: true
  },
  qntDisponivel: { 
    type: Number,
    required: [true, "A quantidade disponível é obrigatória"], 
  },
  categoria: { 
    type: String, 
    required: [true, "A categoria é obrigatória"], 
  },

}, { timestamps: true, toJSON: { virtuals: true, transform: docToJsonTransform }, toObject: { virtuals: true, transform: docToJsonTransform }, versionKey: false });

// Transforma o campo `_id` para `id` nas consultas
function docToJsonTransform(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  return ret;
}

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
