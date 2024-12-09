import { configureStore } from '@reduxjs/toolkit'
import planoReducer from './planoSlice'
import produtosSlice from './produtoSlice'
import carrinhoReducer from './carrinhoSlice'
import usuarioSlice from "./usuarioSlice"

const store = configureStore({
    reducer:{
        planos: planoReducer,
        produtos: produtosSlice,
        carrinho: carrinhoReducer,
        users: usuarioSlice
    },
})

export default store