<script setup>
import VerticalButton from "../components/VerticalButton.vue";

const getUserInfo = () => {
  return [
    [
      "報名序號",
      "姓名",
      "校百分比",
      "國文級分",
      "英文級分",
      "數Ａ級分",
      "數Ｂ級分",
      "社會級分",
      "自然級分",
      "推薦順序",
    ],
    ["0", "1", "2", "2", "2", "2", "2", "2", "2", "2"],
  ];
};
</script>

<template>
  <div
    class="relative mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-4 py-10 pt-14"
  >
    <div
      class="grid w-full grid-cols-2 justify-items-stretch gap-8 text-xl"
      v-for="(userInfoKey, index) in getUserInfo()[0]"
      :key="index.toString().padStart(2, '0') + userInfoKey"
    >
      <p class="justify-self-end">{{ userInfoKey }}:</p>
      <p class="justify-self-start">{{ getUserInfo()[1][index] }}</p>
    </div>
    <div class="absolute top-0 right-0">
      <router-link to="/menu">
        <VerticalButton bg-color="#fff">
          <p class="">新增/修改預選志願學群</p>
          <span class="">
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </span>
        </VerticalButton>
      </router-link>
    </div>
  </div>
</template>
