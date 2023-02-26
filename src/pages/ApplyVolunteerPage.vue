<script setup>
import { reactive } from "vue";
import InputArea from "../components/InputArea.vue";

const tableHeaders = ["學系代碼", "大學名稱", "學群類別", "學系名稱"];
const user = JSON.parse(window.sessionStorage.getItem("user"));
const dept = reactive({
  valid: user.validDept,
});

const getApplyDept = (dept) => {
  console.log(dept);
};

const searchText = "";
const deptFilter = () => {
  dept.valid = user.validDept.filter(
    (vd) =>
      vd.schoolName.includes(searchText) &&
      vd.deptCategory.includes(searchText) &&
      vd.deptId.includes(searchText) &&
      vd.deptName.includes(searchText)
  );
  console.log(dept.valid);
};
</script>

<template>
  <div class="mx-auto w-full max-w-3xl py-4 px-2">
    <div class="flex items-center rounded-md border-2 border-gray-400 py-2">
      <span class="px-3 text-lg">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </span>
      <input
        type="text"
        class="w-full pl-2 pr-4 text-lg outline-none ring-0"
        v-model="searchText"
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
    <div class="w-full overflow-auto py-3 lg:max-h-[70vh]">
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
