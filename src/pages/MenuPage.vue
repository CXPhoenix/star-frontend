<script setup>
import VerticalButton from "../components/VerticalButton.vue";

const menus = [
  "查詢推薦順序",
  "新增/修改預選志願學群",
  "瀏覽/列印預選志願學群",
  "檢視合格的第八學群學系",
];
</script>

<template>
  <div class="mx-auto w-full max-w-2xl space-y-10 py-20 px-4">
    <VerticalButton
      bg-color="gray"
      class="w-full shadow-lg"
      v-for="(menu, index) in menus"
      :key="index"
    >
      <p class="text-center text-2xl">{{ menu }}</p>
    </VerticalButton>
  </div>
</template>
