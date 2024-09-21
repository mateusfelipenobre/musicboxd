<template>
  <div id="nav">
    <router-link to="/" id="logo-url"> 
      <div id="logo">MusicBoxd</div>
    </router-link>
    
    <div v-if="isAuthenticated">
      <span>Bem-vindo, {{ username }}</span>
      <button @click="handleLogout" class="logout-button">Logout</button>
    </div>
    <router-link v-else to="/login">Login</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

// Store e Router
const userStore = useUserStore();
const router = useRouter();


const isAuthenticated = computed(() => userStore.isAuthenticated);
const username = computed(() => userStore.username);


function handleLogout() {
  userStore.logout();
  router.push('/login');
}
</script>