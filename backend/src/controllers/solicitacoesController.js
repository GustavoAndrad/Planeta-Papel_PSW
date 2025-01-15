const solicitacao = require("../services/solicitacoesService");

async function createSolicitacao(req, res){
    try{
        const response = await solicitacao.createSolicitacao(req.body);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readSolicitacaoById(req, res){
    try{
        const response = await solicitacao.getSolicitacaoById(req.params.id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readSolicitacoes(req, res){
    try{
        const response = await solicitacao.getSolicitacoes();
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function updateSolicitacao(req, res){
    try{
        const response = await solicitacao.updateSolicitacao(req.params.id, req.body);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function deleteSolicitacao(req, res){
    try{
        const id = req.params.id;
        const response = await solicitacao.deleteSolicitacao(id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

module.exports = {
    createSolicitacao,
    readSolicitacaoById,
    readSolicitacoes,
    updateSolicitacao,
    deleteSolicitacao
}