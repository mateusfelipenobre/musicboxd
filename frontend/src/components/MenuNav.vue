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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap');

#nav {
  background-color: black;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
}

#nav a {
  color: white;
  text-decoration: none;
  margin: 12px;
  transition: .5s;
}

#nav a:hover {
  color: #eb7f19;
}

#logo {
  font-family: 'League Spartan', sans-serif;
  color: white;
  font-size: 36px;
  font-weight: 700;
  margin-right: auto; /* Pushes the links to the right */
}

.logout-button {
  background-color: black;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-left: 15px;
  transition: background-color 0.3s;
}

.logout-button:hover {
  color: #d47017;
}

span {
  color: white;
  margin-right: 15px;
}
</style>
