<template>
  <div class="login-container">
    <div class="">
      <div class="card-body">
        <h5 class="card-title">Login</h5>
        <div v-if="exception" class="alert alert-danger">
          {{ exception.message }}
        </div>
        <form v-if="!loading" @submit.prevent="authenticate" class="login-form">
          <div class="form-group">
            <label for="usernameInput">Nome de usuário:</label>
            <input v-model="username" type="text" id="usernameInput" placeholder="mail@mail.com" required />
            <div class="invalid-feedback">
              Email não válido :/
            </div>
          </div>
          <div class="form-group">
            <label for="passwordInput">Senha</label>
            <input v-model="password" type="password" id="passwordInput" required />
            <div class="invalid-feedback">
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
const router = useRouter();
const userStore = useUserStore();

async function authenticate() {
  try {
    loading.value = true;
    exception.value = undefined;

    const { data } = await api.post('/login', {
      username: username.value,
      password: password.value
    });

    const { jwt, user } = data.data;

    localStorage.setItem('token', jwt);

    userStore.authenticaded(user, jwt)

    if (user.role.name === 'admin') {
      router.push('/adm');
    } else {
      router.push('/timeline');
    }
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      exception.value = e.response?.data;
    } else {
      
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