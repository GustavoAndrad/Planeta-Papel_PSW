import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const userAdapter = createEntityAdapter({
  selectId: (user) => user.id, // Seleciona o campo `id` como identificador
});

// Thunks para operações assíncronas com a API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
});

export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      method: 'DELETE',
    });
    return userId; // Retorna o ID para remoção no estado
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
});

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState({
    status: 'idle', // Status inicial
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'pending';
        console.log(`[ ${(new Date()).toUTCString()} ] Carregando dados de usuários...`);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        userAdapter.setAll(state, action.payload); // Adiciona todos os usuários
        console.log(`[ ${(new Date()).toUTCString()} ] Dados de usuários carregados com sucesso`);
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'rejected';
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao carregar dados de usuários`);
      })

      // Create user
      .addCase(createUser.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Criando novo usuário...`);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        userAdapter.addOne(state, action.payload);
        console.log(`[ ${(new Date()).toUTCString()} ] Usuário criado com sucesso`);
      })
      .addCase(createUser.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao criar usuário`);
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Atualizando usuário...`);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        userAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
        console.log(`[ ${(new Date()).toUTCString()} ] Usuário atualizado com sucesso`);
      })
      .addCase(updateUser.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao atualizar usuário`);
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Removendo usuário...`);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        userAdapter.removeOne(state, action.payload);
        console.log(`[ ${(new Date()).toUTCString()} ] Usuário removido com sucesso`);
      })
      .addCase(deleteUser.rejected, (state) => {
        console.log(`[ ${(new Date()).toUTCString()} ] Falha ao remover usuário`);
      });
  },
});

export const userSelectors = userAdapter.getSelectors((state) => state.users);

export const selectUserById = (state, userId) =>
    userSelectors.selectById(state, userId);

export default userSlice.reducer;
