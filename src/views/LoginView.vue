<template>
  <div>
    <div class="max-w-md mx-auto mt-20 shadow-lg rounded-lg">
      <form class="px-10 py-5" @submit.prevent="login">
        <div class="text-center font-bold text-2xl py-7">로그인</div>
        <hr class="text-gray-300" />
        <div class="mt-5 px-1">
          <div>
            <label class="" for="id">아이디</label>
          </div>
          <div>
            <input
              class="mt-3 py-px px-1 w-full border border-gray-300 rounded-md disabled:bg-gray-300"
              type="text"
              name="id"
              id="id"
              v-model="member.username"
              placeholder="ID"
            />
          </div>
        </div>
        <div class="mt-5">
          <div>
            <label for="password">패스워드</label>
          </div>
          <div>
            <input
              class="mt-3 py-px px-1 w-full border border-gray-300 rounded-md disabled:bg-gray-300"
              type="password"
              name="password"
              id="password"
              v-model="member.password"
              placeholder="PW"
            />
          </div>
        </div>
        <hr class="text-gray-300 mt-5" />
        <button type="submit" class="mx-auto" :disabled="disableSubmit">
          로그인
        </button>
        <div>
          <span>{{ error }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const member = reactive({
  username: '',
  password: '',
});

const error = ref('');

const disableSubmit = computed(() => !(member.username && member.password));

const login = async () => {
  try {
    await auth.login(member);
    if (route.query.next) {
      // 로그인 후 이동할 페이지가 있는 경우
      router.push({ name: route.query.next });
    } else {
      // 일반 로그인
      router.push('/');
    }
  } catch {
    error.value = '올바르지 않은 정보입니다.';
  }
};
</script>
