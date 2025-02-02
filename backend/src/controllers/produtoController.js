const produtoServices = require("../services/produtoService");
const {rename_file, delete_images} = require("../utils/multer.js")

async function createProduto(req, res) {
    let imagem = [];
    try {
        const { nome, preco, descricao, qntDisponivel, categoria } = JSON.parse(req.body.jsonData);

        imagem = req.files.map((f) => {
            return rename_file(f, nome);
        });

        const response = await produtoServices.createProduto({ nome, preco, descricao, imagem, qntDisponivel, categoria });
        res.json({ status: true, message: "Produto criado com sucesso!", public_id: response.id });
    } catch (erro) {
        delete_images(imagem)
        res.status(500).json({ status: false, message: erro.message });
    }
}


async function readProdutoById(req, res){
    try{
        const id = req.params.id
        const response = await produtoServices.getProdutoById(id);
        res.json({status: true, produto: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function readProdutos(req, res){
    try{
        const response = await produtoServices.getProdutos();
        res.json({status: true, produtos: response})
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

// Para ataulizar imagens é necessário enviar todas para substituição 
async function updateProduto(req, res){
    let imagem = [];
    try{
        const id = req.params.id
        const { nome, preco, descricao, qntDisponivel, categoria } = JSON.parse(req.body.jsonData);

        let old_images = undefined;
        // Adiciona as novas imagens, se forem passadas
        if(req.files){
            imagem = req.files.map((f) => {
                return rename_file(f, nome);
            });
            
            const prod = await produtoServices.getProdutoById(id);
            old_images = prod.imagem;
        }

        const response = await produtoServices.updateProduto(id, { nome, preco, descricao, imagem, qntDisponivel, categoria });

        //Apaga as imagens antigas, se forem passadas
        if(old_images){
            delete_images(old_images)
        }

        res.json({status: true, message: response})
        
    }catch(erro){
        delete_images(imagem) //Apaga imagens que foram passadas
        res.json({status: false, message: erro.message})
    }
}


async function updateQuickProduto(req, res){
    try{
        const id = req.params.id
        const { nome, preco, descricao, qntDisponivel, categoria } = req.body;

        const response = await produtoServices.updateProduto(id, { nome, preco, descricao, qntDisponivel, categoria });

        res.json({status: true, message: response})
        
    }catch(erro){
        res.json({status: false, message: erro.message})
    }
}

async function deleteProduto(req, res){
    try{
        const id = req.params.id;

        //Remove as imagens do produto
        const {imagem} = await produtoServices.getProdutoById(id);
        delete_images(imagem);

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
    updateQuickProduto,
    deleteProduto
}