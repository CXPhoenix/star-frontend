<script setup>
import logo from "../assets/celebrate-70-logo.png";
import VerticalButton from "../components/VerticalButton.vue";

const getUsername = () => {
  const userAuthInfo = JSON.parse(window.localStorage.getItem("signIn"));
  if (userAuthInfo === null) {
    return undefined;
  }
  return userAuthInfo.username;
};

const getSignOut = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
};
</script>

<template>
  <div
    class="flex w-full items-center bg-yellow-400 p-2"
    :class="{
      'justify-between': getUsername() !== undefined,
      'justify-center': getUsername() === undefined,
    }"
  >
    <router-link
      class="flex flex-shrink cursor-pointer items-center justify-center gap-4"
      to="/user/menu"
    >
      <img :src="logo" alt="70週年校慶 logo" class="h-8 sm:h-10" />
      <p class="sm:text-[2.5vw]">復興繁星系統</p>
    </router-link>
    <!-- <div class="flex flex-shrink items-center justify-center gap-4">
      <img :src="logo" alt="70週年校慶 logo" class="h-8" />
      <p class="sm:text-[2vw]">復興繁星系統</p>
    </div> -->
    <div
      class="flex items-center justify-center gap-5"
      v-if="getUsername() !== undefined"
    >
      <p class="hidden text-2xl sm:block">歡迎回來，{{ getUsername() }} 同學</p>
      <router-link to="/sign-in" @click="getSignOut">
        <VerticalButton bgColor="#ac1224">
          <p class="px-4 text-xl text-white">登出</p>
        </VerticalButton>
      </router-link>
    </div>
  </div>
</template>
