import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const { v4: uuidv4 } = require('uuid');

const carrinhoAdapter = createEntityAdapter({
    selectId: (item) => item.id,
});

export const fetchCarrinho = createAsyncThunk('carrinho/fetchCarrinho', async () => {
    try {
      const carrinho = localStorage.getItem('carrinho');
      return carrinho ? JSON.parse(carrinho) : [];
      
    } catch (error) {
      console.log("Erro ao buscar carrinho", error);
      return [];
    }
  });

export const addToCarrinho = createAsyncThunk('carrinho/addCarrinho', async (novoItem, {getState}) => {
    try {
      const state = getState();
      const carrinho = state.carrinho.entities;

      // Verificar se o item já está no carrinho
      const itemExistente = Object.values(carrinho).find(item => item.prodId === novoItem.prodId);
      if(itemExistente) throw new Error('Produto já adicionado ao carrinho');
            
      novoItem = {
        id: uuidv4(),
        ...novoItem
      };

      const novoCarrinho = {
        ...carrinho,
        [novoItem.id]: novoItem
      };
      
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));

      return novoItem;
    } catch (error) {
      console.log('Erro ao adicionar produto no carrinho:', error);
      throw error;
    }
  });

export const updateCarrinho = createAsyncThunk('carrinho/updateCarrinho', async (itemAtualizado) => {
    try {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};

      if (!carrinho[itemAtualizado.id]) {
        throw new Error('Produto não encontrado no carrinho');
      }

      carrinho[itemAtualizado.id].qtd = itemAtualizado.qtd;

      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      console.log(carrinho);
      return carrinho[itemAtualizado.id];
      
    } catch (error) {
      console.log('Erro ao atualizar produto no carrinho:', error);
      throw error;
    }
  });

export const deleteCarrinho = createAsyncThunk('carrinho/deleteCarrinho', async (idProduto) => {
    try {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
      
      delete carrinho[idProduto];
      console.log(carrinho)
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

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
                console.log(`[ ${(new Date()).toUTCString()} ] Dados de carrinho carregados com sucesso`)
            })
            .addCase(fetchCarrinho.rejected,(state) => { 
                state.status = 'rejected'; 
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao carregar dados de carrinho...`)
            })
            // addToCarrinho
            .addCase(addToCarrinho.pending, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Adicionando novo item ao carrinho...`);
            })
            .addCase(addToCarrinho.fulfilled, (state, action) => {
                carrinhoAdapter.addOne(state, action.payload);
                console.log(`[ ${(new Date()).toUTCString()} ] Item adicionado com sucesso ao carrinho`);
            })
            .addCase(addToCarrinho.rejected, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao adicionar item ao carrinho`);
            })

            // Update Carrinho
            .addCase(updateCarrinho.pending, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Atualizando item do carrinho...`);
            })
            .addCase(updateCarrinho.fulfilled, (state, action) => {
              if (action.payload) {
                carrinhoAdapter.updateOne(state,{
                    id: action.payload.id,
                    changes: { qtd: action.payload.qtd }, // Atualiza a quantidade do item
                  });
                console.log(`[ ${(new Date()).toUTCString()} ] Carrinho atualizado com sucesso`);
              }
            })
            .addCase(updateCarrinho.rejected, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao atualizar carrinho`);
            })

            // Delete Carrinho
            .addCase(deleteCarrinho.pending, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Removendo item do carrinho...`);
            })
            .addCase(deleteCarrinho.fulfilled, (state, action) => {
                carrinhoAdapter.removeOne(state, action.payload)
                console.log(`[ ${(new Date()).toUTCString()} ] Item do Carrinho removido com sucesso`);
            })
            .addCase(deleteCarrinho.rejected, (state) => {
                console.log(`[ ${(new Date()).toUTCString()} ] Falha ao remover item do carrinho`);
            });
    }
})

export const carrinhoSelectors = carrinhoAdapter.getSelectors( state => state.carrinho );

export default carrinhoSlice.reducer;