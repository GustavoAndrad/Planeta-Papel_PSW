async function createProduto(nome, preco) {
    try{

        const produto = {
            nome: "Papel",
            preco: 20
        }

        //Persistir produto

        return "Produto cadastrado com sucesso"
    }catch(error){
        throw error;
    }
}

async function getProdutoById(id) {
    try{

        const produto = {
            nome: "Papel",
            preco: 20
        }

        return produto;
    }catch(error){
        throw error;
    }
}

async function getProdutos() {
    try{
        
        const produto = {
            nome: "Papel",
            preco: 20
        }

        const produtos = [produto, produto, produto];

        return produtos;
    }catch(error){
        throw error;
    }
}

async function updateProduto(id, total) {
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

async function deleteProduto(id) {
    try{
        
        //Remover produto

        return "Produto deletado com sucesso"
    }catch(error){
        throw error;
    }
}

module.exports = {
    createProduto,
    getProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
}