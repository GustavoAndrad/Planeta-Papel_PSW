const mongoose = require("mongoose");
const Plano = require("./plano");

/******* 
          Usar Passport
          passport-local-mongoose
          1:27:20
*******/

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome do usuário é obrigatório"],
  },
  email: {
    type: String,
    required: [true, "O e-mail do usuário é obrigatório"],
    unique: [true, "O e-mail deve ser único"],
    match: [/^\S+@\S+\.\S+$/, "E-mail inválido"],
  },
  senha: {
    type: String,
    required: [true, "A senha do usuário é obrigatória"],
    minlength: 4,
  },
  telefone: {
    type: String,
    required: [true, "O telefone do usuário é obrigatório"],
    match: [
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Telefone deve estar no formato (XX) XXXXX-XXXX",
    ],
  },
  bairro: {
    type: String,
    required: [true, "O bairro do usuário é obrigatório"],
  },
  endereco: {
    type: String,
    required: [true, "O endereço do usuário é obrigatório"],
  },
  complemento: {
    type: String,
    default: "",
  },
  cep: {
    type: String,
    required: [true, "O CEP do usuário é obrigatório"],
    match: [/^\d{5}-\d{3}$/, "CEP deve estar no formato XXXXX-XXX"],
  },
  isGerente: {
    type: Boolean,
    required: [true, "Tag de permissão não configurada"],
    default: false,
  },
  plano: {
    type: String,
    required: function () {
      return this.isGerente;
    },
    validate: {
      validator: async function (value) {
        const exists = await Plano.exists({ nome: value });
        return exists;
      },
      message: "Plano inválido. Certifique-se de que ele existe.",
    },
  },
}, { timestamps: true });

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;

