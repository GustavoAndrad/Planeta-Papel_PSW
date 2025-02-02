const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "O ID do usuário é obrigatório"],
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
        enum: ['PIX', 'CARTAO'],
    },
    detalhesCartao: {
        isCard: { type: Boolean, default: false },
        cardNumber: { 
            type: String, 
            required: function() { return this.metodoPagamento === 'CARTAO'; }
        },
        expirationDate: { 
            type: String, 
            required: function() { return this.metodoPagamento === 'CARTAO'; }
        },
        cvv: { 
            type: String, 
            required: function() { return this.metodoPagamento === 'CARTAO'; }
        },
        cardHolder: { 
            type: String, 
            required: function() { return this.metodoPagamento === 'CARTAO'; }
        },
        installments: { 
            type: String, 
            required: function() { return this.metodoPagamento === 'CARTAO'; },
            default: "1x" 
        },
    },
    status: {
        type: String,
        enum: ['pendente', 'concluido', 'cancelado'],
        default: 'pendente',
    },
    data: {
        type: String,
        required: [true, "A data é obrigatória"],
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