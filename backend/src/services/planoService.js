const Plano = require('../models/Plano');

async function createPlano(data) {
    return await Plano.create(data);
}

async function getPlanoById(id) {
    const plano = await Plano.findById(id);
    if (!plano) throw new Error('Plano não encontrado');
    return plano;
}

async function getPlanos() {
    const planos = await Plano.find();
    return planos;
}

async function updatePlano(id, total) {
    const planoAtualizado = await Plano.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!planoAtualizado) throw new Error('Plano não encontrado');
    return planoAtualizado;
}

async function deletePlano(id) {
    const plano = await Plano.findByIdAndDelete(id);
    if (!plano) throw new Error('Plano não encontrado');
    return plano;
}

module.exports = {
    createPlano,
    getPlanos,
    getPlanoById,
    updatePlano,
    deletePlano
}