<template>
  <nav id="nav" class="flex bg-green-800 py-5 px-5 text-green-50 text-base">
    <button @click="shootConfetti">
      <i class="fa-solid fa-palette text-lg"></i>
    </button>
    <div class="flex gap-5 mx-auto">
      <RouterLink :to="{ name: 'home' }">홈</RouterLink>
      <RouterLink :to="{ name: 'recentpost' }">최신글</RouterLink>
      <RouterLink :to="{ name: 'post' }">게시글</RouterLink>
    </div>
    <div v-if="authStore.isLogin">
      <button @click="handleLogout">로그아웃</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import confetti from 'canvas-confetti';
import { RouterLink } from 'vue-router';

const shootConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
  });
};

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  alert('로그아웃 되었습니다.');
};
</script>
