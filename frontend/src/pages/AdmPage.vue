<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { api } from '../api';
import { isAxiosError } from 'axios';
import type { ApplicationError, User } from '../types';

const users = ref([] as User[]);
const errorMessage = ref('');
const userStore = useUserStore();

async function fetchUsers() {
  try {
    const res = await api.get('/users/', {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`,
      },
    });
    console.log("res", res);
    users.value = res.data.data;
    console.log(users.value);
  } catch (error) {
    if (isAxiosError(error)) {
      errorMessage.value = 'Erro ao buscar usuários';
      console.error('Erro ao buscar usuários:', error);
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

onMounted(fetchUsers);
</script>

<template>
  <div class="adm-page">
    <div class="content">
      <h2>Usuários</h2>
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
              <button @click="deleteUser(user.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<style scoped>
.adm-page {
  background-color: #000; /* Fundo preto */
  padding: 20px;
}

h2 {
  color: #fff; /* Texto branco */
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: white; /* Texto branco */
}

th, td {
  border: 1px solid  white; /* Bordas escuras para combinar com o fundo */
  padding: 10px;
  text-align: left;
}

th {
  background-color: black; /* Fundo das células de cabeçalho */
}

td {
  background-color: black; /* Fundo das células de dados */
}

button {
  background-color: #eb7f19; /* Cor do botão */
  color: black; /* Cor do texto no botão */
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d4ac0d; /* Cor ao passar o mouse */
}

.content {
  margin: 0 auto;
  max-width: 800px;
}

.errorMessage {
  color: red;
  margin-top: 20px;
  text-align: center;
}
</style>
