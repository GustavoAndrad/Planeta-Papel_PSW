const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario.js");
const Gerente = require("../models/gerente.js");

/**
 * Recebe o objeto e verifica se é um usuário ou gerente. Lida com os dois casos e armazena na mesma collection
 * @param {*} userData 
 * @returns {Proomisse<>} Usuário que foi criado
< */
async function createUsuario(userData) {
    // Gera o hash da senha fornecida
    const salt = bcrypt.genSaltSync();
    userData.senha = bcrypt.hashSync(userData.senha, salt);
    
    if(!userData.isGerente){ // Salvando usuário
        // Remove os campos específicos do gerente
        delete userData.cpf;
        delete userData.codigoSeguranca;

        const usuario = new Usuario(userData);
        return await usuario.save();
    } else { // Salvando gerente
        const gerente = new Gerente(userData);
        return await gerente.save();
    }

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
    const usuario = await Usuario.findByIdAndUpdate(id, userData, {runValidators: true});

    if (!usuario) throw new Error("Usuário não encontrado");

    return "Usuário atualizado com sucesso!";
}


async function deleteUsuario(id) {
    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) throw new Error("Usuário não encontrado");

    return "Usuário deletado com sucesso";
}

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
};
