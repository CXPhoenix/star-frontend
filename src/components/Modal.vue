<template>
  <div
    class="fixed inset-0 flex h-screen w-screen items-center justify-center bg-gray-900/60"
  >
    <slot></slot>
    <span
      v-if="!noCloseFunction"
      class="fixed top-2 right-5 cursor-pointer text-4xl text-white md:text-gray-400 md:hover:text-gray-50"
      @click.stop="closeModal"
    >
      &times;
    </span>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    noCloseFunction: Boolean,
  },
  setup(props, { emit }) {
    const noCloseFunction = props.noCloseFunction;
    const closeModal = () => {
      emit("closeModal");
    };
    return { closeModal, noCloseFunction };
  },
};
</script>

<style></style>
