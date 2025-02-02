const pedidoController = require("../controllers/pedidoController");
const {verifyUser} = require("../autenticate");
const authorize = require("../authorize");

/**
 * @description Define as rotas de pedido
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/pedido/all', verifyUser, authorize, pedidoController.readPedidos)
        .get('/pedido', verifyUser, pedidoController.readPedidosByUserId)
        .post('/pedido', verifyUser, pedidoController.createPedido)
        .patch('/pedido/:id', verifyUser, pedidoController.updatePedido)
        .delete('/pedido/:id', verifyUser, pedidoController.deletePedido)
        
}

