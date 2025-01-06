const Router = require("express").Router;
const router = Router();

usuarioController = require("./controllers/usuarioController");
pedidoController = require("./controllers/pedidoController");
planoController = require("./controllers/planoController");
produtoController = require("./controllers/produtoController");
solicitacaoController = require("./controllers/solicitacoesController");

//ROTAS Usuário
router.get('/usuarios', usuarioController.readUsuarios);
router.get('/usuarios/:id', usuarioController.readUsuarioById);
router.post('/usuarios', usuarioController.createUsuario);
router.patch('/usuarios/:id', usuarioController.updateUsuario);
router.delete('/usuarios/:id', usuarioController.deleteUsuario);

//ROTAS Pedido
router.get('/pedidos', pedidoController.readPedidos);
router.get('/pedidos/:id', pedidoController.readPedidoById);
router.post('/pedidos', pedidoController.createPedido);
router.patch('/pedidos/:id', pedidoController.updatePedido);
router.delete('/pedidos/:id', pedidoController.deletePedido);

//ROTAS Plano
router.get('/planos', planoController.readPlanos);
router.get('/planos/:id', planoController.readPlanoById);
router.post('/planos', planoController.createPlano);
router.patch('/planos/:id', planoController.updatePlano);
router.delete('/planos/:id', planoController.deletePlano);

//ROTAS Produto
router.get('/produtos', produtoController.readProdutos);
router.get('/produtos/:id', produtoController.readProdutoById);
router.post('/produtos', produtoController.createProduto);
router.patch('/produtos/:id', produtoController.updateProduto);
router.delete('/produtos/:id', produtoController.deleteProduto);

//ROTAS Solicitação
router.get('/solicitacoes', solicitacaoController.readSolicitacoes);
router.get('/solicitacoes/:id', solicitacaoController.readSolicitacaoById);
router.post('/solicitacoes', solicitacaoController.createSolicitacao);
router.patch('/solicitacoes/:id', solicitacaoController.updateSolicitacao);
router.delete('/solicitacoes/:id', solicitacaoController.deleteSolicitacao);

module.exports = router;