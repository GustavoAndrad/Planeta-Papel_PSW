const Pedido = require("../models/pedido")

async function createPedido(pedidoData) {
    const pedido = new Pedido(pedidoData);
    pedido.data = new Date();
    return await pedido.save();
}

async function getPedidoById(id) {
    return await Pedido.findById(id);
}

async function getPedidos() {
    return await Pedido.find();
}

async function updatePedido(id, pedidoData) {
    await Pedido.findByIdAndUpdate(id, pedidoData, {runValidators: true})
    return "Pedido atualizado com sucesso!"
}

async function deletePedido(id) {
    await Pedido.findByIdAndDelete(id);
    return "Pedido excluído com sucesso!"
}

module.exports = {
    createPedido,
    getPedidos,
    getPedidoById,
    updatePedido,
    deletePedido
}