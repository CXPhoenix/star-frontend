<template>
  <div class="h-screen w-screen">
    <div class="flex h-full flex-col items-center justify-center gap-y-5">
      <span class="block text-center text-[30vw] text-red-500">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </span>
      <h1 class="text-center text-4xl">目前沒有開放喔！</h1>
      <p class="text-xl">開放時間為 ~ 喔！</p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    window.sessionStorage.clear();
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
