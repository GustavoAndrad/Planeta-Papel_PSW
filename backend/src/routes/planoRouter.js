const planoController = require("../controllers/planoController");

/**
 * @description Define as rotas de plano
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/planos', planoController.readPlanos)
        .get('/planos/:id', planoController.readPlanoById)
        .post('/planos', planoController.createPlano)
        .patch('/planos/:id', planoController.updatePlano)
        .delete('/planos/:id', planoController.deletePlano)
        
}