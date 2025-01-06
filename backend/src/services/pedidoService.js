async function createPedido(produtos, total) {
    try{

        const pedido = {
            produtos: [
                {
                    nome: "Papel",
                    preco: 10
                },
                {
                    nome: "Post-it",
                    preco: 10
                },
                {
                    nome: "Cartolina",
                    preco: 10
                }
            ],
            total: 30
        }

        //Persistir pedido

        return "Pedido cadastrado com sucesso"
    }catch(error){
        throw error;
    }
}

async function getPedidoById(id) {
    try{
        
        //Consultar pedido pelo id

        const pedido = {
            produtos: [
                {
                    nome: "Papel",
                    preco: 10
                },
                {
                    nome: "Post-it",
                    preco: 10
                },
                {
                    nome: "Cartolina",
                    preco: 10
                }
            ],
            total: 30
        }

        return pedido;
    }catch(error){
        throw error;
    }
}

async function getPedidos() {
    try{
        
        //Consultar todos os usuários

        const pedido = {
            produtos: [
                {
                    nome: "Papel",
                    preco: 10
                },
                {
                    nome: "Post-it",
                    preco: 10
                },
                {
                    nome: "Cartolina",
                    preco: 10
                }
            ],
            total: 30
        }

        const pedidos = [pedido, pedido, pedido];

        return pedidos;
    }catch(error){
        throw error;
    }
}

async function updatePedido(id, total) {
    try{

        //Consultar pelo id
        
        //Atualizar os dados
        const atualizado = {
            total: total
        }

        //Persistir as alterações

        return atualizado;

    }catch(error){
        throw error;
    }
}

async function deletePedido(id) {
    try{
        
        //Remover pedido pelo id;

        return "Pedido deletado com sucesso"
    }catch(error){
        throw error;
    }
}

module.exports = {
    createPedido,
    getPedidos,
    getPedidoById,
    updatePedido,
    deletePedido
}