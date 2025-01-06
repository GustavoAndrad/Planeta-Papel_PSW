const bcrypt = require("bcrypt");

async function createUsuario(nome, idade, senha) {
    try{
        if(nome == null){
            throw new Error("Name must not be null");
        }
        if(idade == null){
            throw new Error("Age must not be null");
        }
        if(senha == null){
            throw new Error("Password must not be null");
        }

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(senha, salt);

        const usuario = {
            nome: nome,
            idade: idade,
            senha: hash
        }

        //Persistir usuario

        return "Usuário cadastrado com sucesso"
    }catch(error){
        throw error;
    }
}

async function getUsuarioById(id) {
    try{
        
        //Consultar usuario pelo id

        const usuario = {
            nome: "User",
            idade: 20
        }

        return usuario;
    }catch(error){
        throw error;
    }
}

async function getUsuarios(i) {
    try{
        
        //Consultar todos os usuários

        const usuario = {
            nome: "User",
            idade: 20
        }

        const usuarios = [usuario, usuario, usuario];

        return usuarios;
    }catch(error){
        throw error;
    }
}

async function update(id, nome, idade) {
    try{

        //Consultar pelo id
        
        //Atualizar os dados
        const atualizado = {
            nome: nome,
            idade: idade,
        }

        //Persistir as alterações

        return atualizado;

    }catch(error){
        throw error;
    }
}

async function deleteUsuario(id) {
    try{
        
        //Remover usuário pelo id;

        return "Usuário deletado com sucesso"
    }catch(error){
        throw error;
    }
}

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    update,
    deleteUsuario
}