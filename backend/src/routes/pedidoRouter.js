const pedidoController = require("../controllers/pedidoController");

/**
 * @description Define as rotas de pedido
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/pedido', pedidoController.readPedidos)
        .get('/pedido/:id', pedidoController.readPedidoById)
        .post('/pedido', pedidoController.createPedido)
        .patch('/pedido/:id', pedidoController.updatePedido)
        .delete('/pedido/:id', pedidoController.deletePedido)
        
}
