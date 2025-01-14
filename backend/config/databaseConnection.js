require("dotenv/config")
const mongoose = require("mongoose");

/**
 * Conecta ao banco de dados do MongoDB
 * @returns {Promise<Boolean>} Retorna `true` se a conexão for bem-sucedida
 * @async
 */
module.exports = async function connect_to_database() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("🎲 Conexão com o banco feita com sucesso");
    return true;
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error.message);
    return false;
  }
};
