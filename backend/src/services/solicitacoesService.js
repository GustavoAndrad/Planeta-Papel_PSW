const Solicitacao = require("../models/solicitacao")

async function createSolicitacao(solicData) {
    const solic = new Solicitacao(solicData);
    solic.data = new Date();
    return await solic.save();
}

async function getSolicitacaoById(id) {
    return await Solicitacao.findById(id);
}

async function getSolicitacoes() {
    return await Solicitacao.find();
}

async function updateSolicitacao(id, solicData) {
    await Solicitacao.findByIdAndUpdate(id, solicData, {runValidators: true})
    return "Solicitação atualizada com sucesso!"
}

async function deleteSolicitacao(id) {
    await Solicitacao.findByIdAndDelete(id);
    return "Solicitação excluída com sucesso!"
}

module.exports = {
    createSolicitacao,
    getSolicitacoes,
    getSolicitacaoById,
    updateSolicitacao,
    deleteSolicitacao
}