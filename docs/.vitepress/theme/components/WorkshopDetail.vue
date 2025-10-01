<script setup lang="ts">
import { useRoute } from 'vitepress';
import { workshops } from '../../data/workshops';
import { computed } from 'vue';
import { marked } from 'marked'; 

const route = useRoute();
const workshop = workshops.find(w => w.link === route.path.replace(/\.html$/, ''));

const summaryHtml = computed(() => {
    if (workshop?.details.summary) {
        return marked.parse(workshop.details.summary);
    }
    return '';
});
</script>

<template>
  <div v-if="workshop" class="workshop-detail">
    <h1>{{ workshop.details.name }}</h1>
    <div class="summary" v-html="summaryHtml"></div> 

    <div v-if="workshop.details.links && workshop.details.links.length" class="links-section">
      <h2>Užitečné odkazy</h2>
      <div class="links-grid">
        <a v-for="link in workshop.details.links" :key="link.title" :href="link.url" target="_blank" rel="noopener noreferrer" class="link-card">
          {{ link.title }}
        </a>
      </div>
    </div>

    <div v-if="workshop.details.youtube" class="youtube-section">
      <h2>Záznam z workshopu</h2>
      <div class="video-container">
        <iframe
          :src="workshop.details.youtube"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Workshop nebyl nalezen.</p>
  </div>
</template>

<style scoped>
.workshop-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.summary {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.links-section, .youtube-section {
  margin-top: 3rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.link-card {
  display: block;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  text-align: center;
  transition: border-color 0.25s, background-color 0.25s;
}

.link-card:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
  border-radius: 8px;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
