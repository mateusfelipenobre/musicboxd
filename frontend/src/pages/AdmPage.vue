<template>
  <div class="adm-page">
    <div class="content">
      <div class="container">
        <form @submit.prevent="currentUser.id ? updateUser() : createUser()" class="user-form">
          <h3>{{ currentUser.id ? 'Editar Usuário' : 'Criar Novo Usuário' }}</h3>
          <div class="form-group">
            <label for="name">Nome</label>
            <input type="text" id="name" v-model="currentUser.name" required />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="currentUser.username" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="currentUser.email" required />
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input type="password" id="password" v-model="currentUser.password" required />
          </div>
          <div class="form-group">
            <label for="role">Papel</label>
            <select id="role" v-model="currentUser.role" required>
              <option value="1">Admin</option>
              <option value="2">Usuário</option>
            </select>
          </div>
          <button type="submit">{{ currentUser.id ? 'Atualizar Usuário' : 'Criar Usuário' }}</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Username</th>
              <th>Email</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button @click="editUser(user)">Editar</button>
                <button @click="deleteUser(user.id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { api } from '../api';
import { isAxiosError } from 'axios';
import type { User } from '../types';

const users = ref([] as User[]);
const currentUser = ref({ id: null, name: '', username: '', email: '', password: '', role: '2' });
const errorMessage = ref('');
const userStore = useUserStore();

async function fetchUsers() {
  try {
    const res = await api.get('/users/', {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    });
    users.value = res.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      errorMessage.value = 'Erro ao buscar usuários';
      console.error('Erro ao buscar usuários:', error);
    }
  }
}

async function createUser() {
  try {
    const res = await api.post('/users', currentUser.value, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    });
    users.value.push(res.data.data);
    resetForm();
  } catch (error) {
    if (isAxiosError(error)) {
      errorMessage.value = 'Erro ao criar usuário';
      console.error('Erro ao criar usuário:', error);
    }
  }
}

async function updateUser() {
  try {
    const res = await api.put(`/users/${currentUser.value.id}`, currentUser.value, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    });
    const index = users.value.findIndex(user => user.id === currentUser.value.id);
    if (index !== -1) {
      users.value[index] = res.data.data; 
    }
    resetForm();
  } catch (error) {
    if (isAxiosError(error)) {
      errorMessage.value = 'Erro ao atualizar usuário';
      console.error('Erro ao atualizar usuário:', error);
    }
  }
}

async function deleteUser(id: number) {
  try {
    await api.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    });
    users.value = users.value.filter(user => user.id !== id);
  } catch (error) {
    if (isAxiosError(error)) {
      errorMessage.value = 'Erro ao excluir usuário';
      console.error('Erro ao excluir usuário:', error);
    }
  }
}

function editUser(user: User) {
  currentUser.value = { ...user }; 
}

function resetForm() {
  currentUser.value = { id: null, name: '', username: '', email: '', password: '', role: '2' }; // Reseta o formulário
}

onMounted(fetchUsers);
</script>

<style scoped>
.adm-page {
  background-color: #000; 
  padding: 50px;
}

h2, h3 {
  color: #fff; 
  text-align: center;
}

.container {
  display: flex; 
  justify-content: space-between;
}

.user-form {
  padding: 20px;
  border-radius: 5px;
  margin-right: 30px; 
  flex: 1; 
}

.table-container {
  flex: 1; 
}

.form-group {
  margin-bottom: 15px; 
}

label {
  color: #fff; 
}

input, select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #fff;
  border-radius: 3px;
  color: #fff; 
}

button {
  background-color: #000; 
  color: white; 
  border: none;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #eb7f19; 
}
table {
  width: 50%;
  border-collapse: collapse;
  color: white; 
}

th, td {
  border: 1px solid  white; 
  padding: 2px 5px;
  text-align: left;
  border: 1px solid white; 
  padding: 5px;
  text-align: left;
  font-size: 14px; 
}

.errorMessage {
  color: red;
  margin-top: 20px;
  text-align: center;
}
</style>
