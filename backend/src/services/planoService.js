async function createPlano(nome, preco) {
    try{

        const plano = {
            nome: "A4",
            preco: 20
        }

        //Persistir plano

        return "Plano cadastrado com sucesso"
    }catch(error){
        throw error;
    }
}

async function getPlanoById(id) {
    try{
        
        //Consultar pedido pelo id

        const plano = {
            nome: "A4",
            preco: 20
        }

        return plano;
    }catch(error){
        throw error;
    }
}

async function getPlanos() {
    try{
        
        //Consultar todos os usuários

        const plano = {
            nome: "A4",
            preco: 20
        }

        const planos = [plano, plano, plano];

        return planos;
    }catch(error){
        throw error;
    }
}

async function updatePlano(id, total) {
    try{

        //Consultar pelo id
        
        //Atualizar os dados
        const atualizado = {
            preco: total
        }

        //Persistir as alterações

        return atualizado;

    }catch(error){
        throw error;
    }
}

async function deletePlano(id) {
    try{
        
        //Remover plano

        return "Plano deletado com sucesso"
    }catch(error){
        throw error;
    }
}

module.exports = {
    createPlano,
    getPlanos,
    getPlanoById,
    updatePlano,
    deletePlano
}