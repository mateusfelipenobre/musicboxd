<template>
  <div class="login-container">
    <div class="card-body">
      <h5 class="card-title">Login</h5>
      <div v-if="exception" class="alert alert-danger">
        {{ exception.message }}
      </div>
      <form v-if="!loading" @submit.prevent="authenticate" class="login-form">
        <div class="form-group">
          <label for="usernameInput">Nome de usuário:</label>
          <input
            v-model="username"
            type="text"
            id="usernameInput"
            placeholder="mail@mail.com"
            required
            :class="{ 'is-invalid': usernameError }"
          />
          <div v-if="usernameError" class="invalid-feedback">
            Email não válido :/
          </div>
        </div>
        <div class="form-group">
          <label for="passwordInput">Senha</label>
          <input
            v-model="password"
            type="password"
            id="passwordInput"
            required
            :class="{ 'is-invalid': passwordError }"
          />
          <div v-if="passwordError" class="invalid-feedback">
            A senha é obrigatória
          </div>
        </div>
        <div class="form-group">
          <input type="submit" class="login-button" value="Enviar" />
        </div>
      </form>
      <p v-else>
        Esperando resposta do servidor...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/api';
import { isAxiosError } from 'axios';
import { isApplicationError } from '@/composables/useApplicationError';
import type { ApplicationError } from '@/types';
import { useUserStore } from '@/stores/userStore';

const username = ref('');
const password = ref('');
const loading = ref(false);
const exception = ref<ApplicationError>();
const usernameError = ref(false);
const passwordError = ref(false);
const router = useRouter();
const userStore = useUserStore();

async function authenticate() {
  // Limpa os erros anteriores
  usernameError.value = false;
  passwordError.value = false;
  
  // Validação simples dos campos de entrada
  if (!username.value) {
    usernameError.value = true;
  }
  if (!password.value) {
    passwordError.value = true;
  }
  
  // Se houver erros, parar a função
  if (usernameError.value || passwordError.value) {
    return;
  }

  try {
    loading.value = true;
    exception.value = undefined;

    const { data } = await api.post('/login', {
      username: username.value,
      password: password.value
    });

    const { jwt, user } = data.data;

    localStorage.setItem('token', jwt);

    // Certifique-se de enviar o token nas requisições subsequentes
    api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    // Atualiza o estado do usuário no store
    userStore.authenticaded(user, jwt);

    // Redireciona para a rota baseada no papel do usuário
    if (user.role.name === 'admin') {
      router.push('/adm');
    } else {
      router.push('/timeline');
    }
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      exception.value = e.response?.data;
    } else {
      console.error('Login error:', e);
      exception.value = {
        status: e.response?.status || 500,
        name: 'Request Error',
        message: 'An error occurred while processing your request.'
      };
    }
  } finally {
    loading.value = false;
  }
}
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
}

.card-body {
  width: 100%;
  max-width: 300px;
  margin: auto;
}

.card-title {
  color: white;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  color: white;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #eb7f19;
  background-color: transparent;
  color: white;
}

input::placeholder {
  color: #ccc;
}

.login-button {
  background-color: #eb7f19;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #d47017;
}

.alert {
  color: red;
  margin-bottom: 15px;
}
</style>