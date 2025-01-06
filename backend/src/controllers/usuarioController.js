const usuarioServices = require("../services/usuarioService");

async function createUsuario(req, res){
    try{
        //Inserir as informações dos campos do usuário
        const {nome, idade, senha} = req.body;
        const response = await usuarioServices.createUsuario(nome, idade, senha);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readUsuarioById(req, res){
    try{
        const id = req.params.id;
        const response = await usuarioServices.getUsuarioById(id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readUsuarios(req, res){
    try{
        const response = await usuarioServices.getUsuarios();
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function updateUsuario(req, res){
    try{
        //Inserir as informações dos campos do usuário
        const id = req.params.id
        const nome = req.body;
        const response = await usuarioServices.update(id, nome, idade);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function deleteUsuario(req, res){
    try{
        const id = req.usuario.id;
        const response = await usuarioServices.deleteUsuario(id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

module.exports = {
    createUsuario,
    readUsuarioById,
    readUsuarios,
    updateUsuario,
    deleteUsuario
}