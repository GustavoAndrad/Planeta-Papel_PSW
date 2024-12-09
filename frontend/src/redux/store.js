import { configureStore } from '@reduxjs/toolkit'
import planoReducer from './planoSlice'
import produtosSlice from './produtoSlice'
import carrinhoReducer from './carrinhoSlice'
import solicitacoesSlice from './solicitacoesSlice'


const store = configureStore({
    reducer:{
        planos: planoReducer,
        produtos: produtosSlice,
        carrinho: carrinhoReducer,
        solicitacoes: solicitacoesSlice,
    },
})

export default store