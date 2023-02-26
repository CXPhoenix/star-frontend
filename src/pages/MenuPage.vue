<script setup>
import VerticalButton from "../components/VerticalButton.vue";

const menus = [
  {
    content: "查詢推薦順序",
    path: "/user/user",
  },
  {
    content: "新增/修改預選志願學群",
    path: "/user/apply-volunteer",
  },
  {
    content: "確認/列印預選志願學群",
    path: "/user/check-volunteer",
  },
  {
    content: "檢視合格的第八學群學系",
    path: "/user/valid-dept8",
  },
];
</script>

<template>
  <div
    class="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-10 py-20 px-4"
  >
    <router-link
      v-for="(menu, index) in menus"
      :key="index + menu.path"
      :to="menu.path"
      class="w-full"
    >
      <VerticalButton bg-color="#ecdabf" class="w-full shadow-lg">
        <p class="text-center text-2xl">{{ menu.content }}</p>
      </VerticalButton>
    </router-link>
  </div>
</template>
