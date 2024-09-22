<template>
  <div>
    <div v-for="review in critiques" :key="review.id" class="review-item">
      <h2 class="album-name">{{ review.albumName }}</h2>
      <p class="artist">Artista: <strong>{{ review.artist }}</strong></p>
      <p class="year">Ano: <strong>{{ review.year }}</strong></p>
      <p class="rating">Avaliação: <span class="rating-stars">{{ review.rating }}</span></p>
      <p class="review-text">Review: {{ review.review }}</p>
      <button class="delete-button" @click="deleteReview(review.id)">Deletar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps<{ critiques: any[] }>();
const emit = defineEmits<{ (e: 'reviewDeleted', id: number): void }>();

async function deleteReview(id: number) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = { Authorization: `Bearer ${token}` };

    // Faz a requisição para deletar a crítica
    await axios.delete(`http://localhost:3000/reviews/${id}`, { headers });

    // Emitir evento para o componente pai
    emit('reviewDeleted', id);
  } catch (error) {
    console.error('Erro ao deletar a crítica:', error);
  }
}
</script>

<style scoped>
.review-item {
  color: white;
  padding: 15px;
  margin: 15px 0;
  border-radius: 0; /* Remove bordas arredondadas */
  box-shadow: none; /* Remove sombra */
}

.album-name {
  font-size: 1.5em;
  margin: 0;
}

.artist,
.year,
.review-text,
.rating {
  margin: 5px 0;
}

.rating-stars {
  font-size: 1.2em;
  color: #f1c40f; /* Cor para as estrelas */
}

.delete-button {
  background-color: #eb7f19;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 0; /* Mantém o botão quadrado */
  width: 20%; /* O botão ocupa toda a largura */
  
}

.delete-button:hover {
  background-color: #d47017;
  transform: scale(1.05); /* Efeito de aumento ao passar o mouse */
}
</style>
