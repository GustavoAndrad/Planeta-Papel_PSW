const Router = require("express").Router;
const router = Router();

const routesUsuario = require("./usuarioRouter");
const routesSolicitacao = require("./solicitacaoRouter");
const routesProduto = require("./produtoRouter");
const routesPlano = require("./planoRouter");
const routesPedido = require("./pedidoRouter");
const routesAuth = require("./authRoutes.js")

router.get("/",(req,res)=>{
    res.status(200).json({message: "Connection stablished!"})
})

routesAuth(router)
routesUsuario(router);
routesSolicitacao(router);
routesProduto(router);
routesPlano(router);
routesPedido(router);

module.exports = router;