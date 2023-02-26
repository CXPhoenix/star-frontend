<script setup>
import { reactive, defineProps } from "vue";
import logo from "../assets/celebrate-70-logo.png";
import VerticalButton from "./VerticalButton.vue";

const getUsername = () => "陌生";
</script>

<template>
  <div class="flex w-full items-center justify-between bg-yellow-400 p-2">
    <div class="flex items-center justify-center gap-4">
      <img :src="logo" alt="70週年校慶 logo" class="h-8" />
      <p class="sm:text-[2vw]">復興繁星系統</p>
    </div>
    <div class="hidden sm:block">
      <p class="">歡迎回來，{{ getUsername() }} 同學</p>
    </div>
  </div>
</template>
