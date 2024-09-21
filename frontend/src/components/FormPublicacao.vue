<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit" class="album-form">
      <div class="form-group">
        <label for="albumName">Nome do Álbum</label>
        <input type="text" id="albumName" v-model="albumName" placeholder="Digite o nome do álbum" required />
      </div>
      <div class="form-group">
        <label for="artist">Artista</label>
        <input type="text" id="artist" v-model="artist" placeholder="Digite o nome do artista" required />
      </div>
      <div class="form-group">
        <label for="year">Ano</label>
        <input type="text" id="year" v-model="year" placeholder="Digite o ano" required />
      </div>
      <div class="form-group">
        <label for="rating">Avaliação</label>
        <select v-model="rating" required>
          <option value="★">★</option>
          <option value="★★">★★</option>
          <option value="★★★">★★★</option>
          <option value="★★★★">★★★★</option>
          <option value="★★★★★">★★★★★</option>
        </select>
      </div>
      <div class="form-group">
        <label for="review">Review</label>
        <textarea id="review" v-model="review" placeholder="Digite sua review" rows="6" required></textarea>
      </div>
      <button type="submit" class="submit-button" :disabled="loading">Publicar</button>
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import axios from 'axios';

const albumName = ref('');
const artist = ref('');
const year = ref('');
const review = ref('');
const rating = ref(''); // Nova variável para a avaliação
const loading = ref(false);
const error = ref<string | null>(null);
const emit = defineEmits<{ (e: 'newReview', newReview: any): void }>();

async function handleSubmit() {
  loading.value = true;
  error.value = null;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.post(
      'http://localhost:3000/reviews',
      {
        albumName: albumName.value,
        artist: artist.value,
        year: year.value,
        review: review.value,
        rating: rating.value, // Inclui o valor da avaliação
      },
      { headers }
    );

    // Emitir o evento com os dados da nova crítica
    emit('newReview', response.data.data);

    // Limpar os campos
    albumName.value = '';
    artist.value = '';
    year.value = '';
    review.value = '';
    rating.value = ''; // Limpa a avaliação
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message || 'Erro ao enviar a crítica';
    } else {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
}
</script>