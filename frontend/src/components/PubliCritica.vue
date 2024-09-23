<template>
  <div>
    <div v-for="review in critiques" :key="review.id" class="review-item">
      <h2 class="album-name">{{ review.albumName }}</h2>
      <p class="artist">Artista: <strong>{{ review.artist }}</strong></p>
      <p class="year">Ano: <strong>{{ review.year }}</strong></p>
      <p class="rating">Avaliação: <span class="rating-stars">{{ review.rating }}</span></p>
      <p class="review-text">Review: {{ review.review }}</p>
      
      <div class="buttons">
        <button class="edit-button" @click="editReview(review)">Editar</button>
        <button class="delete-button" @click="deleteReview(review.id)">Deletar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps<{ critiques: any[] }>();
const emit = defineEmits<{ (e: 'reviewDeleted', id: number): void, (e: 'editReview', review: any): void }>();

async function deleteReview(id: number) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = { Authorization: `Bearer ${token}` };

    await axios.delete(`http://localhost:3000/reviews/${id}`, { headers });

    emit('reviewDeleted', id);
  } catch (error) {
    console.error('Erro ao deletar a crítica:', error);
  }
}

function editReview(review: any) {
  emit('editReview', review);
}
</script>

<style scoped>
.review-item {
  color: white;
  padding: 15px;
  margin: 15px 0;
  border-radius: 0;
  box-shadow: none;
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
  color: #f1c40f;
}

.buttons {
  display: flex;
  gap: 10px;
}

.edit-button, .delete-button {
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0;
  width: 20%;
  text-align: center;
}

.edit-button {
  background-color: #3498db; /* Cor para o botão de editar */
}

.edit-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.delete-button {
  background-color: #eb7f19;
}

.delete-button:hover {
  background-color: #d47017;
  transform: scale(1.05);
}
</style>
