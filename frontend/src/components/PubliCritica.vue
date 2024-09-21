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