<script setup>
import Gap from "../components/Gap.vue";
import JumpPageButton from "../components/JumpPageButton.vue";
const user = JSON.parse(window.sessionStorage.getItem("user"));
const volunteerRank = user.volunteerRank;
</script>

<template>
  <div class="mx-auto w-full max-w-2xl space-y-3 p-6 pt-10">
    <p class="text-center text-5xl" v-if="volunteerRank.length === 0">
      尚未選擇任何志願
    </p>
    <div
      class="grid w-full grid-cols-4 justify-items-stretch gap-4 border-b-2 text-center"
      v-if="volunteerRank.length > 0"
    >
      <p class="">志願序</p>
      <p class="">大學名稱</p>
      <p class="">學群類別</p>
      <p class="">合格代表學系</p>
    </div>
    <div class="max-h-[67vh] overflow-auto lg:max-h-[75vh]">
      <div
        class="grid w-full grid-cols-4 justify-items-stretch gap-x-4 border-b-2 sm:text-center"
        v-for="(vR, index) in volunteerRank"
        :key="vR.deptId"
      >
        <p class="">{{ index + 1 }}</p>
        <p class="">{{ vR.schoolName }}</p>
        <p class="">{{ vR.deptCategory }}</p>
        <p class="">{{ vR.deptName }}</p>
      </div>
    </div>
    <Gap />
  </div>
  <JumpPageButton position="left" content="回到目錄" />
</template>
