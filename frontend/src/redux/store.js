import { configureStore } from '@reduxjs/toolkit'
import planoReducer from './planoSlice'
import produtosSlice from './produtoSlice'

const store = configureStore({
    reducer:{
        planos: planoReducer,
        produtos: produtosSlice

    },
})

export default store