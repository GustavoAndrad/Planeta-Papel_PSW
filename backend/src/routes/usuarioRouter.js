const usuarioController = require("../controllers/usuarioController");
const { verifyUser } = require("../autenticate.js");
const authorize = require("../authorize.js")
/**
 * @description Define as rotas de usuário
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/usuario/all', verifyUser, authorize, usuarioController.readUsuarios)
        .get('/usuario', verifyUser, usuarioController.readUsuarioById)
        .post('/usuario', usuarioController.createUsuario)
        .patch('/usuario', verifyUser, usuarioController.updateUsuario)
        .delete('/usuario', verifyUser, usuarioController.deleteUsuario)
}