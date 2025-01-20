const Usuario = require("../models/usuario.js");
const Gerente = require("../models/gerente.js");

/**
 * Recebe o objeto e verifica se é um usuário ou gerente. Lida com os dois casos e armazena na mesma collection
 * @param {*} userData 
 * @param {String} senha
 * @returns {Promisse<>} Usuário que foi criado
< */
async function createUsuario(userData, senha) {

    if(!senha || senha.trim().length === 0){
        throw new Error("A senha é obrigatória!")
    }
    
    if(!userData.isGerente){ // Salvando usuário
        // Remove os campos específicos do gerente
        delete userData.cpf;
        delete userData.codigoSeguranca;

        const usuario = new Usuario(userData);
        
        const validationError = usuario.validateSync();
        if(validationError){
            throw new Error(validationError)
        };

        return await Usuario.register(usuario, senha);
      } else {
        
        const gerente = new Gerente(userData);
        return await Gerente.register(gerente, senha);
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
    console.log(usuario)

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
