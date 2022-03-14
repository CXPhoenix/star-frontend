<template>
  <div class="h-screen w-screen">
    <div class="flex h-full flex-col items-center justify-center gap-y-5">
      <span class="block text-center text-[25vw] text-red-500">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </span>
      <h1 class="text-center text-4xl">目前沒有開放喔！</h1>
      <p class="text-center text-xl">
        開放時間為 {{ theOpenTime.start }} ~ {{ theOpenTime.end }} 喔！
      </p>
    </div>
  </div>
</template>

<script>
import { openTime } from "../utils";
export default {
  setup() {
    window.sessionStorage.clear();
    const theOpenTime = {
      start: timeFormat(new Date(openTime.start)),
      end: timeFormat(new Date(openTime.end)),
    };
    return { theOpenTime };
  },
};

/**
 *
 * @param {Date} date
 * @returns {String}
 */
function timeFormat(date) {
  const Y = date.getFullYear();
  const M =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${Y}/${M}/${D} ${h}:${m}`;
}
</script>

<style lang="scss" scoped></style>
