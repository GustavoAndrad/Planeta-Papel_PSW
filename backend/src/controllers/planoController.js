const planoServices = require("../services/planoService");

async function createPlano(req, res){
    try {
        const savedPlano = await planoServices.createPlano(req.body);
        res.json(savedPlano);
    } catch (erro) {
        res.json({ message: erro.message });
    }
}

async function readPlanoById(req, res){
    try{
        const id = req.params.id
        const plano = await planoServices.getPlanoById(id);
        res.json(plano)
    }catch(erro){
        res.json({ message: erro.message })
    }
}

async function readPlanos(req, res){
    try{
        const planos = await planoServices.getPlanos();
        res.json(planos)
    }catch(erro){
        res.json({message: erro.message})
    }
}

async function updatePlano(req, res){
    try{
        const plano = await planoServices.updatePedido(req.params.id, req.body);
        res.json(plano)
    }catch(erro){
        res.json({ message: erro.message })
    }
}

async function deletePlano(req, res){
    try{
        const id = req.params.id;
        const plano = await planoServices.deletePlano(id);
        res.json(plano)
    }catch(erro){
        res.json({ message: erro.message })
    }
}

module.exports = {
    createPlano,
    readPlanoById,
    readPlanos,
    updatePlano,
    deletePlano
}