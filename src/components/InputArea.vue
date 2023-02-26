<script setup>
import { defineProps, ref } from "vue";

const props = defineProps(["content", "modelValue", "inputType"]);
const inputType = props.inputType !== undefined ? props.inputType : "text";
</script>

<template>
  <div class="w-full p-2">
    <p class="text-start">{{ props.content }}</p>
    <input
      :type="inputType"
      class="w-full rounded-md border-2 border-gray-400 py-1 pl-4 pr-2"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      autocomplete="off"
    />
  </div>
</template>
