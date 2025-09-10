<template>
  <img :src="imageSrc" :alt="alt" style="display: inline; vertical-align: middle;" />
</template>

<script setup>
import { useSlots, computed } from 'vue';

// Define props, including an optional 'alt' text
defineProps({
  alt: {
    type: String,
    default: ''
  }
});

const slots = useSlots();

// Compute the image source from the content inside the <Inline> tags
const imageSrc = computed(() => {
  // Access the default slot content
  const slotContent = slots.default?.()?.[0]?.children;
  // Return the text content, trimming any whitespace
  return typeof slotContent === 'string' ? slotContent.trim() : '';
});
</script>
