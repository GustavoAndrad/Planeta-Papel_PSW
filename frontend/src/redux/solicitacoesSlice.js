import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

const solicitacaoAdapter = createEntityAdapter({
    selectId: (solic) => solic.id,
});

export const fetchSolicitacoes = createAsyncThunk('solicitacoes/fetchSolicitacoes', async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/solicitacoes`);
      return await response.json();
    } catch (error) {
      console.log('Erro ao buscar produtos:', error);
      return [];
    }
  });
  
  export const createSolicitacao = createAsyncThunk('solicitacoes/createSolicitacoes', async (novaSolicitacao) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/solicitacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaSolicitacao),
      });
      return await response.json();
    } catch (error) {
      console.log('Erro ao criar solicitacao:', error);
      throw error;
    }
  });
  
  export const updateSolicitacao = createAsyncThunk('solicitacoes/updateSolicitacoes', async (solicitacoAtualizada) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/solicitacoes/${solicitacoAtualizada.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solicitacoAtualizada),
      });
      return await response.json();
    } catch (error) {
      console.log('Erro ao atualizar solicitacao:', error);
      throw error;
    }
  });
  
  export const deleteSolicitacao = createAsyncThunk('solicitacoes/deleteSolicitacoes', async (idSolicitacao) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/solicitacoes/${idSolicitacao}`, {
        method: 'DELETE',
      });
      return idSolicitacao;
    } catch (error) {
      console.log('Erro ao deletar solicitacao:', error);
      throw error;
    }
  });

const solicitacaoSlice = createSlice({
    name: 'solicitacoes',
    initialState: solicitacaoAdapter.getInitialState({ 
      status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch solicitacoes
        .addCase(fetchSolicitacoes.pending, (state) => {
          state.status = 'pending';
          console.log(`[ ${(new Date()).toUTCString()} ] Carregando as solicitacoes...`);
        })
        .addCase(fetchSolicitacoes.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          solicitacaoAdapter.setAll(state, action.payload);
          console.log(`[ ${(new Date()).toUTCString()} ] Solicitacoes carregadas com sucesso`);
        })
        .addCase(fetchSolicitacoes.rejected, (state) => {
          state.status = 'rejected';
          console.log(`[ ${(new Date()).toUTCString()} ] Falha ao carregar solicitacoes`);
        })
  
        // Create solicitacao
        .addCase(createSolicitacao.pending, (state) => {
          console.log(`[ ${(new Date()).toUTCString()} ] Criando nova solicitação`);
        })
        .addCase(createSolicitacao.fulfilled, (state, action) => {
          solicitacaoAdapter.addOne(state, action.payload);
          console.log(`[ ${(new Date()).toUTCString()} ] Solicitação criada com sucesso`);
        })
        .addCase(createSolicitacao.rejected, (state) => {
          console.log(`[ ${(new Date()).toUTCString()} ] Falha ao criar solicitacao`);
        })
  
        .addCase(updateSolicitacao.pending, (state) => {
          console.log(`[ ${(new Date()).toUTCString()} ] Atualizando solicitacao`);
        })
        .addCase(updateSolicitacao.fulfilled, (state, action) => {
          solicitacaoAdapter.updateOne(state, action.payload);
          console.log(`[ ${(new Date()).toUTCString()} ] Solicitacao atualizada com sucesso`);
        })
        .addCase(updateSolicitacao.rejected, (state) => {
          console.log(`[ ${(new Date()).toUTCString()} ] Falha ao atualizar solicitacao`);
        })
  
        .addCase(deleteSolicitacao.pending, (state) => {
          console.log(`[ ${(new Date()).toUTCString()} ] Removendo solicitacao`);
        })
        .addCase(deleteSolicitacao.fulfilled, (state, action) => {
          solicitacaoAdapter.removeOne(state, action.payload);
          console.log(`[ ${(new Date()).toUTCString()} ] Solicitacao removida com sucesso`);
        })
        .addCase(deleteSolicitacao.rejected, (state) => {
          console.log(`[ ${(new Date()).toUTCString()} ] Falha ao remover solicitacao`);
        });
    },
  });
  
  export const solicSelectors = solicitacaoAdapter.getSelectors( state => state.solicitacoes );
  
  export default solicitacaoSlice.reducer;
  
  const selectSolicitacoesEntities = (state) => state.solicitacoes.entities;
  const selectSolicitacoesIds = (state) => state.solicitacoes.ids;
  
  export const selectSolicitacaoByID = createSelector(
    [selectSolicitacoesEntities, selectSolicitacoesIds],
    (entities, ids) => {
      return ids.map(id => entities[id]).filter(Boolean);
    }
  );