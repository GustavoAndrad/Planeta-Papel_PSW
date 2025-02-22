import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

const solicitacaoAdapter = createEntityAdapter({
    selectId: (solic) => solic.id,
});

export const fetchSolicitacoes = createAsyncThunk('solicitacoes/fetchSolicitacoes', async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/solicitacoes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let solics = await response.json();
      return solics.message;
    } catch (error) {
      console.log('Erro ao buscar produtos:', error);
      return [];
    }
  });
  
  export const createSolicitacao = createAsyncThunk('solicitacoes/createSolicitacoes', async (novaSolicitacao) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/solicitacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          Authorization: `Bearer ${token}`
        },
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
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/solicitacoes/${solicitacoAtualizada.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' ,
          Authorization: `Bearer ${token}`
        },
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
      const token = localStorage.getItem("token");
      await fetch(`${process.env.REACT_APP_API_URL}/solicitacoes/${idSolicitacao}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
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
          console.log("Recebido no Redux:", action.payload);
      
          if (action.payload?.id) {
              solicitacaoAdapter.updateOne(state, {
                  id: action.payload.id,
                  changes: action.payload
              });
              console.log("Solicitação atualizada no Redux");
          } else {
              console.error("Erro: Resposta da API não contém um ID válido.");
          }
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
  
  export const selectSolicitacoesByCliente = createSelector(
    [selectSolicitacoesEntities, (state, cliente) => cliente],
    (entities, cliente) => {
      // Filtra as solicitações com base no cliente
      return Object.values(entities).filter(solicitacao => solicitacao.cliente === cliente);
    }
  );