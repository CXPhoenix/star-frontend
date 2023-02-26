<script setup>
import { reactive } from "vue";
import InputArea from "../components/InputArea.vue";
import VerticalButton from "../components/VerticalButton.vue";
import { updateVolunteerRank } from "../utils/api.js";

const tableHeaders = ["學系代碼", "大學名稱", "學群類別", "學系名稱"];
const user = JSON.parse(window.sessionStorage.getItem("user"));

const dept = reactive({
  valid: [
    ...user.validDept.filter(
      (vd) =>
        !user.volunteerRank.find(
          (vr) =>
            vd.schoolId === vr.schoolId && vd.deptCategory === vr.deptCategory
        )
    ),
  ],
  searchText: "",
});

const getApplyDept = async (dept) => {
  user.volunteerRank.push(dept);
  await updateVolunteerRank(user.volunteerRank);
};

const deptFilter = () => {
  // 還原所有的內容
  dept.valid = [...user.validDept];
  // 排除其他可能存在的重複內容
  dept.valid = [
    ...dept.valid.filter(
      (vd) =>
        !user.volunteerRank.find(
          (vr) =>
            vd.schoolId === vr.schoolId && vd.deptCategory === vr.deptCategory
        )
    ),
  ];
  // 搜尋
  dept.valid = [
    ...dept.valid.filter(
      (vd) =>
        vd.schoolName.search(dept.searchText) !== -1 ||
        vd.deptCategory.search(dept.searchText) !== -1 ||
        vd.deptId.search(dept.searchText) !== -1 ||
        vd.deptName.search(dept.searchText) !== -1
    ),
  ];
};
</script>

<template>
  <div class="mx-auto w-full max-w-3xl py-4 px-2">
    <router-link to="/user/apply-volunteer">
      <VerticalButton bgColor="#ffffff00">
        <span>
          <font-awesome-icon icon="fa-solid fa-backward-step" />
        </span>
        <p class="text-black">返回前一頁</p>
      </VerticalButton>
    </router-link>
    <div class="flex items-center rounded-md border-2 border-gray-400 py-2">
      <span class="px-3 text-lg">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </span>
      <input
        type="text"
        class="w-full pl-2 pr-4 text-lg outline-none ring-0"
        v-model="dept.searchText"
        @input="deptFilter"
      />
    </div>
    <div
      class="grid w-full grid-cols-4 justify-items-stretch gap-4 border-b-2 pt-8 text-center"
    >
      <p
        class="text-xl"
        v-for="(header, index) in tableHeaders"
        :key="index.toString + header"
      >
        {{ header }}
      </p>
    </div>
    <div class="max-h-[65vh] w-full overflow-auto py-3 lg:max-h-[70vh]">
      <router-link
        class="grid w-full grid-cols-4 justify-items-stretch gap-x-4 border-b-2 py-4 text-center md:text-xl"
        v-for="vD in dept.valid"
        :key="vD.deptId"
        to="/user/apply-volunteer"
        @click="getApplyDept(vD)"
      >
        <p class="">{{ vD.deptId }}</p>
        <p class="">{{ vD.schoolName }}</p>
        <p class="">{{ vD.deptCategory }}</p>
        <p class="">{{ vD.deptName }}</p>
      </router-link>
    </div>
  </div>
</template>
