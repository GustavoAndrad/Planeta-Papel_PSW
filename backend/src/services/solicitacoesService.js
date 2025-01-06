async function createSolicitacao(modalidade, itens) {
    try{
        const solicitacao = {
            modalidade: "Buscar na casa",
            itens: [
                {
                    nome: "Papel",
                    qt: "2kg"
                },
                {
                    nome: "Papel",
                    qt: "2kg"
                },
                {
                    nome: "Papel",
                    qt: "2kg"
                }
            ]
        }

        //Persistir solicitacao

        return "Solicitacao cadastrada com sucesso"
    }catch(error){
        throw error;
    }
}

async function getSolicitacaoById(id) {
    try{

        const solicitacao = {
            modalidade: "Buscar na casa",
            itens: [
                {
                    nome: "Papel",
                    qt: "2kg"
                },
                {
                    nome: "Papel",
                    qt: "2kg"
                },
                {
                    nome: "Papel",
                    qt: "2kg"
                }
            ]
        }

        return solicitacao;
    }catch(error){
        throw error;
    }
}

async function getSolicitacoes() {
    try{
        
        const solicitacao = {
            modalidade: "Buscar na casa",
            itens: [
                {
                    nome: "Papel",
                    qt: "2kg"
                },
                {
                    nome: "Papel",
                    qt: "2kg"
                },
                {
                    nome: "Papel",
                    qt: "2kg"
                }
            ]
        }

        const solicitacoes = [solicitacao, solicitacao, solicitacao];

        return solicitacoes;
    }catch(error){
        throw error;
    }
}

async function updateSolicitacao(id, itens) {
    try{

        //Consultar pelo id
        
        //Atualizar os dados
        const atualizado = {
            itens: itens
        }

        //Persistir as alterações

        return atualizado;

    }catch(error){
        throw error;
    }
}

async function deleteSolicitacao(id) {
    try{
        
        //Remover solicitacao

        return "Solicitacao deletada com sucesso"
    }catch(error){
        throw error;
    }
}

module.exports = {
    createSolicitacao,
    getSolicitacoes,
    getSolicitacaoById,
    updateSolicitacao,
    deleteSolicitacao
}