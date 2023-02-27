<script setup>
import { defineProps } from "vue";
import VerticalButton from "./VerticalButton.vue";

/*
type: str [required] 
["alert", "check"]
title: str
content: str
checkActivity: function [required]
closeActivity: function
*/
const props = defineProps([
  "type",
  "title",
  "content",
  "checkActivity",
  "closeActivity",
]);
const type = props.type;
const title = props.title;
const content = props.content;

const closeActivity =
  type === alert ? props.checkActivity : props.closeActivity;
const checkActivity = props.checkActivity;
</script>

<template>
  <div
    class="flex w-full max-w-lg flex-col justify-between gap-5 rounded-md bg-blue-100 p-5"
  >
    <h2 class="text-xl">{{ title }}</h2>
    <p class="text-md">{{ content }}</p>
    <div class="flex items-center justify-end gap-6">
      <VerticalButton @click="checkActivity">
        <p class="p-1 text-center">確認</p>
      </VerticalButton>
      <VerticalButton @click="closeActivity" v-if="type !== 'alert'">
        <p class="p-1 text-center">取消</p>
      </VerticalButton>
    </div>
  </div>
</template>
