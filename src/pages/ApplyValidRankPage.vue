<script setup>
import { reactive, onMounted } from "vue";
import Gap from "../components/Gap.vue";
import { updateApplyDeptRank, getUser } from "../utils/api";
import { star } from "../utils/status.js";

import JumpPageButton from "../components/JumpPageButton.vue";
import VerticalButton from "../components/VerticalButton.vue";

// const rank = reactive({
//   volunteer: user.volunteerRank,
// });

const onUp = async (index) => {
  const vR = star.rank[index];
  star.rank.splice(index, 1);
  star.rank.splice(index - 1, 0, vR);
  await updateApplyDeptRank(star.rank);
};

const onDown = async (index) => {
  const vR = star.rank[index];
  star.rank.splice(index, 1);
  star.rank.splice(index + 1, 0, vR);
  await updateApplyDeptRank(star.rank);
};

const onDelete = async (index) => {
  star.rank.splice(index, 1);
  await updateApplyDeptRank(star.rank);
};

// onMounted(() => {
//   window.addEventListener("user-update", (e) => {
//     console.log(e);
//     rank.volunteer = e.detail.storage.volunteerRank;
//   });
// });
</script>

<template>
  <div class="mx-auto w-full max-w-3xl p-4">
    <div class="flex w-full items-center justify-end gap-4 py-6">
      <router-link to="/apply-star">
        <VerticalButton bg-color="#3423ea" class="text-white">
          <span class="">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </span>
          <p class="">增加志願</p>
        </VerticalButton>
      </router-link>
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
        class="border-b-2 py-3 text-center md:text-xl"
        v-for="(vR, index) in star.rank"
        :key="vR.deptId"
      >
        <div class="grid w-full grid-cols-4 justify-items-stretch gap-x-4">
          <p class="">{{ index + 1 }}</p>
          <p class="">{{ vR.schoolName }}</p>
          <p class="">{{ vR.deptCategory }}</p>
          <p class="">{{ vR.deptName }}</p>
        </div>
        <div class="flex justify-end gap-2">
          <VerticalButton
            bg-color="rgb(210,120,140)"
            class="text-sm"
            @click="onUp(index)"
            v-if="index !== 0"
          >
            <span class="">
              <font-awesome-icon icon="fa-solid fa-turn-up" />
            </span>
            <p class="">上移</p>
          </VerticalButton>
          <VerticalButton
            bg-color="rgb(210,120,140)"
            class="text-sm"
            @click="onDown(index)"
            v-if="index !== star.rank.length - 1"
          >
            <span class="">
              <font-awesome-icon icon="fa-solid fa-turn-down" />
            </span>
            <p class="">下移</p>
          </VerticalButton>
          <VerticalButton
            bg-color="rgb(210,120,140)"
            class="text-sm"
            @click="onDelete(index)"
          >
            <span class="">
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </span>
            <p class="">刪除</p>
          </VerticalButton>
        </div>
      </div>
      <Gap />
    </div>
  </div>
  <JumpPageButton position="left" content="回到目錄" />
</template>
