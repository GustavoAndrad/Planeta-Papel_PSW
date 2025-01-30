import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const pedidoAdapter = createEntityAdapter({
  selectId: (pedido) => pedido.id,
});

export const fetchPedidos = createAsyncThunk('pedidos/fetchPedidos', async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/pedidos`, 
      {
        headers: {Authorization: `Bearer ${token}`}
      }
    );
    let pedidos = await response.json();
    return pedidos.message;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    throw error;
  }
});

export const createPedido = createAsyncThunk('pedidos/createPedido', async (newPedido) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
       },
      body: JSON.stringify(newPedido),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
});

export const updatePedido = createAsyncThunk('pedidos/updatePedido', async (updatedPedido) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/pedidos/${updatedPedido.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
       },
      body: JSON.stringify(updatedPedido),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    throw error;
  }
});

export const deletePedido = createAsyncThunk('pedidos/deletePedido', async (pedidoId) => {
  try {
    const token = localStorage.getItem("token");
    await fetch(`${process.env.REACT_APP_API_URL}/pedidos/${pedidoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return pedidoId; 
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);
    throw error;
  }
});

const pedidoSlice = createSlice({
  name: 'pedidos',
  initialState: pedidoAdapter.getInitialState({
    status: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidos.pending, (state) => {
        state.status = 'pending';
        console.log(`[ ${(new Date()).toUTCString()} ] Carregando pedidos...`);
      })
      .addCase(fetchPedidos.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        pedidoAdapter.setAll(state, action.payload);
        console.log(`[ ${(new Date()).toUTCString()} ] Pedidos carregados com sucesso`);
      })
      .addCase(fetchPedidos.rejected, (state) => {
        state.status = 'rejected';
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao carregar pedidos`);
      })

      .addCase(createPedido.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Criando pedido...`);
      })
      .addCase(createPedido.fulfilled, (state, action) => {
        pedidoAdapter.addOne(state, action.payload);
        console.log(`[ ${(new Date()).toUTCString()} ] Pedido criado com sucesso`);
      })
      .addCase(createPedido.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao criar pedido`);
      })

      // Update pedido
      .addCase(updatePedido.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Atualizando pedido...`);
      })
      .addCase(updatePedido.fulfilled, (state, action) => {
        pedidoAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
        console.log(`[ ${(new Date()).toUTCString()} ] Pedido atualizado com sucesso`);
      })
      .addCase(updatePedido.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao atualizar pedido`);
      })

      // Delete pedido
      .addCase(deletePedido.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Removendo pedido...`);
      })
      .addCase(deletePedido.fulfilled, (state, action) => {
        pedidoAdapter.removeOne(state, action.payload);
        console.log(`[ ${(new Date()).toUTCString()} ] Pedido removido com sucesso`);
      })
      .addCase(deletePedido.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao remover pedido`);
      });
  },
});

export const pedidoSelectors = pedidoAdapter.getSelectors((state) => state.pedidos);

export const selectPedidoById = (state, pedidoId) =>
  pedidoSelectors.selectById(state, pedidoId);

export default pedidoSlice.reducer;
