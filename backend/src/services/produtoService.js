const Produto = require("../models/produto")

async function createProduto(prodData) {
    const produto = new Produto(prodData);
    return await produto.save()
}

async function getProdutoById(id) {
    return await Produto.findById(id)
}

async function getProdutos() {
    return await Produto.find();
}

async function updateProduto(id, prodData) {
    await Produto.findByIdAndUpdate(id, prodData, {runValidators: true})
    return "Produto atualizado com sucesso!"
}

async function deleteProduto(id) {
    await Produto.findByIdAndDelete(id)
    return "Produto removido com sucesso!"

}

module.exports = {
    createProduto,
    getProdutos,
    getProdutoById,
    updateProduto,
    deleteProduto
}