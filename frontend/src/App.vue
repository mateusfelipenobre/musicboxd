<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from './stores/userStore';
import MenuNav from './components/MenuNav.vue';  
import RodaPe from './components/RodaPe.vue';    

const logo_src = "/img/logo.png";
const app_name = "MusicBoxd";
const userStore = useUserStore()
</script>

<template>
  <div>
    <MenuNav />
    <router-view/>
    <RodaPe />
  </div>
</template>