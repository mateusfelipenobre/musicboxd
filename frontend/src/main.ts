import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'; // Importe o Pinia
import { router } from './router';

const app = createApp(App);

const pinia = createPinia(); // Crie uma instância do Pinia

app.use(pinia); // Use o Pinia no app
app.use(router); // Use o router

app.mount('#app');
