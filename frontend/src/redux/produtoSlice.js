import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const produtoAdapter = createEntityAdapter({
  selectId: (prod) => prod.id,
});

// Thunks para operações assíncronas com a API
export const fetchProdutos = createAsyncThunk('produtos/fetchProdutos', async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos`);
    return await response.json();
  } catch (error) {
    console.log('Erro ao buscar produtos:', error);
    throw error;
  }
});

export const createProduto = createAsyncThunk('produtos/createProduto', async ({produtoData, imagens}) => {
  try {
    const formData = new FormData();

    // Adiciona os arquivos de imagem (até 3)
    imagens.forEach((image, index) => {
      if (index < 4) {
        formData.append('image', image.file); // 'image' é o nome do campo para as imagens
      }
    });

    // Adiciona o JSON como uma string
    formData.append('jsonData', JSON.stringify(produtoData));

    const token = localStorage.getItem("token")

    const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos`, {
      method: 'POST',
      body: formData,
      headers: { 
        Authorization: `Bearer ${token}`
      },
    });

    return await response.json();
  
  } catch (error) {
    console.log('Erro ao criar produto:', error);
    throw error;
  }
});

export const updateProduto = createAsyncThunk('produtos/updateProduto', async ({produtoData, imagens}) => {
  try {
    const formData = new FormData();

    // Adiciona os arquivos de imagem (até 3)
    imagens.forEach((image, index) => {
      if (index < 4) {
        formData.append('image', image); // 'image' é o nome do campo para as imagens
      }
    });

    // Adiciona o JSON como uma string
    formData.append('jsonData', JSON.stringify(produtoData));

    const token = localStorage.getItem("token")

    const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos/${produtoData.id}`, {
      method: 'PATCH',
      body: formData,
      headers: { 
        Authorization: `Bearer ${token}`
      },
    });
    return await response.json();
  } catch (error) {
    console.log('Erro ao atualizar produto:', error);
    throw error;
  }
});


export const updateQuickProduto = createAsyncThunk('produtos/updateQuickProduto', async ({id, produtoData}) => {
  try {

    const token = localStorage.getItem("token")

    console.log(produtoData)

    const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos/quick/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(produtoData),
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    return await response.json();
  } catch (error) {
    console.log('Erro ao atualizar produto:', error);
    throw error;
  }
});

export const deleteProduto = createAsyncThunk('produtos/deleteProduto', async (idProduto) => {
  try {
    const token = localStorage.getItem("token")

    await fetch(`${process.env.REACT_APP_API_URL}/produtos/${idProduto}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${token}`
      },
    });
    return idProduto; // Retorna o ID para remoção no estado
  } catch (error) {
    console.log('Erro ao deletar produto:', error);
    throw error;
  }
});

// Slice
const produtoSlice = createSlice({
  name: 'produtos',
  initialState: produtoAdapter.getInitialState({
    status: 'idle', // Status da requisição
  }),
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
        produtoAdapter.setAll(state, action.payload.produtos); // Adiciona todos os produtos
        console.log(`[ ${(new Date()).toUTCString()} ] Dados de produtos carregados com sucesso`);
      })
      .addCase(fetchProdutos.rejected, (state) => {
        state.status = 'rejected';
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao carregar dados de produtos`);
      })

      // Create produto
      .addCase(createProduto.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Criando novo produto...`);
      })
      .addCase(createProduto.fulfilled, (state, action) => {
        produtoAdapter.addOne(state, action.payload);
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
        produtoAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
        console.log(`[ ${(new Date()).toUTCString()} ] Produto atualizado com sucesso`);
      })
      .addCase(updateProduto.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao atualizar produto`);
      })

      // Update Quick produto
      .addCase(updateQuickProduto.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Atualizando produto...`);
      })
      .addCase(updateQuickProduto.fulfilled, (state, action) => {
        produtoAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
        console.log(`[ ${(new Date()).toUTCString()} ] Produto atualizado com sucesso`);
      })
      .addCase(updateQuickProduto.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao atualizar produto`);
      })

      // Delete produto
      .addCase(deleteProduto.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Removendo produto...`);
      })
      .addCase(deleteProduto.fulfilled, (state, action) => {
        produtoAdapter.removeOne(state, action.payload);
        console.log(`[ ${(new Date()).toUTCString()} ] Produto removido com sucesso`);
      })
      .addCase(deleteProduto.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao remover produto`);
      });
  },
});

export const produtoSelectors = produtoAdapter.getSelectors((state) => state.produtos);

export default produtoSlice.reducer;



const selectProdutosEntities = (state) => state.produtos.entities;
const selectProdutosIds = (state) => state.produtos.ids;

export const selectProdutoByID = createSelector(
  [selectProdutosEntities, selectProdutosIds],
  (entities, ids) => {
    return ids.map(id => entities[id]).filter(Boolean);
  }
);
