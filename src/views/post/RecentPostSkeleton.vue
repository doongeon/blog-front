<template>
  <div v-for="n in 3" :key="n" class="max-w-xl mx-auto mt-7 p-5 animate-pulse">
    <div class="mx-3 flex flex-row justify-between">
      <div class="flex flex-col gap-1">
        <div class="h-4 w-3/4 bg-gray-300 rounded"></div>
        <div class="h-3 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>

    <div
      class="w-full rounded-2xl shadow-lg overflow-hidden mt-3 border border-gray-200"
    >
      <div class="w-full h-[500px] bg-gray-200"></div>
    </div>

    <div class="mt-3 space-y-2">
      <div class="h-3 w-1/4 bg-gray-300 rounded"></div>
      <div class="space-y-1">
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-11/12"></div>
        <div class="h-4 bg-gray-200 rounded w-10/12"></div>
      </div>
    </div>

    <div v-if="n < 3" class="bg-gray-300 h-px mt-5" />
  </div>
</template>
