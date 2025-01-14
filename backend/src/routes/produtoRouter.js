const produtoController = require("../controllers/produtoController");

/**
 * @description Define as rotas de produto
 * @param {*} router - Rotador do express
 */
module.exports = (router) =>{

    router
        .get('/produtos', produtoController.readProdutos)
        .get('/produtos/:id', produtoController.readProdutoById)
        .post('/produtos', produtoController.createProduto)
        .patch('/produtos/:id', produtoController.updateProduto)
        .delete('/produtos/:id', produtoController.deleteProduto)
            
}