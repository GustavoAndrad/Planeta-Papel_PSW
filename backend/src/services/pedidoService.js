const Pedido = require('../models/pedido');

async function createPedido(pedidoData) {
    const pedido = new Pedido(pedidoData);
    return await pedido.save();
}

async function getPedidoById(id) {
    return await Pedido.findById(id);
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
    getPedidoById,
    updatePedido,
    deletePedido
};