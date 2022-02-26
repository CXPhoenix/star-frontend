<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-between gap-y-2 pt-2 md:justify-center"
  >
    <SignInForm
      :logo="image"
      :title="title"
      :description="description"
      :formSubmit="formSubmit"
    />
    <div
      class="flex w-full items-center justify-between px-2 py-2 md:w-[26rem]"
    >
      <a
        class="cursor-pointer text-blue-600 hover:text-blue-800"
        @click.prevent="switchToInfo"
      >
        系統使用說明
      </a>
      <p class="">有問題請聯繫資訊組 #641</p>
    </div>
    <Modal v-if="isAlert" @closeModal="closeModal" :noCloseFunction="isSignIn">
      <AlertFrame :isButton="true" @onClose="alertContent.action">
        <template v-slot:header>{{ alertContent.title }}</template>
        {{ alertContent.description }}
      </AlertFrame>
    </Modal>
    <LoadingModal v-if="isLoading" />
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import SignInForm from "../components/SignInForm.vue";
import Modal from "../components/Modal.vue";
import AlertFrame from "../components/AlertFrame.vue";
import LoadingModal from "../componentSet/LoadingModal.vue";
import { getImage, url } from "../utils.js";

export default {
  name: "SignInPage",
  components: {
    SignInForm,
    Modal,
    AlertFrame,
    LoadingModal,
  },
  setup(props, { emit }) {
    const isSignIn = ref(false);
    const image = getImage("fhshLOGO.png");
    const title = "登入";
    const description = "登入以繼續使用繁星系統";
    const isAlert = ref(false);
    const isLoading = ref(false);
    const alertContent = reactive({
      title: "帳號密碼錯誤",
      description: "輸入的帳號密碼有誤，請重新更正",
      action: () => {
        isAlert.value = false;
        if (isSignIn.value) emit("onSigninSuccess");
      },
    });
    const switchToInfo = () => {
      emit("switchToInfo");
    };

    const authURL = new URL("./auth/", url);
    // console.log(authURL);
    const formSubmit = (addr, pwd) => {
      if (addr === "" || pwd === "") {
        isAlert.value = true;
        alertContent.title = "請輸入帳號密碼";
        alertContent.description = "請務必輸入您的帳號與密碼！";
        return;
      }
      isLoading.value = true;
      const fetchOptions = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          addr: addr,
          pwd: pwd,
        }),
        method: "POST",
      };
      fetch(authURL, fetchOptions)
        .then((res) => {
          isLoading.value = false;
          if (res.ok) {
            return res.json();
          }
          if (res.status === 401) {
            alertContent.title = "帳號密碼錯誤";
            alertContent.description = "輸入的帳號密碼有誤，請重新更正";
          }
          if (res.status === 403) {
            alertContent.title = "登入錯誤";
            alertContent.description = "無法使用繁星系統，請洽管理人員！";
          }
          isAlert.value = true;
        })
        .then((datas) => {
          if (!isAlert.value) {
            alertContent.title = "成功登入";
            alertContent.description = "歡迎您登入繁星系統！";
            isAlert.value = true;
            isSignIn.value = true;
            datas.addr = addr;
            window.sessionStorage.setItem("authData", JSON.stringify(datas));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const closeModal = () => {
      isAlert.value = false;
    };

    return {
      image,
      title,
      description,
      formSubmit,
      isAlert,
      isLoading,
      isSignIn,
      alertContent,
      closeModal,
      switchToInfo,
    };
  },
};
</script>

<style scoped></style>
