const solicitacaoController = require("../controllers/solicitacoesController");
const { verifyUser } = require("../autenticate.js");
const authorize = require("../authorize.js")

/**
 * @description Define as rotas de solicitação
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/solicitacoes', verifyUser, solicitacaoController.readSolicitacoes)
        .get('/solicitacoes/:id', verifyUser, solicitacaoController.readSolicitacaoById)
        .post('/solicitacoes', verifyUser, solicitacaoController.createSolicitacao)
        .patch('/solicitacoes/:id', verifyUser, authorize, solicitacaoController.updateSolicitacao)
        .delete('/solicitacoes/:id', verifyUser, solicitacaoController.deleteSolicitacao)
            
}
