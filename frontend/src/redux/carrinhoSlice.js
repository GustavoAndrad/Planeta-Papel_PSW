import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id:1, prodName: "Produto A", prodPrice: 10.50, qtd: 1 },
    { id:2, prodName: "Produto B", prodPrice: 10, qtd: 1 },
    { id:3, prodName: "Produto C", prodPrice: 15.30, qtd: 1 },
    { id:4, prodName: "Produto D", prodPrice: 12.99, qtd: 1 },
    { id:5, prodName: "Produto E", prodPrice: 8.75, qtd: 1 },
    { id:6, prodName: "Produto F", prodPrice: 22.40, qtd: 1 },
    { id:7, prodName: "Produto G", prodPrice: 5.60, qtd: 1 }
]

export const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers:{
        addCarrinho:(state, action) => {
            state.push(action.payload);
        },
        updateQtdCarrinho: (state, action) => {
            const { id, updated } = action.payload;
            const index = state.findIndex(item => item.id === id);
            if (index !== -1) {
                state[index] = { ...state[index], qtd: updated };//esta certo??
            }
        },
        removeCarrinho: (state, action) => {
            const id = action.payload;
            const index = state.findIndex(item => item.id === id);
            if (index !== -1) {
                state.splice(index, 1); 
            }
        }
    }
})

export const { addCarrinho, updateQtdCarrinho, removeCarrinho} = carrinhoSlice.actions;

export default carrinhoSlice.reducer;