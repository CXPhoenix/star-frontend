<script setup>
import { defineProps } from "vue";
import VerticalButton from "./VerticalButton.vue";

const props = defineProps(["position", "content", "path"]);
const path = props.path !== undefined ? props.path : "/user/menu";
const position =
  props.position !== undefined && ["right", "left"].includes(props.position)
    ? props.position
    : "right";
</script>

<template>
  <div
    class="fixed bottom-10"
    :class="{
      'right-0': position === 'right',
      'sm:right-14': position === 'right',
      'lg:right-28': position === 'right',
      'left-0': position === 'left',
      'sm:left-14': position === 'left',
      'lg:left-28': position === 'left',
    }"
  >
    <router-link :to="path">
      <VerticalButton bg-color="#fff">
        <span class="pr-4 text-lg" v-if="position === 'left'">
          <font-awesome-icon icon="fa-solid fa-angle-left" />
        </span>
        <p class="">{{ props.content }}</p>
        <span class="pr-4 text-lg" v-if="position === 'right'">
          <font-awesome-icon icon="fa-solid fa-angle-right" />
        </span>
      </VerticalButton>
    </router-link>
  </div>
</template>
