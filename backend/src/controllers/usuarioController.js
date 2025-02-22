const usuarioServices = require("../services/usuarioService");

async function createUsuario(req, res) {
    try {
        const { nome, email, senha, telefone, bairro, endereco, complemento, cep, isGerente, cpf, codigoSeguranca, plano } = req.body;
        const response = await usuarioServices.createUsuario({
            nome,
            email,
            telefone,
            bairro,
            endereco,
            complemento,
            cep,
            isGerente,
            cpf,
            codigoSeguranca,
            plano,
        }, senha);
        res.json({ status: true, message: "Usuário cadastrado com sucesso!", public_id: response._id });
    } catch (erro) {
        console.error(erro)
        res.json({ status: false, message: erro.message });
    }
}

async function readUsuarioById(req, res) {
    try {
        const id = req.user._id;
        const response = await usuarioServices.getUsuarioById(id);
        res.json({ status: true, usuario: response });
    } catch (erro) {
        console.error(erro)
        res.json({ status: false, message: erro.message });
    }
}

async function readUsuarios(req, res) {
    try {
        const response = await usuarioServices.getUsuarios();
        res.json({ status: true, message: response });
    } catch (erro) {
        console.error(erro)
        res.json({ status: false, message: erro.message });
    }
}

async function updateUsuario(req, res) {
    try {
        const id = req.user._id;
        const { nome, telefone, bairro, endereco, complemento, cep, plano } = req.body; //Informações que podem ser alteradas
        const response = await usuarioServices.updateUsuario(id, {
            nome,
            telefone,
            bairro,
            endereco,
            complemento,
            cep,
            plano
        });
        res.json({ status: true, message: response });
    } catch (erro) {
        console.error(erro)
        res.json({ status: false, message: erro.message });
    }
}

async function deleteUsuario(req, res) {
    try {
        const id = req.user._id;
        const response = await usuarioServices.deleteUsuario(id);
        res.json({ status: true, message: response });
    } catch (erro) {
        console.error(erro)
        res.json({ status: false, message: erro.message });
    }
}

module.exports = {
    createUsuario,
    readUsuarioById,
    readUsuarios,
    updateUsuario,
    deleteUsuario,
};
