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