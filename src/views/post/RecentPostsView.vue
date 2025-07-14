<template>
  <div class="mt-10 max-w-xl mx-auto flex justify-center text-orange-600">
    <router-link v-if="authStore.isLogin" :to="{ name: 'post/create' }"
      ><i class="fa-solid fa-pen text-sm"></i>
      <span class="font-medium"> 글쓰기</span></router-link
    >
  </div>

  <RecentPostSkeleton v-if="isLoading" />
  <div v-else>
    <div
      v-for="(post, index) in posts"
      :key="post.postId"
      class="max-w-lg min-h-[700px] mx-auto mt-7 p-5"
    >
      <div class="my-auto">
        <div class="mx-3 flex flex-row justify-between">
          <div class="flex flex-col">
            <span class="font-bold">{{ post.title }}</span>
            <span class="text-xs text-gray-400">{{
              new Date(post.regDate).toLocaleDateString()
            }}</span>
          </div>
          <div>
            <router-link
              :to="{ name: 'post/update', params: { id: post.postId } }"
              v-if="authStore.isLogin"
              class="cursor-pointer mr-5 opacity-50"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </router-link>
            <button
              v-if="authStore.isLogin"
              class="cursor-pointer opacity-50"
              @click="handleDelete(post.postId)"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div
          class="w-full rounded-2xl shadow-lg overflow-hidden mt-3 border border-gray-200"
        >
          <img
            :src="`http://localhost:8080/resources/thumbnail/${post.thumbnail.storedFileName}`"
            loading="lazy"
          />
        </div>
        <div class="mt-3">
          <div>
            <span class="font-bold text-sm">views: </span>
            <span class="text-sm">{{ post.viewsCount }}</span>
          </div>
        </div>
        <MarkdownView :content="post.content" :post-id="post.postId" />
      </div>
      <CommentsView class="mt-10" :post-id="post.postId" />
      <div v-if="index < posts.length - 1" class="bg-gray-300 h-px mt-5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPosts, deletePost, type Post } from '@/api/post';
import CommentsView from '@/components/CommentsView.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import MarkdownView from './MarkdownView.vue';
import RecentPostSkeleton from './RecentPostSkeleton.vue';

const authStore = useAuthStore();
const posts = ref<Post[]>([]);
const isLoading = ref(true);

const handleDelete = async (postId: number) => {
  try {
    if (!confirm('삭제하시겠습니까?')) return;
    await deletePost(postId);
    load();
  } catch {}
};

const load = async () => {
  isLoading.value = true;
  const start = Date.now();
  posts.value = await getPosts();
  const elapsed = Date.now() - start;
  const remain = 500 - elapsed;

  setTimeout(
    () => {
      isLoading.value = false;
    },
    remain > 0 ? remain : 0
  );
};

onMounted(load);
</script>
