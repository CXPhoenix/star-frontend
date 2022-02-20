<template>
  <form
    id="signInForm"
    class="relative flex h-full w-full flex-col items-center gap-y-6 rounded-md border-gray-400 px-10 pt-12 pb-9 md:min-h-[500px] md:w-[26rem] md:border-[1px]"
    @submit.prevent="formSubmit(addrArea.value, pwdArea.value)"
    v-if="isOpen"
  >
    <div
      class="flex w-full flex-col items-center justify-center space-y-3 text-center"
    >
      <img :src="logo.img" :alt="logo.alt" class="h-16 w-auto" />
      <h2 class="text-4xl">{{ title }}</h2>
      <p class="text-gray-500">{{ description }}</p>
    </div>
    <div class="w-full space-y-4">
      <InputArea
        :uid="addrArea.name"
        :placeholder="addrArea.text"
        :inputAreaName="addrArea.name"
        :required="false"
        class="block w-full"
        @onInput="getAddr"
      />
      <InputArea
        :uid="pwdArea.name"
        :placeholder="pwdArea.text"
        :inputAreaName="pwdArea.name"
        :type="pwdArea.type"
        :required="false"
        class="block w-full"
        @onInput="getPwd"
      />
    </div>
    <input
      type="submit"
      value="繼續"
      class="w-full cursor-pointer rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
    />
    <span
      class="absolute top-1 right-4 cursor-pointer select-none text-3xl text-gray-400 hover:text-black"
      v-if="haveCloseTag"
      @click="closeMethod"
    >
      &times;
    </span>
  </form>
</template>

<script>
import InputArea from "./InputArea.vue";
import { ref, reactive, toRef } from "vue";
export default {
  name: "SignInForm",
  components: {
    InputArea: InputArea,
  },
  props: {
    logo: String,
    title: String,
    description: String,
    haveCloseTag: Boolean,
    formSubmit: Function,
  },
  setup(props) {
    const addrArea = reactive({
      name: "addrArea",
      text: "請輸入帳號",
      value: "",
    });
    const getAddr = (val) => {
      addrArea.value = val;
    };
    const pwdArea = reactive({
      name: "pwdArea",
      text: "請輸入密碼",
      type: "password",
      value: "",
    });
    const getPwd = (val) => {
      pwdArea.value = val;
    };
    const logo = props.logo
      ? reactive({
          img: props.logo,
          alt: "LOGO",
        })
      : reactive({
          img: null,
          alt: null,
        });
    const headText = reactive({
      title: props.title ? props.title : "登入",
      description: props.description ? props.description : "使用您的帳戶登入",
    });
    const haveCloseTag = ref(props.haveCloseTag);
    const isOpen = ref(true);
    const closeMethod = () => {
      isOpen.value = false;
    };
    const formSubmit = props.formSubmit
      ? props.formSubmit
      : (addr, pwd) => {
          console.log(addr, pwd);
        };
    return {
      formSubmit,
      addrArea,
      pwdArea,
      logo,
      headText,
      haveCloseTag,
      closeMethod,
      isOpen,
      getAddr,
      getPwd,
    };
  },
};
</script>

<style></style>
