import { configureStore } from '@reduxjs/toolkit'
import planoReducer from './planoSlice'
import produtosSlice from './produtoSlice'
import carrinhoReducer from './carrinhoSlice'


const store = configureStore({
    reducer:{
        planos: planoReducer,
        produtos: produtosSlice,
        carrinho: carrinhoReducer,
    },
})

export default store