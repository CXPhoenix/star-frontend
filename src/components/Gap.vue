<script setup>
import { defineProps } from "vue";

const props = defineProps(["gapHeight"]);
const gapHeight = props.gapHeight !== undefined ? props.gapHeight : "15vw";
</script>

<template>
  <div :style="{ height: gapHeight }"></div>
</template>
