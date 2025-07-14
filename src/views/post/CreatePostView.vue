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
          :class="`max-w-lg rounded overflow-hidden bg-white shadow-lg flex items-center justify-center text-gray-500 relative mx-auto ${thumbnailUrl ? `` : 'aspect-square'}`"
        >
          <p v-if="thumbnailUrl" class="max-w-lg">
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
        <div class="prose" v-html="output"></div>
        <div class="editor">
          <textarea
            class="w-full h-36 py-1 px-2 focus:outline-none border-t mt-5 pt-5 resize-none"
            :value="post.content"
            @input="update"
          ></textarea>
        </div>
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
import { marked } from 'marked';
import debounce from 'lodash.debounce';
import { createPost } from '@/api/post';
import { useRouter } from 'vue-router';

const post = reactive<{
  title: string;
  img: File | null;
  content: string;
}>({
  title: '',
  content: '## 여기서 수정해요',
  img: null,
});

const thumbnailUrl = ref('');
const disableSubmit = computed(() => !post.title || !post.img || !post.content);
const router = useRouter();

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

const onSubmit = async () => {
  try {
    await createPost(post);
    router.push({ name: 'post' });
  } catch (e) {
    alert('권한이 없습니다.');
    console.log('  ⚠️  : ', e);
  }
};

const deleteFile = () => {
  post.img = null;
  thumbnailUrl.value = '';
};

// computed 옵션의 'output'을 computed 속성으로 대체
const output = computed(() => {
  return marked(post.content);
});

// methods 옵션의 'update'를 함수로 정의하고 debounce 적용
const update = debounce((e: Event) => {
  const target = e.target as HTMLTextAreaElement; // 타입 단언
  post.content = target.value;
}, 100);
</script>
