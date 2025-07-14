<template>
  <div class="mt-3">
    <div class="prose" v-html="displayedContent"></div>
    <button
      v-if="isContentMoreThanFiveLines && !viewAll"
      @click="handleViewAll"
      class="font-bold mt-3"
    >
      ...더보기
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import { marked } from 'marked';

const viewAll = ref(false);
const props = defineProps<{
  content: string; // 게시물 내용만 prop으로 받음
  postId: number;
}>();

const handleViewAll = () => (viewAll.value = !viewAll.value);

const isContentMoreThanFiveLines = computed(() => {
  if (!props.content) return false;
  return props.content.split('\n').length > 5;
});

const displayedContent = computed(() => {
  if (!props.content) return '';

  const lines = props.content.split('\n');
  if (isContentMoreThanFiveLines.value && !viewAll.value) {
    const limitedContent = lines.slice(0, 5).join('\n');
    return marked(limitedContent);
  } else {
    return marked(props.content);
  }
});
</script>
