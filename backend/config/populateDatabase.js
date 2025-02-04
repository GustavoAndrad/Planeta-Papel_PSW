require("dotenv/config");
const Gerente = require("../src/models/gerente.js");
const Produto = require('../src/models/produto.js');
const Plano = require('../src/models/plano.js');

/**
 * @description Popula o banco de dados com informações mockadas para desenvolvimento e testes. Faz apenas se os dados não forem duplicatas.
 * @returns {Promise<Boolean>} true se tiver conseguido registrar, false se não
 */

const produtos = [
  {
    "id": "2",
    "nome": "Papel Colorido A4 - 100 folhas",
    "preco": 12.9,
    "descricao": "Pacote com 100 folhas de papel colorido A4, disponível em várias cores.",
    "imagem": [
      "papel1.jpeg"
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
      "papel2.jpeg"
    ],
    "qntDisponivel": 6,
    "categoria": "Papel"
  },
  {
    "id": "5",
    "nome": "Papel Couchê Glossy A4 - 200 folhas",
    "preco": 35.9,
    "descricao": "Pacote com 200 folhas de papel couchê glossy A4, perfeito para impressões de alta qualidade.",
    "imagem": [
      "papel3.jpeg"
    ],
    "qntDisponivel": 30,
    "categoria": "Papel"
  },
  {
    "id": "6",
    "nome": "Papel Fotográfico A4 - 100 folhas",
    "preco": 45.9,
    "descricao": "Papel fotográfico A4 para impressões de fotos, com excelente qualidade de imagem.",
    "imagem": [
      "papel1.jpeg",
      "papel2.jpeg"
    ],
    "qntDisponivel": 80,
    "categoria": "Papel"
  },
  {
    "id": "7",
    "nome": "Papel Offset A4 - 1000 folhas",
    "preco": 55.9,
    "descricao": "Pacote com 1000 folhas de papel offset A4, ideal para uso comercial.",
    "imagem": [
      "papel3.jpeg",
      "papel2.jpeg",
      "papel1.jpeg"
    ],
    "qntDisponivel": 200,
    "categoria": "Papel"
    },
    {
      "id": "8",
      "nome": "Post-it 76mm x 76mm - Bloco com 100 folhas",
      "preco": 9.9,
      "descricao": "Bloco de post-it tamanho 76mm x 76mm, perfeito para anotações rápidas.",
      "imagem": [
        "postit1.jpeg"
      ],
      "qntDisponivel": 200,
      "categoria": "Post-it"
    },
    {
      "id": "9",
      "nome": "Post-it Super Sticky 76mm x 76mm - Bloco com 90 folhas",
      "preco": 14.9,
      "descricao": "Post-it super sticky que gruda mais e é ideal para papéis e superfícies diversas.",
      "imagem": [
        "postit2.jpeg"
      ],
      "qntDisponivel": 120,
      "categoria": "Post-it"
    },
    {
      "id": "10",
      "nome": "Post-it 50mm x 50mm - Bloco com 150 folhas",
      "preco": 11.9,
      "descricao": "Post-it com 150 folhas no tamanho 50mm x 50mm, excelente para uso escolar e de escritório.",
      "imagem": [
        "postit3.jpeg"
      ],
      "qntDisponivel": 180,
      "categoria": "Post-it"
    },
    {
      "id": "11",
      "nome": "Post-it Neon 76mm x 76mm - Bloco com 100 folhas",
      "preco": 13.9,
      "descricao": "Bloco de post-it neon para destacar suas anotações, com 100 folhas.",
      "imagem": [
        "postit1.jpeg"
      ],
      "qntDisponivel": 150,
      "categoria": "Post-it"
    },
    {
      "id": "12",
      "nome": "Post-it 76mm x 76mm - Bloco com 50 folhas",
      "preco": 7.9,
      "descricao": "Bloco de post-it tamanho 76mm x 76mm com 50 folhas.",
      "imagem": [
        "postit2.jpeg",
        "postit1.jpeg",
        "postit3.jpeg"
      ],
      "qntDisponivel": 200,
      "categoria": "Post-it"
    },
    {
      "id": "16",
      "nome": "Cartolina Colorida A3 - 10 folhas",
      "preco": 10.9,
      "descricao": "Pacote com 10 folhas de cartolina colorida A3, excelente para trabalhos escolares e artes.",
      "imagem": [
        "cartolina1.jpeg"
      ],
      "qntDisponivel": 80,
      "categoria": "Cartolina"
    },
    {
      "id": "17",
      "nome": "Cartolina Branca A3 - 10 folhas",
      "preco": 8.9,
      "descricao": "Pacote de 10 folhas de cartolina branca A3, versátil para projetos e apresentações.",
      "imagem": [
        "cartolina2.jpeg"
      ],
      "qntDisponivel": 60,
      "categoria": "Cartolina"
    },
    {
      "id": "18",
      "nome": "Cartolina Colorida A4 - 25 folhas",
      "preco": 12.9,
      "descricao": "Cartolina colorida A4, com 25 folhas para criar projetos criativos.",
      "imagem": [
        "cartolina3.jpeg"
      ],
      "qntDisponivel": 100,
      "categoria": "Cartolina"
    },
    {
      "id": "19",
      "nome": "Cartolina Branca A4 - 25 folhas",
      "preco": 10.9,
      "descricao": "Cartolina branca A4, pacote com 25 folhas.",
      "imagem": [
        "cartolina1.jpeg"
      ],
      "qntDisponivel": 80,
      "categoria": "Cartolina"
    },
    {
      "id": "20",
      "nome": "Cartolina Colorida A3 - 5 folhas",
      "preco": 7.9,
      "descricao": "Cartolina colorida A3, com 5 folhas para pequenas criações.",
      "imagem": [
        "cartolina2.jpeg",
        "cartolina1.jpeg"
      ],
      "qntDisponivel": 60,
      "categoria": "Cartolina"
    },
    {
      "id": "24",
      "nome": "Caderno Universitário - 80 folhas",
      "preco": 19.9,
      "descricao": "Caderno universitário com capa dura e 80 folhas, ideal para anotações no dia a dia.",
      "imagem": [
        "caderno1.jpeg"
      ],
      "qntDisponivel": 150,
      "categoria": "Caderno"
    },
    {
      "id": "25",
      "nome": "Caderno Espiral - 100 folhas",
      "preco": 23.9,
      "descricao": "Caderno espiral com 100 folhas, capa dura e formato A5, ideal para o uso escolar e profissional.",
      "imagem": [
        "caderno2.jpeg"
      ],
      "qntDisponivel": 120,
      "categoria": "Caderno"
    },
    {
      "id": "26",
      "nome": "Caderno Universitário 120 folhas",
      "preco": 28.9,
      "descricao": "Caderno universitário 120 folhas, ideal para uso em cursos técnicos e faculdade.",
      "imagem": [
        "caderno3.jpeg"
      ],
      "qntDisponivel": 90,
      "categoria": "Caderno"
    },
    {
      "id": "27",
      "nome": "Caderno Pautado - 200 folhas",
      "preco": 35.9,
      "descricao": "Caderno pautado de 200 folhas, ideal para escritores e estudantes.",
      "imagem": [
        "caderno1.jpeg"
      ],
      "qntDisponivel": 60,
      "categoria": "Caderno"
    },
    {
      "id": "28",
      "nome": "Caderno Escolar - 60 folhas",
      "preco": 16.9,
      "descricao": "Caderno escolar com 60 folhas pautadas, ideal para o uso diário.",
      "imagem": [
        "caderno2.jpeg",
        "caderno1.jpeg"
      ],
      "qntDisponivel": 200,
      "categoria": "Caderno"
    }
]

const planos = [
  {
    "id": "1",
    "nome": "Post-it",
    "preco": 19.99,
    "duracao": 31,
    "desconto": 5,
    "beneficios": [
      "Caixa misteriosa pequena"
    ]
  },
  {
    "id": "2",
    "nome": "A4",
    "preco": "24.99",
    "duracao": 6,
    "desconto": 10,
    "beneficios": [
      "1 caderno",
      "Caixa misteriosa média"
    ]
  },
  {
    "id": "3",
    "nome": "Cartolina",
    "preco": 39.99,
    "duracao": 12,
    "desconto": 20,
    "beneficios": [
      "3Kg de Papel A4"
    ]
  },
  {
    "id": "4",
    "nome": "Planner",
    "preco": 24.99,
    "duracao": 3,
    "desconto": 12,
    "beneficios": [
      "1 Convite para Tour de Reciclagem",
      "Caixa misteriosa pequena"
    ]
  },
  {
    "id": "5",
    "nome": "Sustentável",
    "preco": 29.99,
    "duracao": 6,
    "desconto": 20,
    "beneficios": [
      "Doação de uma árvore plantada em seu nome",
      "2 Convites para Tour de Reciclagem",
      "Caixa misteriosa sustentável"
    ]
  },
  {
    "id": "6",
    "nome": "Jumbo",
    "preco": 119.99,
    "duracao": 12,
    "desconto": 25,
    "beneficios": [
      "5Kg de Papel A4",
      "10 cadernos"
    ]
  }
]

module.exports = async () =>{
    try{
        const produtosExistentes = await Produto.find();
        const planosExistentes = await Plano.find();

        if (produtosExistentes.length === 0) {
        // Se não houver produtos, insere os novos produtos
        await Produto.insertMany(produtos);
        console.log("🛒 Produtos inseridos no banco de dados!");
        } else {
        console.log("✔ Produtos já estão no banco de dados.");
        }

        if (planosExistentes.length === 0) {
        // Se não houver planos, insere os novos planos
        await Plano.insertMany(planos);
        console.log("📃 Planos inseridos no banco de dados!");
        } else {
        console.log("✔ Planos já estão no banco de dados.");
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