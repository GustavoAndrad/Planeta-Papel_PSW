import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const planosAdapter = createEntityAdapter({
    selectId: (plano) => plano.id,
})

export const fetchPlanos = createAsyncThunk('planos/fetchPlanos', async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/planos`);
      let planos = await response.json();
      return planos;
      
    } catch (error) {
      console.log("Erro ao buscar planos", error);
      return [];
    }
  });

export const createPlano = createAsyncThunk('planos/createPlano', async (novoPlano) => {
try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/planos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
     },
    body: JSON.stringify(novoPlano),
    });
    return await response.json();
} catch (error) {
    console.log('Erro ao criar plano:', error);
    throw error;
}
});

export const updatePlano = createAsyncThunk('planos/updatePlano', async (planoAtualizado) => {
try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${process.env.REACT_APP_API_URL}/planos/${planoAtualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(planoAtualizado)
    });
    return await response.json();
} catch (error) {
    console.log('Erro ao atualizar plano:', error);
    throw error;
}
});

export const deletePlano = createAsyncThunk('planos/deletePlano', async (idPlano) => {
    try {
        const token = localStorage.getItem("token");
      await fetch(`${process.env.REACT_APP_API_URL}/planos/${idPlano}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return idPlano;
    } catch (error) {
      console.log('Erro ao deletar plano:', error);
      throw error;
    }
});

export const planosSlice = createSlice({
    name: 'planos',
    initialState: planosAdapter.getInitialState({
        status: 'idle'
    }),
    reducers:{
        /*
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
        */
    },
    extraReducers: (builder) => {
        builder
            // Fetch Planos
            .addCase(fetchPlanos.pending,(state) => { 
                state.status = 'pending';
                console.log(`[ ${(new Date()).toUTCString()} ] Carregando dados de planos...`)
            })
            .addCase(fetchPlanos.fulfilled,(state, action) => { 
                state.status = 'fulfilled'; 
                planosAdapter.setAll(state, action.payload);
                console.log(`[ ${(new Date()).toUTCString()} ] Dados de planos carregados com sucesso`)
            })
            .addCase(fetchPlanos.rejected,(state) => { 
                state.status = 'rejected'; 
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao carregar dados de planos...`)
            })
            // Create plano
            .addCase(createPlano.pending, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Criando novo plano...`);
            })
            .addCase(createPlano.fulfilled, (state, action) => {
                planosAdapter.addOne(state, action.payload);
                console.log(`[ ${(new Date()).toUTCString()} ] Plano criado com sucesso`);
            })
            .addCase(createPlano.rejected, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao criar plano`);
            })

            // Update plano
            .addCase(updatePlano.pending, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Atualizando plano...`);
            })
            .addCase(updatePlano.fulfilled, (state, action) => {
                planosAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload
                });
                console.log(`[ ${(new Date()).toUTCString()} ] Plano atualizado com sucesso`);
            })
            .addCase(updatePlano.rejected, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao atualizar plano`);
            })

            // Delete plano
            .addCase(deletePlano.pending, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Removendo plano...`);
            })
            .addCase(deletePlano.fulfilled, (state, action) => {
                planosAdapter.removeOne(state, action.payload);
                console.log(`[ ${(new Date()).toUTCString()} ] Plano removido com sucesso`);
            })
            .addCase(deletePlano.rejected, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao remover plano`);
            });

    },
});

//export const { addPlano, updatePlano, removePlano} = planosSlice.actions;
export const planoSelectors = planosAdapter.getSelectors(state => state.planos);

export default planosSlice.reducer;