<template>
  <div
    class="bg-orange-700 text-orange-100 flex flex-col items-center py-20 gap-10"
  >
    <p class="text-sm">개발자가 되가위한 여정 일기</p>
    <h1 class="text-5xl font-bold">동건 스튜디오</h1>
    <div class="flex flex-col items-center gap-5">
      <span
        >자바스크립트를 충분히 활용할 수 있는 개발자가 되기 위한 여정 일기</span
      >
      <span>실력이 점점 나아지고 있는걸까?</span>
      <span>javascript, java 등의 주제를 직접 손으로 바닥부터 공부하자</span>
    </div>
  </div>
  <div class="mx-10 max-w-2xl mt-12 lg:text-center md:mx-auto">
    <p class="text-orange-700 font-bold text-sm">동건 스튜디오</p>
    <p class="text-4xl font-bold mt-3">"되는데, 이게 왜 되는 걸까요?"</p>
    <p class="mt-5">
      우리는 늘 수많은 다양한 라이브러리와 프레임워크를 사용해 웹 개발을 해요.
      그런데 정확히 뭐가 어떻게 돌아가는지 이해 안 될 때가 많아요. 자바스크립트
      생태계는 너무 다양한 요소로 복잡하게 얽혀 있고, 어떻게 실타래를 풀지
      모르겠거든요. 주니어에서 미드 레벨로, 미드 레벨에서 시니어로 레벨 업 하기
      위한 발판을 마련해요.
    </p>
  </div>
  <div class="max-w-2xl mx-10 md:mx-auto">
    <div class="w-fit mx-auto my-24 rounded-md overflow-hidden shadow-lg">
      <img src="/js_meme.jpg" alt="js 밈" />
    </div>
  </div>
  <div class="max-w-2xl mx-10 md:mx-auto mt-12">
    <TroubleList :trouble-list="troubleList" />
  </div>
  <div class="max-w-2xl mx-10 md:mx-auto mt-15 text-gray-600">
    <p class="font-bold text-black text-2xl">안녕하세요, 나동건입니다.</p>
    <p class="mt-5">현재 멀티켐퍼스에서 풀스택 개발자 교육받고 있습니다.</p>
    <p class="mt-5">주로 프론트엔드 개발 프로젝트를 해왔어요.</p>
    <p class="mt-5">
      대학에서 통계학을 공부하다 컴퓨터 프로그래밍에 입문하게 되어 스스로
      공부하기 시작했어요, ES6, React, Node, ... 정말 끝이 없었어요. 현재 KB
      IT's your life 과정을 통해 Java, Spring legacy를 공부할 수 있는 좋은
      기회를 얻었어요. 직접 부딪히고 주변 사람들에게 물어보기도 하며 전체적인
      그림을 그려나갔어요. 한참 시간이 지나고, 이런 내용들이 잘 정리된 컨텐츠가
      있었으면 얼마나 좋았을까 하는 생각을 하게 되었고, 스스로 정리하게
      되었어요.
    </p>
    <div class="mt-10 max-w-fit rounded-full overflow-hidden mx-auto">
      <img class="max-w-md" src="/profile.jpeg" alt="프로필 사진" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TroubleList, {
  type TroubleListItem,
} from '@/components/home/TroubleList.vue';

const troubleList: TroubleListItem[] = [
  {
    id: 1,
    icon: 'fa-solid fa-network-wired',
    title: '"웹 개발은 너무 복잡해요"',
    detail:
      '자바스크립트 생태계가 발전해 가면서 쌓인 기술 부채와 서로 얽혀 있는 수많은 요소들 때문에 그래요. 맨땅에 헤딩하며 스스로 배울 수도 있지만, 이미 그걸 겪은 사람과 진득하니 앉아 차분히 배우는 것도 좋은 방법이에요.',
  },
  {
    id: 2,
    icon: 'fa-regular fa-face-frown',
    title: '"할 수는 있는데, 자신감이 없어요"',
    detail:
      '사용하고 계시는 프레임워크와 라이브러리들이 어떻게 조화롭게 돌아가는 건지 근본적인 원리를 이해하지 못하면, 사소한 버그에도 패닉 하기 쉬워요. 강좌를 통해 중요한 주제들을 라이브러리 없이 직접 개발해 보면서 작동 원리를 이해해 보세요.',
  },
  {
    id: 3,
    icon: 'fa-solid fa-stairs',
    title: '"개발 실력을 레벨 업 하고 싶어요."',
    detail:
      '비슷한 토이 프로젝트를 반복해서 만들면 손은 빨라질 수 있지만, 깊이 있게 들어가기 위해서는 다른 전략이 필요해요. 핵심 개념들을 깊이 이해하고 나면, 어떤 새로운 프레임워크가 나와도 쉽게 이해할 기초 지식이 생길 거예요.',
  },
  {
    id: 4,
    icon: 'fa-solid fa-forward',
    title: '"새로운 것들이 너무 빠르게 많이 나와요."',
    detail:
      '자바스크립트, 특히 프론트엔드 진영은 아직 해결해야 할 문제가 많고, 다양한 시도들이 끊임없이 일어나고 있어요. 그래서 새로운 라이브러리, 프레임워크, 개념들이 수없이 쏟아지죠. 하지만 기존에 존재하는 문제들을 새로운 방식으로 풀어보려는 시도가 대부분이에요. 기존의 문제들을 그런 솔루션 없이 직접 해결해 보고 나면, 새로 나오는 것들이 어떻게 다르게 해결하는지 비교해 보며 쉽게 이해할 수 있게 돼요.',
  },
];
</script>
