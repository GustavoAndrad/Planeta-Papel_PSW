require("dotenv/config");
const Gerente = require("../src/models/gerente.js");
const Produto = require('../src/models/produto.js');

/**
 * @description Popula o banco de dados com informações mockadas para desenvolvimento e testes. Faz apenas se os dados não forem duplicatas.
 * @returns {Promise<Boolean>} true se tiver conseguido registrar, false se não
 */

const produtos = [
    {
      "id": "1",
      "nome": "Folha A4",
      "preco": 10,
      "descricao": "Pacote com 5 folhas de papel sulfite A4",
      "imagem": [
        "/images/prod.png"
      ],
      "qntDisponivel": 1,
      "categoria": "Papel"
    },
    {
      "id": "2",
      "nome": "Papel Colorido A4 - 100 folhas",
      "preco": 12.9,
      "descricao": "Pacote com 100 folhas de papel colorido A4, disponível em várias cores.",
      "imagem": [
        "/images/prod.png",
        "/images/prod.png",
        "/images/prod.png",
        "/images/prod.png"
      ],
      "qntDisponivel": 50,
      "categoria": "Papel"
    },
    {
      "id": "3",
      "nome": "Papel Cartão - 25 folhas",
      "preco": 1,
      "descricao": "Papel cartão resistente para uso em trabalhos manuais, scrapbooking e outros.",
      "imagem": [
        "/images/prod.png",
        "/images/prod.png",
        "/images/prod.png",
        "/images/prod.png"
      ],
      "qntDisponivel": 6,
      "categoria": "Papel"
    }
]

module.exports = async () =>{
    try{
        const produtosExistentes = await Produto.find();

        if (produtosExistentes.length === 0) {
        // Se não houver produtos, insere os novos produtos
        await Produto.insertMany(produtos);
        console.log("🛒 Produtos inseridos no banco de dados!");
        } else {
        console.log("✔ Produtos já estão no banco de dados.");
        }
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