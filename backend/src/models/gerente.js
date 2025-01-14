const mongoose = require("mongoose");
const Usuario = require("./usuario.js");

const gerenteSchema = new mongoose.Schema({
  cpf: {
    type: String,
    required: [true, "O CPF é obrigatório para gerentes"],
    unique: [true, "O CPF deve ser único"],
    match: [/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Informe um CPF válido. [xxx.xxx.xxx-xx]"],
  },
  codigoSeguranca: {
    type: String,
    required: [true, "O código de segurança é obrigatório para gerentes"],
    unique: [true, "O código de segurança deve ser único"],
  },
});

// Herança de Usuario para Gerente
const Gerente = Usuario.discriminator("Gerente", gerenteSchema);

module.exports = Gerente;
