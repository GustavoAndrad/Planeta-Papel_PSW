import { configureStore } from '@reduxjs/toolkit'
import planoReducer from './planoSlice'
import carrinhoReducer from './carrinhoSlice'

const store = configureStore({
    reducer:{
        planos: planoReducer,
        carrinho: carrinhoReducer,
    },
})

export default store