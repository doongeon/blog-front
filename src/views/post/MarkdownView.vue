<template>
  <div class="mt-3">
    <div class="prose" v-html="displayedContent"></div>
    <router-link
      :to="{ name: 'post/detail', params: { id: postId } }"
      class="font-bold mt-3"
    >
      글 보기
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { marked } from 'marked';

const props = defineProps<{
  content: string; // 게시물 내용만 prop으로 받음
  postId: number;
}>();

const isContentMoreThanFiveLines = computed(() => {
  if (!props.content) return false;
  return props.content.split('\n').length > 5;
});

const displayedContent = computed(() => {
  if (!props.content) return '';

  const lines = props.content.split('\n');
  if (isContentMoreThanFiveLines.value) {
    const limitedContent = lines.slice(0, 5).join('\n');
    return marked(limitedContent);
  } else {
    return marked(props.content);
  }
});
</script>
