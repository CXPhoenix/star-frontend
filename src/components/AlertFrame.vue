<template>
  <div
    class="relative h-[15rem] w-full space-y-4 bg-white px-3 shadow-lg sm:w-8/12 sm:rounded-lg md:w-[27rem] md:border-[1px] md:border-gray-500"
  >
    <h1 class="text-bold py-4 px-2 text-3xl">
      <slot name="header">注意！</slot>
    </h1>
    <p class="overflow-auto py-4 px-2 text-gray-700"><slot>注意注意</slot></p>
    <div class="flex items-center justify-end px-4" v-if="isButton">
      <form @submit.prevent="close">
        <input
          type="submit"
          class="cursor-pointer rounded-md bg-blue-600 px-3 py-2 text-gray-50 focus:outline-none"
          :value="buttonText"
          ref="input"
        />
      </form>
      <!-- <button
        class="cursor-pointer rounded-md bg-blue-600 px-3 py-2 text-gray-50"
        @click="close"
      >
        {{ buttonText }}
      </button> -->
    </div>
    <div class="absolute top-3 right-2" v-if="!isButton">
      <span
        class="cursor-pointer text-2xl text-gray-600 hover:text-black"
        @click="close"
      >
        &times;
      </span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    isButton: Boolean,
    buttonText: String,
    isOpen: Boolean,
  },
  setup(props, { emit }) {
    const isOpen = ref(props.isOpen);
    const isButton = props.isButton == null ? true : props.isButton;
    const buttonText = props.buttonText ? props.buttonText : "繼續";
    const input = ref(null);
    onMounted(() => {
      input.value.focus();
    });

    const close = () => {
      emit("onClose");
    };
    return {
      isButton,
      buttonText,
      isOpen,
      input,
      close,
    };
  },
};
</script>

<style scoped></style>
