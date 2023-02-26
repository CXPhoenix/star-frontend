<script setup>
import { defineProps } from "vue";

const props = defineProps(["gapHeight"]);
const gapHeight = props.gapHeight !== undefined ? props.gapHeight : "5vh";
</script>

<template>
  <div :style="{ height: gapHeight }"></div>
</template>
