const pedidoServices = require("../services/pedidoService");

async function createPedido(req, res){
    try{
        //Inserir as informações dos campos do pedido
        const {produtos, total} = req.body;
        const response = await pedidoServices.createPedido(produtos, total);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readPedidoById(req, res){
    try{
        const id = req.params.id;
        const response = await pedidoServices.getPedidoById(id);
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
        //Inserir as informações dos campos do pedido
        const id = req.params.id;
        const total = req.body;
        const response = await pedidoServices.updatePedido(id, total);
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