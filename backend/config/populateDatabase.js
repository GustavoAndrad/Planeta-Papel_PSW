require("dotenv/config")
const Gerente = require("../src/models/gerente.js")

/**
 * @description Popula o banco de dados com informações mockadas para desenvolvimento e testes. Faz apenas se os dados não forem duplicatas.
 * @returns {Promise<Boolean>} true se tiver conseguido registrar, false se não
 */
module.exports = async () =>{
    try{

        if(!(await Gerente.findOne({email: process.env.ADMIN_EMAIL}))){

            const gerente = new Gerente({
                nome: "Gerente",
                email: process.env.ADMIN_EMAIL,
                telefone: "(00) 00000-0000",
                bairro: "País das Maravilhas",
                endereco: "Torre do Rei",
                complemento: "Segunda porta depois do lago",
                cep: "00000-000",
                isGerente: true,
                cpf: process.env.ADMIN_CPF,
                codigoSeguranca: process.env.ADMIN_SECURITY_CODE,
            }, senha=process.env.ADMIN_PASS);

            const registered = await Gerente.register(gerente, senha);

            if(!registered){
                throw new Error("Unable to create!")
            }
            
            console.log("🕵️‍♂️ Development Gerente registered!")
            return true
        }

    }catch(e){
        console.log("❌ Fail registering Development Gerente: " + e.message)
        return false;
    }
            
}