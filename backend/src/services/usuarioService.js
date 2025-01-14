const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario.js");
const Gerente = require("../models/gerente.js");

async function createUsuario(userData) {
    // Gera o hash da senha fornecida
    const salt = bcrypt.genSaltSync();
    userData.senha = bcrypt.hashSync(userData.senha, salt);
    
    if(!userData.isGerente){ // Salvando usuário
        // Remove os campos específicos do gerente
        delete userData.cpf;
        delete userData.codigoSeguranca;

        const usuario = new Usuario(userData);
        await usuario.save();
    } else { // Salvando gerente
        const gerente = new Gerente(userData);
        await gerente.save();
    }

    return "Usuário cadastrado com sucesso!";    
}

async function getUsuarioById(id) {
    const user = await Usuario.findById(id).select('-senha');

    if(!user) throw new Error("Usuário não encontrado");

    return user;
}

async function getUsuarios() {
    const usuarios = await Usuario.find({ isGerente: false }).select('-senha');

    if(usuarios.length === 0) throw new Error("Usuário não encontrado");

    return usuarios;
}

async function updateUsuario(id, userData) {
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, userData);

        if (!usuario) throw new Error("Usuário não encontrado");

        return "Usuário atualizado com sucesso!";
    } catch (error) {
        throw new Error("Erro ao atualizar o usuário: " + error.message);
    }
}


async function deleteUsuario(id) {
    try {
        const usuario = await Usuario.findByIdAndDelete(id);

        if (!usuario) throw new Error("Usuário não encontrado");

        return "Usuário deletado com sucesso";
    } catch (error) {
        throw new Error("Erro ao deletar o usuário: " + error.message);
    }
}

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
};
