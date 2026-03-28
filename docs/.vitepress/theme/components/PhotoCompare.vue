<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface PhotoCompareItem {
  src: string
  label: string
  alt?: string
}

const props = withDefaults(
  defineProps<{
    items: PhotoCompareItem[]
    initialIndex?: number
  }>(),
  {
    initialIndex: 0,
  },
)

const activeIndex = ref(0)

const normalizeIndex = (index: number, length: number): number => {
  if (!length) return 0
  if (index < 0) return 0
  if (index >= length) return length - 1
  return index
}

watch(
  () => [props.items.length, props.initialIndex] as const,
  ([length, initialIndex]) => {
    activeIndex.value = normalizeIndex(initialIndex ?? 0, length)
  },
  { immediate: true },
)

const activeItem = computed(() => props.items[activeIndex.value])
</script>

<template>
  <div class="photo-compare" v-if="items.length">
    <img
      class="photo-compare__image"
      :src="activeItem.src"
      :alt="activeItem.alt ?? activeItem.label"
    />

    <div class="photo-compare__buttons" role="tablist" aria-label="Photo comparison selector">
      <button
        v-for="(item, index) in items"
        :key="`${item.src}-${index}`"
        type="button"
        class="photo-compare__button"
        :class="{ 'is-active': activeIndex === index }"
        :aria-pressed="activeIndex === index"
        @click="activeIndex = index"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.photo-compare {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  gap: 1rem;
  align-items: start;
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem;
}

.photo-compare__image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 0;
}

.photo-compare__buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: start;
  margin: 0;
}

.photo-compare__button {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-2);
  text-align: left;
  font: inherit;
  line-height: 1.3;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.photo-compare__button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.photo-compare__button.is-active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

@media (max-width: 760px) {
  .photo-compare {
    grid-template-columns: 1fr;
  }

  .photo-compare__buttons {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .photo-compare__button {
    width: auto;
  }
}
</style>
