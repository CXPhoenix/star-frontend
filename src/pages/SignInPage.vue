<script setup>
import { reactive } from "vue";
import InputArea from "../components/InputArea.vue";
import VerticalButton from "../components/VerticalButton.vue";
import logo from "../assets/celebrate-70-logo.png";

import { getSignIn } from "../utils/api.js";
import router from "../utils/router.js";

const signInInfo = reactive({
  account: "",
  password: "",
});

const signIn = async () => {
  if (signInInfo.account === "" || signInInfo.password === "") {
    alert("請填入帳號密碼");
  }
  const signInData = await getSignIn(signInInfo.account, signInInfo.password);
  alert(`你好 ${signInData.username}`);
  router.push("/user/menu");
};
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="w-full max-w-lg space-y-4">
      <form
        @submit.prevent="signIn"
        class="w-full max-w-lg space-y-6 px-6 py-8 sm:rounded-md sm:shadow-xl"
      >
        <div class="w-full">
          <img :src="logo" alt="logo" class="mx-auto w-[28vw] max-w-[10rem]" />
        </div>
        <h1 class="text-center text-3xl">登入</h1>
        <p class="text-center text-lg">登入以繼續使用繁星系統</p>
        <div class="">
          <InputArea content="請輸入帳號" v-model="signInInfo.account" />
          <InputArea
            content="請輸入密碼"
            input-type="password"
            v-model="signInInfo.password"
          />
        </div>
        <VerticalButton class="w-full" bgColor="rgb(59,130,246)">
          <p class="py-2 text-center text-white">繼續</p>
        </VerticalButton>
      </form>
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <router-link to="/" class="cursor-pointer text-blue-400">
          系統說明
        </router-link>
        <p class="">技術支援：02-2891-4131 #641</p>
      </div>
    </div>
  </div>
</template>
