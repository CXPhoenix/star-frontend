<script setup>
import InputArea from "../components/InputArea.vue";
import VerticalButton from "../components/VerticalButton.vue";
import logo from "../assets/celebrate-70-logo.png";
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="w-full max-w-lg space-y-4">
      <form
        @submit.prevent=""
        class="w-full max-w-lg space-y-6 px-6 py-8 sm:rounded-md sm:shadow-xl"
      >
        <div class="w-full">
          <img :src="logo" alt="logo" class="mx-auto w-[28vw] max-w-[10rem]" />
        </div>
        <h1 class="text-center text-3xl">登入</h1>
        <p class="text-center text-lg">登入以繼續使用繁星系統</p>
        <div class="">
          <InputArea content="請輸入帳號" />
          <InputArea content="請輸入密碼" input-type="password" />
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
