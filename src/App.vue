<template>
  <NavView />
  <RouterView />
  <FooterView />
</template>

<script setup lang="ts">
import NavView from '@/components/NavView.vue';
import { RouterView } from 'vue-router';
import FooterView from './components/FooterView.vue';
</script>
