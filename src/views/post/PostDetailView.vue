<template>
  <div v-if="post" class="max-w-3xl mx-auto mt-10 px-5">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col ml-5">
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
      class="max-w-lg rounded-2xl overflow-hidden border border-gray-200 mx-auto mt-5"
    >
      <img
        :src="`http://localhost:8080/resources/thumbnail/${post.thumbnail.storedFileName}`"
      />
    </div>
    <div class="mt-3">
      <span class="font-bold text-sm">views: </span>
      <span class="text-sm">{{ post.viewsCount }}</span>
      <div class="w-full mt-5 prose" v-html="marked(post.content)"></div>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="border-t border-t-gray-400 mt-10 pt-10 flex flex-row justify-between px-5"
    >
      <div class="">
        <div class="mt-5 flex flex-row gap-5">
          <label for="writer">이름</label>
          <input
            class="border-b border-gray-500 focus:outline-none px-1"
            type="text"
            id="writer"
            v-model="comment.writer"
          />
          <label for="password">비밀번호</label>
          <input
            class="border-b border-gray-500 focus:outline-none px-1"
            type="text"
            id="password"
            placeholder="댓글을 지울때 사용됩니다"
            v-model="comment.password"
          />
        </div>
        <div class="mt-5 flex flex-row items-center">
          <label for="content" class="mr-5">댓글</label>
          <textarea
            class="min-w-xs max-w-md border-b border-gray-500 resize-none focus:outline-none px-1"
            type="text"
            id="content"
            v-model="comment.content"
          ></textarea>
        </div>
      </div>
      <button type="submit" class="cursor-pointer">올리기</button>
    </form>

    <div class="mt-10">
      <CommentsView :post-id="postId" ref="commentsViewRef">
        <p class="text-gray-500 text-center py-8 mt-10">
          아직 댓글이 없습니다. 첫 댓글을 남겨주세요!
        </p>
      </CommentsView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createComment, type Comment } from '@/api/comment';
import { deletePost, getPost, type Post } from '@/api/post';
import CommentsView from '@/components/CommentsView.vue';
import { useAuthStore } from '@/stores/auth';
import { marked } from 'marked';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const postId = computed(() => Number(route.params.id));
const post = ref<Post>();
const authStore = useAuthStore();
const comment = reactive<Comment>({
  postId: postId.value,
  writer: '',
  content: '',
  password: '',
});
const router = useRouter();
const commentsViewRef = ref<InstanceType<typeof CommentsView> | null>(null);

const load = async () => {
  post.value = await getPost(postId.value);
};

const handleSubmit = async () => {
  if (!comment.writer.trim() || !comment.content.trim()) {
    alert('작성자 또는 내용이 비어 있습니다.');
    return;
  }

  await createComment(comment);
  comment.writer = '';
  comment.content = '';
  comment.password = '';
  if (commentsViewRef.value) {
    await commentsViewRef.value.load();
  }
};

const handleDelete = async (postId: number) => {
  try {
    if (!confirm('삭제하시겠습니까?')) return;
    await deletePost(postId);
    router.push({ name: 'post' });
  } catch {}
};

load();
</script>
