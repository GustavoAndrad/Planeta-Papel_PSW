const planoServices = require("../services/planoService");

async function createPlano(req, res){
    try{
        //Inserir as informações dos campos do plano
        const {nome, preco} = req.body;
        const response = await planoServices.createPlano(nome, preco);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readPlanoById(req, res){
    try{
        const id = req.params.id
        const response = await planoServices.getPlanoById(id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readPlanos(req, res){
    try{
        const response = await planoServices.getPlanos();
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function updatePlano(req, res){
    try{
        //Inserir as informações dos campos do plano
        const id = req.params.id;
        const preco = req.body;
        const response = await planoServices.updatePedido(id, preco);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function deletePlano(req, res){
    try{
        const id = req.params.id;
        const response = await planoServices.deletePlano(id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

module.exports = {
    createPlano,
    readPlanoById,
    readPlanos,
    updatePlano,
    deletePlano
}