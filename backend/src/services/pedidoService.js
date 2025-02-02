const Pedido = require('../models/pedido');
const Produto = require("../models/produto");

async function createPedido(pedidoData) {
    const pedidoFormatado = {
        userId: pedidoData.userId,
        produtos: pedidoData.prods.map(item => ({
            nome: item.prodName,
            quantidade: parseInt(item.prodQt, 10),
            preco: parseFloat(item.prodTotal)
        })),
        total: pedidoData.prods.reduce((acc, item) => acc + parseFloat(item.prodTotal), 0),
        metodoPagamento: pedidoData.metodoPagamento,
        detalhesCartao: pedidoData.cardDetails,
        status: pedidoData.isCancelado ? 'cancelado' : 'pendente',
        data: pedidoData.data
    };

    // Verificar disponibilidade dos produtos
    const produtosNoBanco = [];
    for (const item of pedidoFormatado.produtos) {
        const produto = await Produto.findOne({ nome: item.nome });

        if (!produto) throw new Error(`Produto "${item.nome}" não encontrado.`);
        if (produto.qntDisponivel < item.quantidade) throw new Error(`Estoque insuficiente para "${item.nome}".`);

        produtosNoBanco.push(produto); // Guardamos para a segunda iteração
    }

    // Cria pedido
    const pedido = new Pedido(pedidoFormatado);
    await pedido.save();

    // Diminui quantidade de produtos
    for (const item of pedidoFormatado.produtos) {
        const produto = produtosNoBanco.find(p => p.nome === item.nome);
        produto.qntDisponivel -= item.quantidade;
        await produto.save();
    }

    if (pedidoFormatado.metodoPagamento === 'CARTAO') {
        const { cardNumber, expirationDate, cvv, cardHolder, installments } = pedidoFormatado.detalhesCartao;
        if (!cardNumber || !expirationDate || !cvv || !cardHolder || !installments) {
            throw new Error("Todos os campos do cartão são obrigatórios para pagamento com cartão.");
        }
    }

    return pedido;
}


async function getPedidosByUserId(userId) {
    return await Pedido.find({ userId });
}

async function getPedidos() {
    return await Pedido.find();
}

async function updatePedido(id, pedidoData) {
    return await Pedido.findByIdAndUpdate(id, pedidoData, { new: true, runValidators: true });
}

async function deletePedido(id) {
    return await Pedido.findByIdAndDelete(id);
}

module.exports = {
    createPedido,
    getPedidos,
    getPedidosByUserId,
    updatePedido,
    deletePedido
};
