<script setup>
import JumpPageButton from "../components/JumpPageButton.vue";
import VerticalButton from "../components/VerticalButton.vue";

const user = JSON.parse(window.sessionStorage.getItem("user"));
const volunteerRank = user.volunteerRank;
</script>

<template>
  <div class="mx-auto w-full max-w-3xl p-4">
    <div class="flex w-full items-center justify-end gap-4 py-6">
      <router-link to="/apply">
        <VerticalButton bg-color="#3423ea" class="text-white">
          <span class="">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </span>
          <p class="">增加志願</p>
        </VerticalButton>
      </router-link>
      <!-- <VerticalButton bg-color="rgb(13,196,43)" class="text-white">
        <span class="">
          <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
        </span>
        <p class="">儲存志願</p>
      </VerticalButton> -->
    </div>
    <div
      class="grid w-full grid-cols-4 justify-items-stretch gap-4 border-b-2 pt-2 text-center"
    >
      <p class="">志願序</p>
      <p class="">大學名稱</p>
      <p class="">學群類別</p>
      <p class="">合格代表學系</p>
    </div>
    <div class="max-h-[53vh] w-full overflow-auto py-3 lg:max-h-[58vh]">
      <div
        class="grid w-full grid-cols-4 justify-items-stretch gap-x-4 border-b-2 py-3 text-center md:text-xl"
        v-for="(vR, index) in volunteerRank"
        :key="vR.deptId"
      >
        <p class="">{{ index + 1 }}</p>
        <p class="">{{ vR.schoolName }}</p>
        <p class="">{{ vR.deptCategory }}</p>
        <p class="">{{ vR.deptName }}</p>
      </div>
    </div>
  </div>
  <JumpPageButton
    content="確認/列印預選志願學群"
    path="/user/check-volunteer"
  />
</template>
