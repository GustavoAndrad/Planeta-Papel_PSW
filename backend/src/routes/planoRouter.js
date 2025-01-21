const planoController = require("../controllers/planoController");
const { verifyUser } = require("../autenticate.js");
const authorize = require("../authorize.js")

/**
 * @description Define as rotas de plano
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/planos', planoController.readPlanos)
        .get('/planos/:id', verifyUser, planoController.readPlanoById)
        .post('/planos', verifyUser, authorize, planoController.createPlano)
        .patch('/planos/:id', verifyUser, authorize, planoController.updatePlano)
        .delete('/planos/:id', verifyUser, authorize, planoController.deletePlano)
        
}