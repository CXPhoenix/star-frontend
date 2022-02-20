<template>
  <div class="flex items-center justify-between bg-blue-300 p-3">
    <div class="flex items-center space-x-2">
      <img :src="fhshLogo" alt="Logo" class="h-8 sm:h-14" />
      <h1 class="hidden text-xl sm:block md:text-4xl">
        復興高中繁星志願登錄系統
      </h1>
    </div>
    <div class="flex items-center justify-center gap-x-3">
      <p class="">
        歡迎 <span class="font-semibold">{{ username }}</span> 登入
      </p>
      <a
        class="cursor-pointer text-purple-900 underline underline-offset-2 hover:text-purple-200"
        @click.prevent="signOut"
      >
        登出
      </a>
    </div>
  </div>
</template>

<script>
import { getImage } from "../utils";
export default {
  name: "TopNavBar",
  setup(props, { emit }) {
    const fhshLogo = getImage("fhshLOGO.png");
    let username;
    if (window.sessionStorage && window.sessionStorage.getItem("authData")) {
      const datas = JSON.parse(window.sessionStorage.getItem("authData"));
      username = datas.username;
    }
    const signOut = () => {
      window.sessionStorage.removeItem("authData");
      emit("signOut");
    };
    return {
      fhshLogo,
      username,
      signOut,
    };
  },
};
</script>

<style></style>
