<template>
  <div v-if="post" class="max-w-4xl mx-auto mt-10">
    <div class="pb-5 ml-5">
      <router-link :to="{ name: 'post' }"
        ><i class="fa-solid fa-arrow-left text-gray-500"></i
        ><span class="font-medium text-gray-500"> 뒤로</span></router-link
      >
    </div>

    <div class="flex flex-col ml-5">
      <span class="font-bold">{{ post.title }}</span>
      <span class="text-xs text-gray-400">{{
        new Date(post.regDate).toLocaleDateString()
      }}</span>
    </div>
    <div
      class="max-w-lg rounded-2xl overflow-hidden border border-gray-200 mx-auto mt-5"
    >
      <img
        :src="`http://localhost:8080/resources/thumbnail/${post.thumbnail.storedFileName}`"
      />
    </div>
    <div class="mt-3">
      <span class="font-bold text-sm">views: </span>
      <span class="text-sm">{{ post.viewsCount }}</span>
    </div>
    <div class="mt-5">
      <p>
        {{ post.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPost, type Post } from '@/api/post';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const post = ref<Post>();

const load = async () => {
  const postId = Number(route.params.id);
  post.value = await getPost(postId);
};

load();
</script>
