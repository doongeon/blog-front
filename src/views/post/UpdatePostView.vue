<template>
  <div class="pt-8 w-full">
    <h2 class="w-max mx-auto font-bold">포스트 수정</h2>
  </div>
  <div class="mx-auto px-5 py-10">
    <form @submit.prevent="onSubmit" class="max-w-3xl mx-auto">
      <div class="form-group">
        <input
          type="text"
          id="title"
          v-model="form.title"
          required
          class="h-10 px-3 font-bold focus:outline-none border-b"
          placeholder="Title"
        />
      </div>
      <div class="form-group mt-5">
        <div
          :class="`max-w-lg overflow-hidden rounded-2xl bg-white shadow-lg flex items-center justify-center text-gray-500 relative mx-auto ${thumbnailUrl ? `` : 'aspect-square'}`"
        >
          <p v-if="thumbnailUrl" class="">
            <img :src="thumbnailUrl" alt="썸네일 미리보기" />
          </p>
          <label
            v-else
            for="thumbnail"
            class="w-full h-full relative cursor-pointer flex items-center justify-center"
          >
            <i class="fa-solid fa-plus fa-2xl"></i>
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
            class="absolute right-5 top-5 z-50 cursor-pointer"
          >
            <i class="fa-solid fa-xmark fa-xl"></i>
          </button>
        </div>
      </div>

      <div class="form-group w-full mt-10">
        <div class="prose" v-html="output"></div>
        <div class="editor">
          <textarea
            class="w-full h-52 py-1 px-2 focus:outline-none border-t mt-5 pt-5 resize-none"
            :value="form.content"
            @input="updateContent"
          ></textarea>
        </div>
      </div>

      <div class="flex flex-row justify-end mt-5">
        <button
          type="submit"
          class="text-green-600 py-1 px-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="disableSubmit"
        >
          포스트 수정
        </button>
        <button
          type="button"
          class="text-green-600 py-1 px-2 cursor-pointer ml-1"
          @click="handleReset"
        >
          되돌리기
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
import { computed, reactive, ref } from 'vue';
import { marked } from 'marked';
import debounce from 'lodash.debounce';
import { getPost, updatePost, type Post } from '@/api/post';
import { useRoute, useRouter } from 'vue-router';
import { getThumbnailUrl } from '@/utils';

const router = useRouter();
const route = useRoute();
const postId = computed(() => Number(route.params.id));
const originalPost = ref<Post | null>(null);
const thumbnailUrl = ref('');
const form = reactive<{
  postId: number;
  title: string;
  img: File | null;
  content: string;
}>({
  postId: 0,
  title: '',
  content: '## 여기서 수정해요',
  img: null,
});
const disableSubmit = computed(
  () => !form.postId || !form.title || !thumbnailUrl.value || !form.content
);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    form.img = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      thumbnailUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    form.img = null;
    thumbnailUrl.value = '';
  }
};

const handleReset = () => {
  form.title = originalPost.value?.title || '';
  thumbnailUrl.value = getThumbnailUrl(
    originalPost.value?.thumbnail.storedFileName || ''
  );
  form.content = originalPost.value?.content || '';
};

const onSubmit = async () => {
  try {
    await updatePost(form);
    router.push({ name: 'post/detail', params: { id: postId.value } });
  } catch (e) {
    alert('권한이 없습니다.');
    console.log('  ⚠️  : ', e);
  }
};

const deleteFile = () => {
  form.img = null;
  thumbnailUrl.value = '';
};

// computed 옵션의 'output'을 computed 속성으로 대체
const output = computed(() => {
  return marked(form.content);
});

// methods 옵션의 'update'를 함수로 정의하고 debounce 적용
const updateContent = debounce((e: Event) => {
  const target = e.target as HTMLTextAreaElement; // 타입 단언
  form.content = target.value;
}, 100);

const load = async () => {
  originalPost.value = await getPost(Number(postId.value));
  form.postId = originalPost.value.postId;
  form.title = originalPost.value.title;
  form.content = originalPost.value.content;
  thumbnailUrl.value = getThumbnailUrl(
    originalPost.value.thumbnail.storedFileName
  );
};

load();
</script>
