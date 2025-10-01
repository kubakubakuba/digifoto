<script setup lang="ts">
import { workshops } from '../../data/workshops';
import { computed } from 'vue';
import { useData } from 'vitepress';

const { site } = useData();

const upcomingWorkshops = computed(() => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set to start of today for comparison
  return workshops
    .filter(w => new Date(w.sortDate) >= now)
    .sort((a, b) => new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime());
});

const closestWorkshop = computed(() => {
  return upcomingWorkshops.value.length > 0 ? upcomingWorkshops.value[0] : null;
});
</script>

<template>
  <div class="workshops-list">
    <h2>Plánované a již proběhlé workshopy</h2>
    <div class="workshops-grid">
      <a 
        v-for="workshop in workshops" 
        :key="workshop.name" 
        :href="workshop.link" 
        class="workshop-card"
        :class="{ 'closest-workshop': closestWorkshop && workshop.name === closestWorkshop.name }"
      >
        <h3>{{ workshop.name }}</h3>
        <p class="date">{{ workshop.date }}</p>
        <p>{{ workshop.summary }}</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.workshops-list {
  margin-top: 2rem;
  text-align: center;
}

.workshops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.workshop-card {
  display: block;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: border-color 0.25s, background-color 0.25s;
  text-align: left;
}

.workshop-card:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
}

.workshop-card.closest-workshop {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 12px var(--vp-c-brand-light);
}

.workshop-card h3 {
  margin-top: 0;
  font-size: 1.25rem;
  color: var(--vp-c-brand);
}

.workshop-card .date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}
</style>
