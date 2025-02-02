const Pedido = require('../models/pedido');
const Produto = require("../models/produto")

async function createPedido(pedidoData) {
    const session = await Pedido.startSession();
    session.startTransaction();

    try {
        for (const item of pedidoData.produtos) {
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

        const pedido = new Pedido(pedidoData);
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