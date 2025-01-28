const usuarioController = require("../controllers/usuarioController");
const { verifyUser } = require("../autenticate.js");
const authorize = require("../authorize.js")
/**
 * @description Define as rotas de usuário
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router
        .get('/users/all', verifyUser, authorize, usuarioController.readUsuarios)
        .get('/users', verifyUser, usuarioController.readUsuarioById)
        .post('/users', usuarioController.createUsuario)
        .patch('/users', verifyUser, usuarioController.updateUsuario)
        .delete('/users', verifyUser, usuarioController.deleteUsuario)
}