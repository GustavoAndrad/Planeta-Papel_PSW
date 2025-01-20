const produtoController = require("../controllers/produtoController");
const {upload, get_image} = require("../utils/multer.js");
const { verifyUser } = require("../autenticate.js");
const authorize = require("../authorize.js")

/**
 * @description Define as rotas de produto
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/produtos', produtoController.readProdutos)
        .get('/produtos/:id', produtoController.readProdutoById)

        .post('/produtos',
            verifyUser, 
            authorize, 
            upload.array('image', 3),
            produtoController.createProduto
        )

        .patch('/produtos/:id',
            verifyUser, 
            authorize, 
            upload.array('image', 3), 
            produtoController.updateProduto
        )

        .delete('/produtos/:id', verifyUser, authorize, produtoController.deleteProduto)
        
        .get('/produtos/images/:imageName', (req, res)=>{
            const image = get_image(req.params.imageName);
            res.sendFile(image);
        })
            
}