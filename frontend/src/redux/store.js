import { configureStore } from '@reduxjs/toolkit'
import planoReducer from './planoSlice'

const store = configureStore({
    reducer:{
        planos: planoReducer,

    },
})

export default store