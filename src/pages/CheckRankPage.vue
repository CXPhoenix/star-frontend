<template>
  <div class="h-screen w-screen space-y-2">
    <TopNavBar @signOut="signOut" />
    <div class="pl-3 pb-1 md:hidden">
      <button class="text-xl" @click="emits('prevPage', 'userPage')">
        <i class="fa-solid fa-house"></i>
      </button>
    </div>
    <div
      class="flex border-collapse flex-col items-center justify-center gap-y-4 md:h-[20rem] md:flex-row"
      v-if="!isLoading"
    >
      <div
        class="grid w-full border-collapse grid-cols-2 items-center justify-center gap-x-5 p-1 md:grid-cols-1 md:gap-x-2 md:p-0"
        v-for="val in userData"
        :key="val.id"
      >
        <span class="text-right text-xl md:text-center">
          {{ val.text }}
          <span class="md:hidden">：</span>
        </span>
        <span class="text-xl md:text-center">{{ datas[val.id] }}</span>
      </div>
    </div>
    <div
      class="flex items-center justify-end px-3 pt-5 pb-16 text-green-600 hover:text-green-800 md:justify-between md:px-10"
    >
      <button class="hidden md:block" @click="emits('prevPage', 'userPage')">
        <i class="fa-solid fa-house"></i>&nbsp;選單
      </button>
      <button @click="emits('nextPage', 'updateAspiredRankPage')">
        新增/修改預選志願學群&nbsp;<i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
  <LoadingModal v-if="isLoading" />
</template>

<script>
import TopNavBar from "../components/TopNavBar.vue";
import LoadingModal from "../componentSet/LoadingModal.vue";
import { ref, reactive } from "vue";
import { url } from "../utils";
export default {
  emits: ["signOut", "nextPage", "prevPage"],
  components: {
    TopNavBar,
    LoadingModal,
  },
  setup(props, { emit }) {
    const isLoading = ref(true);
    const signOut = () => {
      window.sessionStorage.clear();
      emit("signOut");
    };
    const emits = (eName, eData) => {
      emit(eName, eData);
    };
    if (!window.sessionStorage.getItem("authData")) signOut();
    const authDatas = JSON.parse(window.sessionStorage.getItem("authData"));
    const datas = reactive({
      examSignUpNum: "",
      username: "",
      schoolRank: "",
      schoolSeq: "",
      examChi: "",
      examEn: "",
      examMathA: "",
      examMathB: "",
      examMath: "",
      examSoc: "",
      examSci: "",
    });
    const userData = [
      {
        id: "examSignUpNum",
        text: "報名序號",
        value: ref(datas.examSignUpNum),
      },
      {
        id: "username",
        text: "姓名",
        value: ref(datas.username),
      },
      {
        id: "schoolRank",
        text: "校百分比",
        value: ref(datas.schoolRank),
      },
      {
        id: "examChi",
        text: "國文級分",
        value: ref(datas.examChi),
      },
      {
        id: "examMathA",
        text: "數A級分",
        value: ref(datas.examMathA),
      },
      {
        id: "examMathB",
        text: "數B級分",
        value: ref(datas.examMathB),
      },
      // {
      //   id: "examMath",
      //   text: "數學級分",
      //   value: ref(datas.examMath),
      // },
      {
        id: "examEn",
        text: "英文級分",
        value: ref(datas.examEn),
      },
      {
        id: "examSoc",
        text: "社會級分",
        value: ref(datas.examSoc),
      },
      {
        id: "examSci",
        text: "自然級分",
        value: ref(datas.examSci),
      },
      {
        id: "schoolSeq",
        text: "推薦順序",
        value: ref(datas.schoolSeq),
      },
    ];
    const headers = new Headers();
    headers.append("token", authDatas.token);
    headers.append("Content-type", "application/json");
    headers.append("Accept", "application/json");
    const infoUrl = new URL("./user/me", url);
    const fetchOptions = {
      headers,
      method: "GET",
    };
    if (!window.sessionStorage.getItem("userData")) {
      fetch(infoUrl, fetchOptions)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          signOut();
        })
        .then((data) => {
          isLoading.value = false;
          for (let key in data) {
            datas[key] = data[key];
          }
          authDatas.token = data.token;
          window.sessionStorage.setItem("authData", JSON.stringify(authDatas));
          window.sessionStorage.setItem("userData", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    } else {
      isLoading.value = false;
      const storedData = JSON.parse(window.sessionStorage.getItem("userData"));
      for (let key in datas) {
        datas[key] = storedData[key];
      }
    }

    return {
      signOut,
      isLoading,
      userData,
      datas,
      emits,
    };
  },
};
</script>

<style></style>
