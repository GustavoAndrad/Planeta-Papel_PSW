import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPlanos = createAsyncThunk('planos/fetchProdutos', async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/planos`);
      let planos = await response.json();
      return planos;
      
    } catch (error) {
      console.log("Erro ao buscar produtos", error);
      return [];
    }
  });

export const planosSlice = createSlice({
    name: 'planos',
    initialState: {
        planos: [],
        status: 'idle', // requisição ainda não foi feita
    },
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
    },
    extraReducers: (builder) => {
        builder
            // PENDING OPERATION
            .addCase(fetchPlanos.pending,
                (state) => { 
                    state.status = 'pending';
                    console.log(`[ ${(new Date()).toUTCString()} ] Carregando dados de planos...`)
            })

            // FULLFILLED OPERATION
            .addCase(fetchPlanos.fulfilled,
                (state, action) => { 
                    state.status = 'fulfilled'; 
                    state.planos = action.payload;
                    console.log(`[ ${(new Date()).toUTCString()} ] Dados de planos carregados com sucesso`)
            })

            // REJECTED OPERATION
            .addCase(fetchPlanos.rejected,
                (state) => { state.status = 'rejected'; 
                    console.log(`[ ${(new Date()).toUTCString()} ] Falha ao carregar dados de planos...`)
            });
    },
});

export const { addPlano, updatePlano, removePlano} = planosSlice.actions;

export default planosSlice.reducer;