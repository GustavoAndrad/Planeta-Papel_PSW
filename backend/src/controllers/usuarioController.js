const usuarioServices = require("../services/usuarioService");

async function createUsuario(req, res) {
    try {
        const { nome, email, senha, telefone, bairro, endereco, complemento, cep, isGerente, cpf, codigoSeguranca, plano } = req.body;
        const response = await usuarioServices.createUsuario({
            nome,
            email,
            senha,
            telefone,
            bairro,
            endereco,
            complemento,
            cep,
            isGerente,
            cpf,
            codigoSeguranca,
            plano,
        });
        res.json({ status: true, message: response });
    } catch (erro) {
        res.json({ status: false, message: erro.message });
    }
}

async function readUsuarioById(req, res) {
    try {
        const id = req.params.id;
        const response = await usuarioServices.getUsuarioById(id);
        res.json({ status: true, usuário: response });
    } catch (erro) {
        res.json({ status: false, message: erro.message });
    }
}

async function readUsuarios(req, res) {
    try {
        const response = await usuarioServices.getUsuarios();
        res.json({ status: true, message: response });
    } catch (erro) {
        res.json({ status: false, message: erro.message });
    }
}

async function updateUsuario(req, res) {
    try {
        const id = req.params.id;
        const { nome, email, telefone, bairro, endereco, complemento, cep, isGerente, plano } = req.body;
        const response = await usuarioServices.updateUsuario(id, {
            nome,
            email,
            telefone,
            bairro,
            endereco,
            complemento,
            cep,
            isGerente,
            plano,
        });
        res.json({ status: true, message: response });
    } catch (erro) {
        res.json({ status: false, message: erro.message });
    }
}

async function deleteUsuario(req, res) {
    try {
        const id = req.params.id;
        const response = await usuarioServices.deleteUsuario(id);
        res.json({ status: true, message: response });
    } catch (erro) {
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
