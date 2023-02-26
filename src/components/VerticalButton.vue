<script setup>
import { defineProps } from "vue";

const props = defineProps(["buttonActivity", "bgColor", "otherStyleObject"]);
const bgColor = props.bgColor !== undefined ? props.bgColor : "white";

const styleObject = {
  "background-color": bgColor,
  ...props.otherStyleObject,
};
</script>

<template>
  <button
    class="flex items-center justify-center gap-3 rounded-lg p-2"
    :class="{
      'border-2': bgColor === 'white',
      'border-gray-600': bgColor === 'white',
    }"
    :style="styleObject"
    @click="props.buttonActivity"
  >
    <slot></slot>
  </button>
</template>
