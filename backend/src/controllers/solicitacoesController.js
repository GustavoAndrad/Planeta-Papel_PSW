const solicitacaoServices = require("../services/solicitacoesService");

async function createSolicitacao(req, res){
    try{
        //Inserir as informações dos campos da solicitacao
        const {modalidade, itens} = req.body;
        const response = await solicitacaoServices.createSolicitacao(modalidade, itens);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readSolicitacaoById(req, res){
    try{
        const id = req.params.id
        const response = await solicitacaoServices.getSolicitacaoById(id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readSolicitacoes(req, res){
    try{
        const response = await solicitacaoServices.getSolicitacoes();
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function updateSolicitacao(req, res){
    try{
        //Inserir as informações dos campos do produto
        const id = req.params.id;
        const itens = req.body;
        const response = await solicitacaoServices.updateSolicitacoes(id, itens);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function deleteSolicitacao(req, res){
    try{
        const id = req.params.id;
        const response = await solicitacaoServices.deleteSolicitacao(id);
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