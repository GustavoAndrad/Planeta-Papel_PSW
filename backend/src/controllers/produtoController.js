const produtoServices = require("../services/produtoService");

async function createProduto(req, res){
    try{
        //Inserir as informações dos campos do produto
        const {nome, preco} = req.body;
        const response = await produtoServices.createProduto(nome, preco);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readProdutoById(req, res){
    try{
        const id = req.params.id
        const response = await produtoServices.getProdutoById(id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readProdutos(req, res){
    try{
        const response = await produtoServices.getProdutos();
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function updateProduto(req, res){
    try{
        //Inserir as informações dos campos do produto
        const id = req.params.id;
        const preco = req.body;
        const response = await produtoServices.updateProduto(id, preco);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function deleteProduto(req, res){
    try{
        const id = req.params.id;
        const response = await produtoServices.deleteProduto(id);
        res.json({status: true, message: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

module.exports = {
    createProduto,
    readProdutoById,
    readProdutos,
    updateProduto,
    deleteProduto
}