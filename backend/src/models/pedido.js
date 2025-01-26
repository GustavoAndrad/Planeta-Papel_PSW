const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    cliente: {
        type: String,
        required: [true, "O cliente é obrigatório"],
    },
    produtos: [
        {
            nome: { type: String, required: true },
            quantidade: { type: Number, required: true },
            preco: { type: Number, required: true },
        },
    ],
    total: {
        type: Number,
        required: [true, "O total é obrigatório"],
    },
    metodoPagamento: {
        type: String,
        required: [true, "O método de pagamento é obrigatório"],
    },
    status: {
        type: String,
        enum: ['pendente', 'concluido', 'cancelado'],
        default: 'pendente',
    },
    data: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true, toJSON: { virtuals: true, transform: docToJsonTransform }, toObject: { virtuals: true, transform: docToJsonTransform }, versionKey: false });

// Transforma o campo `_id` para `id` nas consultas
function docToJsonTransform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;