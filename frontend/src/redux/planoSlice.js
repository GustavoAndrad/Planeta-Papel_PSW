import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        nome: "Origami", 
        custo: "123", 
        duracao: "3 meses", 
        beneficios: ["15% de desconto", "Brindes exclusivos"]
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
            const planoId = action.payload;
            const planoIndex = state.findIndex(plano => plano.id === planoId);
            if (planoIndex !== -1) {
                state.splice(planoIndex, 1); // Remove o item do array no estado
            }
        },
    }
});

export const { addPlano, updatePlano, removePlano} = planosSlice.actions;

export default planosSlice.reducer;