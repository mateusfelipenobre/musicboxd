<template>
  <div class="timeline-container">
    <div class="publi-container">
      <PubliCritica :critiques="critiques" @reviewDeleted="handleReviewDeleted" />
    </div>
    <div class="form-container">
      <FormPublicacao @newReview="handleNewReview" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormPublicacao from '../components/FormPublicacao.vue';
import PubliCritica from '../components/PubliCritica.vue';
import axios from 'axios';

const critiques = ref<any[]>([]);

async function fetchCritiques() {
  try {
    const response = await axios.get('http://localhost:3000/reviews');
    critiques.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar críticas:', error);
  }
}

function handleNewReview(newReview: any) {
  critiques.value.push(newReview);
}

function handleReviewDeleted(id: number) {
  critiques.value = critiques.value.filter((review: any) => review.id !== id);
}

onMounted(() => {
  fetchCritiques();
});
</script>
