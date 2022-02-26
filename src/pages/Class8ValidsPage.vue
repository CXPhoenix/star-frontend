<template>
  <div class="h-screen w-screen space-y-10">
    <TopNavBar @signOut="signOut" />
    <div class="pl-3 pb-1 pt-4 md:hidden">
      <button class="text-xl" @click="emits('prevPage', 'userPage')">
        <i class="fa-solid fa-house"></i>
      </button>
    </div>
    <div
      class="mx-auto flex w-11/12 items-center justify-center px-2"
      v-if="isHaveClass8Valids"
    >
      <table class="table-auto text-center md:w-8/12">
        <thead>
          <tr class="border-2">
            <th class="border-2 px-2 py-1">學校名稱</th>
            <th class="border-2 px-2 py-1">學群類別</th>
            <th class="border-2 px-2 py-1">學系代碼</th>
            <th class="border-2 px-2 py-1">學系名稱</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-2" v-for="data in class8Valids" :key="data.deptId">
            <td class="border-2 px-2 py-1">{{ data.schoolName }}</td>
            <td class="border-2 px-2 py-1">{{ data.deptClassName }}</td>
            <td class="border-2 px-2 py-1">{{ data.deptId }}</td>
            <td class="border-2 px-2 py-1">{{ data.deptName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="py-10 text-center text-gray-800" v-if="!isHaveClass8Valids">
      查無第八類學群合格校系...
    </h3>
    <div
      class="flex items-center justify-end px-3 pt-5 pb-16 text-green-600 hover:text-green-800 md:justify-between md:px-10"
    >
      <button class="hidden md:block" @click="emits('prevPage', 'userPage')">
        <i class="fa-solid fa-house"></i>&nbsp;選單
      </button>
    </div>
  </div>
  <LoadingModal v-if="isLoading" />
</template>

<script>
import { ref } from "@vue/reactivity";
import TopNavBar from "../components/TopNavBar.vue";
import LoadingModal from "../componentSet/LoadingModal.vue";
import { url } from "../utils";
export default {
  setup(props, { emit }) {
    const isLoading = ref(true);
    const isHaveClass8Valids = ref(false);
    const class8ValidsIds = JSON.parse(
      window.sessionStorage.getItem("userData")
    ).class8Valids;
    if (class8ValidsIds.length > 0) {
      isHaveClass8Valids.value = true;
    }
    const emits = (event, data) => {
      emit(event, data);
    };
    const signOut = () => {
      window.sessionStorage.clear();
      emit("signOut");
    };
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "application/json");
    const fetchOptions = {
      headers: headers,
      method: "GET",
    };
    const stringIds = class8ValidsIds.join("_");
    const class8InfoUrl = new URL(`./dept/${stringIds}`, url);
    const class8Valids = ref([]);
    if (!stringIds) {
      isLoading.value = false;
    } else if (!window.sessionStorage.getItem("class8Valids")) {
      fetch(class8InfoUrl, fetchOptions)
        .then((res) => {
          if (res.ok) {
            isLoading.value = false;
            return res.json();
          }
          signOut();
        })
        .then((datas) => {
          class8Valids.value = [...datas];
          window.sessionStorage.setItem("class8Valids", JSON.stringify(datas));
        })
        .catch((e) => console.log(e));
    } else {
      isLoading.value = false;
      class8Valids.value = [
        ...JSON.parse(window.sessionStorage.getItem("class8Valids")),
      ];
    }

    return {
      isLoading,
      signOut,
      class8Valids,
      isHaveClass8Valids,
      emits,
    };
  },
  components: { TopNavBar, LoadingModal },
  emits: ["signOut", "prevPage"],
};
</script>

<style lang="scss" scoped></style>
