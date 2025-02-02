const Produto = require("../models/produto")

async function createProduto(prodData) {
    const produto = new Produto(prodData);
    return await produto.save()
}

async function getProdutoById(id) {
    const prod = await Produto.findById(id);

    if(!prod){
        throw new Error("Produto não encontrado");
    }

    return prod;
}

async function getProdutos() {
    const prod = await Produto.find();

    if(prod.length === 0){
        throw new Error("Produto não encontrado");
    }

    return prod;
}

async function updateProduto(id, prodData) {
    console.log(prodData)
    const prod = await Produto.findByIdAndUpdate(id, prodData, {runValidators: true});

    if(!prod){
        throw new Error("Produto não encontrado");
    }

    return "Produto atualizado com sucesso!"
}

async function deleteProduto(id) {
    const prod = await Produto.findByIdAndDelete(id);
    
    if(!prod){
        throw new Error("Produto não encontrado");
    }
    
    return "Produto removido com sucesso!"

}

module.exports = {
    createProduto,
    getProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
}