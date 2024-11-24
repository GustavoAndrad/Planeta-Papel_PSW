import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks para operações assíncronas com a API
export const fetchProdutos = createAsyncThunk('produtos/fetchProdutos', async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos`);
    return await response.json();
  } catch (error) {
    console.log('Erro ao buscar produtos:', error);
    return [];
  }
});

export const createProduto = createAsyncThunk('produtos/createProduto', async (novoProduto) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto),
    });
    return await response.json();
  } catch (error) {
    console.log('Erro ao criar produto:', error);
    throw error;
  }
});

export const updateProduto = createAsyncThunk('produtos/updateProduto', async (produtoAtualizado) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos/${produtoAtualizado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produtoAtualizado),
    });
    return await response.json();
  } catch (error) {
    console.log('Erro ao atualizar produto:', error);
    throw error;
  }
});

export const deleteProduto = createAsyncThunk('produtos/deleteProduto', async (idProduto) => {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/produtos/${idProduto}`, {
      method: 'DELETE',
    });
    return idProduto;
  } catch (error) {
    console.log('Erro ao deletar produto:', error);
    throw error;
  }
});

// Slice
const produtoSlice = createSlice({
  name: 'produtos',
  initialState: {
    produtos: [],
    status: 'idle', // Status da requisição
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch produtos
      .addCase(fetchProdutos.pending, (state) => {
        state.status = 'pending';
        console.log(`[ ${(new Date()).toUTCString()} ] Carregando dados de produtos...`);
      })
      .addCase(fetchProdutos.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.produtos = action.payload;
        console.log(`[ ${(new Date()).toUTCString()} ] Dados de produtos carregados com sucesso`);
      })
      .addCase(fetchProdutos.rejected, (state) => {
        state.status = 'rejected';
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao carregar dados de produtos...`);
      })

      // Create produto
      .addCase(createProduto.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Criando novo produto...`);
      })
      .addCase(createProduto.fulfilled, (state, action) => {
        state.produtos.push(action.payload);
        console.log(`[ ${(new Date()).toUTCString()} ] Produto criado com sucesso`);
      })
      .addCase(createProduto.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao criar produto`);
      })

      // Update produto
      .addCase(updateProduto.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Atualizando produto...`);
      })
      .addCase(updateProduto.fulfilled, (state, action) => {
        const index = state.produtos.findIndex((p) => p.id === action.payload.id);
        if (index >= 0) {
          state.produtos[index] = action.payload;
        }
        console.log(`[ ${(new Date()).toUTCString()} ] Produto atualizado com sucesso`);
      })
      .addCase(updateProduto.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao atualizar produto`);
      })

      // Delete produto
      .addCase(deleteProduto.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Removendo produto...`);
      })
      .addCase(deleteProduto.fulfilled, (state, action) => {
        state.produtos = state.produtos.filter((p) => p.id !== action.payload);
        console.log(`[ ${(new Date()).toUTCString()} ] Produto removido com sucesso`);
      })
      .addCase(deleteProduto.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao remover produto`);
      });
  },
});

export default produtoSlice.reducer;