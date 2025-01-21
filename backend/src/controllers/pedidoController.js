const pedidoServices = require("../services/pedidoService");

async function createPedido(req, res) {
    try {
        const pedido = await pedidoServices.createPedido(req.body);
        res.status(201).json({ status: true, message: pedido });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}

async function readPedidoById(req, res) {
    try {
        const pedido = await pedidoServices.getPedidoById(req.params.id);
        if (!pedido) return res.status(404).json({ status: false, message: "Pedido não encontrado" });
        res.status(200).json({ status: true, message: pedido });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

async function readPedidos(req, res) {
    try {
        const pedidos = await pedidoServices.getPedidos();
        res.status(200).json({ status: true, message: pedidos });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

async function updatePedido(req, res) {
    try {
        const pedido = await pedidoServices.updatePedido(req.params.id, req.body);
        if (!pedido) return res.status(404).json({ status: false, message: "Pedido não encontrado" });
        res.status(200).json({ status: true, message: pedido });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}

async function deletePedido(req, res) {
    try {
        const pedido = await pedidoServices.deletePedido(req.params.id);
        if (!pedido) return res.status(404).json({ status: false, message: "Pedido não encontrado" });
        res.status(200).json({ status: true, message: "Pedido deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

module.exports = {
    createPedido,
    readPedidoById,
    readPedidos,
    updatePedido,
    deletePedido
};
