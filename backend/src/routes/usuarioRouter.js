const usuarioController = require("../controllers/usuarioController");

/**
 * @description Define as rotas de usuário
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/usuario', usuarioController.readUsuarios)
        .get('/usuario/:id', usuarioController.readUsuarioById)
        .post('/usuario', usuarioController.createUsuario)
        .patch('/usuario/:id', usuarioController.updateUsuario)
        .delete('/usuario/:id', usuarioController.deleteUsuario)
        
}