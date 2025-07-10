<template>
  <div class="pt-8 w-full">
    <h2 class="w-max mx-auto font-bold">새 포스트 작성</h2>
  </div>
  <div class="px-5 py-10">
    <form @submit.prevent="onSubmit" class="max-w-xl mx-auto">
      <div class="form-group">
        <input
          type="text"
          id="title"
          v-model="post.title"
          required
          class="h-10 px-3 font-bold focus:outline-none border-b"
          placeholder="Title"
        />
      </div>
      <div class="form-group mt-5">
        <div
          :class="`max-w- overflow-hidden bg-white shadow-lg flex items-center justify-center text-gray-500 relative mx-auto ${thumbnailUrl ? `` : 'aspect-square'}`"
        >
          <p v-if="thumbnailUrl" class="max-w-md">
            <img :src="thumbnailUrl" alt="썸네일 미리보기" />
          </p>
          <label
            v-else
            for="thumbnail"
            class="w-full h-full relative cursor-pointer flex items-center justify-center"
          >
            <i class="fa-solid fa-plus scale-125"></i>
          </label>
          <input
            type="file"
            id="thumbnail"
            @change="handleFileChange"
            accept="image/*"
            hidden
          />
          <button
            v-if="thumbnailUrl"
            @click="deleteFile"
            class="absolute right-2 top-2 z-50 cursor-pointer"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <div class="form-group w-full mt-10">
        <textarea
          class="w-full h-36 py-1 px-2 focus:outline-none border-b resize-none"
          v-model="post.content"
          placeholder="내용"
        ></textarea>
      </div>

      <div class="flex flex-row justify-end mt-5">
        <button
          type="submit"
          class="text-green-600 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="disableSubmit"
        >
          포스트 생성
        </button>
        <router-link
          :to="{ name: 'post' }"
          type="submit"
          class="py-1 px-2 rounded-xl bg-orange-00 text-green-600 cursor-pointer ml-1"
        >
          목록
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { createPost } from '@/api/post';
import router from '@/router';

const post = reactive<{
  title: string;
  img: File | null;
  content: string;
}>({
  title: '',
  content: '',
  img: null,
});

const thumbnailUrl = ref('');
const disableSubmit = computed(() => !post.title || !post.img || !post.content);

// 파일 입력 변경을 처리하는 함수
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    post.img = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      thumbnailUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    post.img = null;
    thumbnailUrl.value = '';
  }
};

watch(post, () => {
  console.log('  ⚠️  : ', post);
});

const deleteFile = () => {
  post.img = null;
  thumbnailUrl.value = '';
};

const onSubmit = async () => {
  try {
    await createPost(post);
    router.push({ name: 'post' });
  } catch (e) {
    console.log('  ⚠️  : ', e);
  }
};
</script>
