import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const carrinhoAdapter = createEntityAdapter({
    selectId: (item) => item.id,
});

export const fetchCarrinho = createAsyncThunk('carrinho/fetchCarrinho', async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/carrinho`);
      let carrinho = await response.json();
      return carrinho;
      
    } catch (error) {
      console.log("Erro ao buscar carrinho", error);
      return [];
    }
  });

export const addToCarrinho = createAsyncThunk('carrinho/addCarrinho', async (novoItem, {getState}) => {
    try {
      const state = getState();
      const carrinho = state.carrinho.entities; // Supondo que o carrinho esteja armazenado no estado global

      // Verificar se o item já está no carrinho
      const itemExistente = Object.values(carrinho).find(item => item.prodId === novoItem.prodId);
      if(itemExistente) throw new Error('Produto já adicionado ao carrinho');

      const response = await fetch(`${process.env.REACT_APP_API_URL}/carrinho`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoItem),
      });
      return await response.json();
    } catch (error) {
      console.log('Erro ao adicionar produto no carrinho:', error);
      throw error;
    }
  });

export const updateCarrinho = createAsyncThunk('carrinho/updateCarrinho', async (itemAtualizado) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/carrinho/${itemAtualizado.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemAtualizado),
      });
      return await response.json();
    } catch (error) {
      console.log('Erro ao atualizar produto no carrinho:', error);
      throw error;
    }
  });

export const deleteCarrinho = createAsyncThunk('carrinho/deleteCarrinho', async (idProduto) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/carrinho/${idProduto}`, {
        method: 'DELETE',
      });
      return idProduto;
    } catch (error) {
      console.log('Erro ao deletar produto do carrinho:', error);
      throw error;
    }
  });  

export const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState: carrinhoAdapter.getInitialState({
        status: 'idle'/* requisição ainda não foi feita*/
    }),
    reducers:{
        /*
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
        */
    },
    extraReducers: (builder) => {
        builder
            // Fetch Carrinho
            .addCase(fetchCarrinho.pending,(state) => { 
                state.status = 'pending';
                console.log(`[ ${(new Date()).toUTCString()} ] Carregando dados de carrinho...`)
            })
            .addCase(fetchCarrinho.fulfilled,(state, action) => { 
                state.status = 'fulfilled'; 
                carrinhoAdapter.setAll(state,action.payload);
                //console.log( action.payload)
                console.log(`[ ${(new Date()).toUTCString()} ] Dados de carrinho carregados com sucesso`)
            })
            .addCase(fetchCarrinho.rejected,(state) => { 
                state.status = 'rejected'; 
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao carregar dados de carrinho...`)
            })
            // addToCarrinho
            .addCase(addToCarrinho.pending, (state) => {
                //state.status = 'pending';
                console.log(`[ ${(new Date()).toUTCString()} ] Adicionando novo item ao carrinho...`);
            })
            .addCase(addToCarrinho.fulfilled, (state, action) => {
                //state.status = 'fulfilled'; 
                carrinhoAdapter.addOne(state, action.payload);
                console.log(`[ ${(new Date()).toUTCString()} ] Item adicionado com sucesso ao carrinho`);
            })
            .addCase(addToCarrinho.rejected, (state) => {
                //state.status = 'rejected'; 
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao adicionar item ao carrinho`);
            })

            // Update Carrinho
            .addCase(updateCarrinho.pending, (state) => {
                //state.status = 'pending';
                console.log(`[ ${(new Date()).toUTCString()} ] Atualizando item do carrinho...`);
            })
            .addCase(updateCarrinho.fulfilled, (state, action) => {
                //state.status = 'fulfilled';
                carrinhoAdapter.updateOne(state,{
                    id: action.payload.id,
                    changes: { qtd: action.payload.qtd }, // Atualiza a quantidade do item
                  });
                console.log(`[ ${(new Date()).toUTCString()} ] Carrinho atualizado com sucesso`);
            })
            .addCase(updateCarrinho.rejected, (state) => {
                //state.status = 'rejected'; 
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao atualizar carrinho`);
            })

            // Delete Carrinho
            .addCase(deleteCarrinho.pending, (state) => {
                //state.status = 'pending';
                console.log(`[ ${(new Date()).toUTCString()} ] Removendo item do carrinho...`);
            })
            .addCase(deleteCarrinho.fulfilled, (state, action) => {
                //state.status = 'fulfilled'; 
                carrinhoAdapter.removeOne(state, action.payload)
                console.log(`[ ${(new Date()).toUTCString()} ] Item do Carrinho removido com sucesso`);
            })
            .addCase(deleteCarrinho.rejected, (state) => {
                //state.status = 'rejected'; 
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao remover item do carrinho`);
            });
    }
})

export const carrinhoSelectors = carrinhoAdapter.getSelectors( state => state.carrinho );

export default carrinhoSlice.reducer;