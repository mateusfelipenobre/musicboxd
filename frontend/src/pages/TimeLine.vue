<template> 
  <div class="timeline-container">
    <div class="publi-container">
      <PubliCritica :critiques="critiques" @reviewDeleted="handleReviewDeleted" @editReview="handleEditReview" />
    </div>
    <div class="form-container">
      <FormPublicacao :selectedReview="selectedReview" @newReview="handleNewReview" @updatedReview="handleUpdatedReview" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormPublicacao from '../components/FormPublicacao.vue';
import PubliCritica from '../components/PubliCritica.vue';
import axios from 'axios';

const critiques = ref<any[]>([]);
const selectedReview = ref<any | null>(null);

// Configuração do Axios para incluir o token JWT
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

async function fetchCritiques() {
  try {
    const response = await axios.get('http://localhost:3000/reviews');
    critiques.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar críticas:', error.response?.data || error);
  }
}

function handleNewReview(newReview: any) {
  critiques.value.push(newReview);
}

function handleUpdatedReview(updatedReview: any) {
  const index = critiques.value.findIndex((review: any) => review.id === updatedReview.id);
  if (index !== -1) {
    critiques.value[index] = updatedReview;
  }
  selectedReview.value = null;
}

function handleReviewDeleted(id: number) {
  critiques.value = critiques.value.filter((review: any) => review.id !== id);
}

function handleEditReview(review: any) {
  selectedReview.value = review;
}

onMounted(() => {
  fetchCritiques();
});
</script>

<style scoped>
.timeline-container {
  display: flex;
  gap: 20px;
  padding: 5px 10px;
}

.form-container {
  flex: 1; 
  max-width: 600px; 
}

.publi-container {
  flex: 2; 
  max-width: 600px; 
  padding: 20px; 
}
</style>