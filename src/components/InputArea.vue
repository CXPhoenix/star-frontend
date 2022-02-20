<template>
  <label :for="uid" class="group relative">
    <p
      class="absolute inset-y-3 left-4 cursor-text text-[1rem] text-gray-500 duration-75 group-focus-within:-translate-y-[1.3rem] group-focus-within:-translate-x-2 group-focus-within:bg-white group-focus-within:px-1 group-focus-within:text-[0.75rem] group-focus-within:text-blue-500"
    >
      {{ placeholder }}
    </p>
    <input
      :id="uid"
      :name="name"
      :type="type"
      class="w-full rounded-[0.15rem] border-[0.063rem] border-gray-500 py-3 px-4 focus:outline-blue-500"
      autocomplete="off"
      v-model="value"
      @input="emit"
      :required="required"
    />
  </label>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "InputArea",
  props: {
    uid: String,
    placeholder: String,
    inputAreaName: String,
    type: String,
    required: Boolean,
  },
  setup(props, context) {
    const uid = props.uid;
    const placeholder = props.placeholder;
    const name = props.inputAreaName;
    const type = props.type ? props.type : "text";
    const required = props.required;
    const value = ref("");
    const emit = (e) => {
      haveValue(e.target.previousElementSibling, value.value == "");
      context.emit("onInput", value.value);
    };
    return {
      uid,
      placeholder,
      name,
      type,
      required,
      value,
      emit,
    };
  },
};

function haveValue(elemnt, have) {
  if (!have) {
    elemnt.classList.remove("text-[1rem]");
    elemnt.classList.add(
      "-translate-y-[1.3rem]",
      "-translate-x-2",
      "bg-white",
      "px-1",
      "text-[0.25rem]"
    );
    return;
  }
  elemnt.classList.add("text-[1rem]");
  elemnt.classList.remove(
    "-translate-y-[1.3rem]",
    "-translate-x-2",
    "bg-white",
    "px-1",
    "text-[0.25rem]"
  );
  return;
}
</script>

<style></style>
