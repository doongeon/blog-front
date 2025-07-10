<template>
  <template v-for="troubleItem in troubleList" :key="troubleItem.id">
    <div class="max-w-l2g relative mt-10">
      <div
        class="absolute left-0 top-0 bg-orange-700 size-10 flex items-center justify-center text-xl text-orange-50 rounded-md"
      >
        <i :class="`${troubleItem.icon}`"></i>
      </div>
      <div class="pl-20">
        <span class="font-bold text-lg">{{ troubleItem.title }}</span>
        <p class="mt-2 text-gray-500">
          {{ troubleItem.detail }}
        </p>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

export interface TroubleListItem {
  id: number;
  icon: string;
  title: string;
  detail: string;
}

const { troubleList } = defineProps<{ troubleList: TroubleListItem[] }>();
</script>
