<script setup>
import JumpPageButton from "../components/JumpPageButton.vue";

const getValidDept8 = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  return user.validDept8;
};
</script>

<template>
  <div class="mx-auto w-full max-w-2xl space-y-3 p-6 pt-10">
    <p class="text-center text-5xl" v-if="getValidDept8().length === 0">
      未有任何學系符合
    </p>
    <div
      class="grid w-full grid-cols-4 justify-items-stretch gap-4 border-b-2 text-center"
      v-if="getValidDept8().length > 0"
    >
      <p class="">學校名稱</p>
      <p class="">學群類別</p>
      <p class="">學系代號</p>
      <p class="">學系名稱</p>
    </div>
    <div
      class="grid w-full grid-cols-4 justify-items-stretch gap-x-4 border-b-2 sm:text-center"
      v-for="validDept8 in getValidDept8()"
      :key="validDept8.deptId"
    >
      <p class="">{{ validDept8.schoolName }}</p>
      <p class="">{{ validDept8.deptCategory }}</p>
      <p class="">{{ validDept8.deptId }}</p>
      <p class="">{{ validDept8.deptName }}</p>
    </div>
  </div>
  <JumpPageButton position="left" content="回到目錄" />
</template>
