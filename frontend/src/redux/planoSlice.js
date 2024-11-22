import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        nome: "Origami", 
        preco: "123", 
        duracao: "3 meses", 
        beneficios: ["15% de desconto", "Brindes exclusivos"]
    },
    {
        id: 2,
        nome: "A4",
        preco: "555",
        duracao: "5 meses", 
        beneficios: ["20% de desconto", "alguma coisa"]
    }
]

export const planosSlice = createSlice({
    name: 'planos',
    initialState,
    reducers:{
        addPlano:(state, action) => {
            state.push(action.payload);
        },
        updatePlano: (state, action) => {
            const { id, updatedPlano } = action.payload;
            const planoIndex = state.findIndex(plano => plano.id === id);
            if (planoIndex !== -1) {
                state[planoIndex] = { ...state[planoIndex], ...updatedPlano };//esta certo??
            }
        },
        removePlano: (state, action) => {
            const id = action.payload;
            const index = state.findIndex(item => item.id === id);
            if (index !== -1) {
                state.splice(index, 1); 
            }
        },
    }   
});

export const { addPlano, updatePlano, removePlano} = planosSlice.actions;

export default planosSlice.reducer;