<script setup>
import { defineProps, reactive } from "vue";

const props = defineProps(["content", "bindValue", "inputType"]);
const inputType = props.inputType !== undefined ? props.inputType : "text";
</script>

<template>
  <div class="w-full p-2">
    <p class="text-start">{{ props.content }}</p>
    <input
      :type="inputType"
      class="w-full border-2 border-gray-400 py-1 pl-4 pr-2"
      v-model="props.bindValue"
      autocomplete="off"
    />
  </div>
</template>
