import { configureStore } from '@reduxjs/toolkit';
import planoSlice from './planoSlice';
import produtosSlice from './produtoSlice';
import carrinhoSlice from './carrinhoSlice';
import usuarioSlice from "./usuarioSlice";
import solicitacoesSlice from './solicitacoesSlice';
import pedidoSlice from './pedidoSlice';

const store = configureStore({
    reducer: {
        planos: planoSlice,
        produtos: produtosSlice,
        carrinho: carrinhoSlice,
        users: usuarioSlice,
        solicitacoes: solicitacoesSlice,
        pedidos: pedidoSlice,
    },
});

export default store;
