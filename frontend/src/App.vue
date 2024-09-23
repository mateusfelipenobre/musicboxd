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

 <style>
  *{
    background-color: black; 
    font-family: Montserrat;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  h1 {
    color: white;
    text-align: center;
    font-size: 40px;
    margin-bottom: 30px;
  }
  h2 {
  color: white;
}
</style>