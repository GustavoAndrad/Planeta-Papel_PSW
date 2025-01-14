const solicitacaoController = require("../controllers/solicitacoesController");

/**
 * @description Define as rotas de solicitação
 * @param {*} router - Rotador do express
 */
module.exports = (router) =>{

    router
        .get('/solicitacoes', solicitacaoController.readSolicitacoes)
        .get('/solicitacoes/:id', solicitacaoController.readSolicitacaoById)
        .post('/solicitacoes', solicitacaoController.createSolicitacao)
        .patch('/solicitacoes/:id', solicitacaoController.updateSolicitacao)
        .delete('/solicitacoes/:id', solicitacaoController.deleteSolicitacao)
            
}
