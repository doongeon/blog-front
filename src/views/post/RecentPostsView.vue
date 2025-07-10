<template>
  <div class="mt-10 max-w-sm mx-auto">
    <router-link v-if="authStore.isLogin" :to="{ name: 'post/create' }" class=""
      ><i class="fa-solid fa-pen text-sm text-green-600"></i>
      <span class="font-medium text-green-600"> 글쓰기</span></router-link
    >
  </div>
  <template v-for="post in posts" :key="post.postId">
    <div class="max-w-sm mx-auto mt-7">
      <div class="mx-3 flex flex-row justify-between">
        <div class="flex flex-col">
          <span class="font-bold">{{ post.title }}</span>
          <span class="text-xs text-gray-400">{{
            new Date(post.regDate).toLocaleDateString()
          }}</span>
        </div>
        <button
          v-if="authStore.isLogin"
          class="cursor-pointer"
          @click="handleDelete(post.postId)"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div
        class="max-w-sm rounded-2xl overflow-hidden mt-3 border border-gray-200"
      >
        <img
          :src="`http://localhost:8080/resources/thumbnail/${post.thumbnail.storedFileName}`"
        />
      </div>
      <div class="mt-3">
        <span class="font-bold text-sm">views: </span>
        <span class="text-sm">{{ post.viewsCount }}</span>
      </div>
      <div class="mt-3">
        <p>{{ post.content }}</p>
      </div>
      <div class="bg-gray-300 h-px mt-5" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { getPosts, deletePost, type Post } from '@/api/post';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();

const posts = ref<Post[]>([]);

const load = async () => {
  posts.value = await getPosts();
};

const handleDelete = async (postId: number) => {
  try {
    if (!confirm('삭제하시겠습니까?')) return;
    await deletePost(postId);
    load();
  } catch {}
};

load();
</script>
