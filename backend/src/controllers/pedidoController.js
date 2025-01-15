const pedidoServices = require("../services/pedidoService");

async function createPedido(req, res){
    try{
        const response = await pedidoServices.createPedido(req.body);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readPedidoById(req, res){
    try{
        const response = await pedidoServices.getPedidoById(req.params.id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readPedidos(req, res){
    try{
        const response = await pedidoServices.getPedidos();
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function updatePedido(req, res){
    try{
        const response = await pedidoServices.updatePedido(req.params.id, req.body);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function deletePedido(req, res){
    try{
        const id = req.params.id;
        const response = await pedidoServices.deletePedido(id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

module.exports = {
    createPedido,
    readPedidoById,
    readPedidos,
    updatePedido,
    deletePedido
}