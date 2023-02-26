<script setup>
import JumpPageButton from "../components/JumpPageButton.vue";
import VerticalButton from "../components/VerticalButton.vue";

const user = JSON.parse(window.sessionStorage.getItem("user"));

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
    [
      user.account,
      user.username,
      ...user.studentGrades.slice(0, 7),
      user.applyRank,
    ],
  ];
};
</script>

<template>
  <div
    class="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-4 py-10 pt-14"
  >
    <div
      class="grid w-full grid-cols-2 justify-items-stretch gap-8 text-xl"
      v-for="(userInfoKey, index) in getUserInfo()[0]"
      :key="index.toString().padStart(2, '0') + userInfoKey"
    >
      <p class="justify-self-end">{{ userInfoKey }}:</p>
      <p class="justify-self-start">{{ getUserInfo()[1][index] }}</p>
    </div>

    <JumpPageButton
      position="right"
      content="新增/修改預選志願學群"
      path="/user/apply-volunteer"
    />
  </div>
</template>
