<template>
  <div class="mt-10 max-w-xl mx-auto flex justify-center text-orange-600">
    <router-link v-if="authStore.isLogin" :to="{ name: 'post/create' }"
      ><i class="fa-solid fa-pen text-sm"></i>
      <span class="font-medium"> 글쓰기</span></router-link
    >
  </div>
  <template v-for="(post, index) in posts" :key="post.postId">
    <div class="max-w-xl mx-auto mt-7 p-5">
      <div>
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
          class="w-full rounded-2xl overflow-hidden mt-3 border border-gray-200"
        >
          <img
            :src="`http://localhost:8080/resources/thumbnail/${post.thumbnail.storedFileName}`"
          />
        </div>
        <div class="mt-3">
          <span class="font-bold text-sm">views: </span>
          <span class="text-sm">{{ post.viewsCount }}</span>
        </div>
        <MarkdownView :content="post.content" :post-id="post.postId" />
      </div>
      <CommentsView :post-id="post.postId" />
      <div v-if="index < posts.length - 1" class="bg-gray-300 h-px mt-5" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { getPosts, deletePost, type Post } from '@/api/post';
import CommentsView from '@/components/CommentsView.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import MarkdownView from './MarkdownView.vue';

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
