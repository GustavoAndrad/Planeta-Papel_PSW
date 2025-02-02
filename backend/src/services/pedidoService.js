const Pedido = require('../models/pedido');
const Produto = require("../models/produto");

async function createPedido(pedidoData) {
    const session = await Pedido.startSession();
    session.startTransaction();

    try {
        const pedidoFormatado = {
            userId: pedidoData.userId,
            produtos: pedidoData.prods.map(item => ({
                nome: item.prodName,
                quantidade: parseInt(item.prodQt, 10),
                preco: parseFloat(item.prodTotal)
            })),
            total: pedidoData.prods.reduce((acc, item) => acc + parseFloat(item.prodTotal), 0),
            metodoPagamento: pedidoData.metodoPagamento,
            detalhesCartao: pedidoData.cardDetails,
            status: pedidoData.isCancelado ? 'cancelado' : 'pendente',
            data: pedidoData.data
        };

        for (const item of pedidoFormatado.produtos) {
            const produto = await Produto.findOne({ nome: item.nome }).session(session);
            if (!produto) {
                throw new Error(`Produto "${item.nome}" não encontrado.`);
            }

            if (produto.qntDisponivel < item.quantidade) {
                throw new Error(`Estoque insuficiente para o produto "${item.nome}".`);
            }

            produto.qntDisponivel -= item.quantidade;
            await produto.save({ session });
        }

        if (pedidoFormatado.metodoPagamento === 'CARTAO') {
            const { cardNumber, expirationDate, cvv, cardHolder, installments } = pedidoFormatado.detalhesCartao;
            if (!cardNumber || !expirationDate || !cvv || !cardHolder || !installments) {
                throw new Error("Todos os campos do cartão são obrigatórios para pagamento com cartão.");
            }
        }

        const pedido = new Pedido(pedidoFormatado);
        await pedido.save({ session });

        await session.commitTransaction();
        session.endSession();

        return pedido;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

async function getPedidosByUserId(userId) {
    return await Pedido.find({ userId });
}

async function getPedidos() {
    return await Pedido.find();
}

async function updatePedido(id, pedidoData) {
    return await Pedido.findByIdAndUpdate(id, pedidoData, { new: true, runValidators: true });
}

async function deletePedido(id) {
    return await Pedido.findByIdAndDelete(id);
}

module.exports = {
    createPedido,
    getPedidos,
    getPedidosByUserId,
    updatePedido,
    deletePedido
};
