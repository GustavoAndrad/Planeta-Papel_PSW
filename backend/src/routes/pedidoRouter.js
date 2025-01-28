const pedidoController = require("../controllers/pedidoController");
const {verifyUser} = require("../autenticate");

/**
 * @description Define as rotas de pedido
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/pedido', verifyUser, pedidoController.readPedidos)
        .get('/pedido/:id', verifyUser, pedidoController.readPedidoById)
        .post('/pedido', verifyUser, pedidoController.createPedido)
        .patch('/pedido/:id', verifyUser, pedidoController.updatePedido)
        .delete('/pedido/:id', verifyUser, pedidoController.deletePedido)
        
}
