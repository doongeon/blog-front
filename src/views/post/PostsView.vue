<template>
  <div class="mt-10 max-w-xl mx-auto flex justify-center text-orange-600">
    <router-link v-if="authStore.isLogin" :to="{ name: 'post/create' }"
      ><i class="fa-solid fa-pen text-sm"></i>
      <span class="font-medium"> 글쓰기</span></router-link
    >
  </div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto mt-10 transition"
  >
    <router-link
      v-for="post in posts"
      :key="post.postId"
      class="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      :to="{ name: 'post/detail', params: { id: post.postId } }"
    >
      <div
        v-if="post.thumbnail && post.thumbnail.storedFileName"
        class="w-full aspect-video overflow-hidden"
      >
        <img
          :src="`http://localhost:8080/resources/thumbnail/${post.thumbnail.storedFileName}`"
          :alt="post.title + ' 썸네일'"
          class="w-full"
        />
      </div>
      <div
        v-else
        class="aspect-video w-full bg-gray-200 flex items-center justify-center text-gray-500"
      >
        <span class="text-sm">No Image</span>
      </div>

      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {{ post.title }}
        </h3>
        <div class="text-sm text-gray-600 flex-grow">
          <p>
            조회수 {{ post.viewsCount.toLocaleString() }}회 •
            {{ new Date(post.regDate).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </router-link>

    <div
      v-if="posts.length === 0"
      class="col-span-full text-center text-gray-500 p-8"
    >
      게시물이 없습니다.
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPosts, type Post } from '@/api/post';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const posts = ref<Post[]>([]);
const authStore = useAuthStore();

const load = async () => {
  posts.value = await getPosts();
};

load();
</script>
