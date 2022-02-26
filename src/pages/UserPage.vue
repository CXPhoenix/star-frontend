<template>
  <div class="h-screen w-screen space-y-10">
    <TopNavBar @signOut="signOut" />
    <div class="flex flex-col items-center gap-10 px-3">
      <button
        class="w-full rounded-md bg-gradient-to-b from-gray-100 to-gray-400 py-2 text-xl shadow-lg duration-100 hover:shadow-2xl sm:w-9/12 md:w-7/12 md:hover:scale-110"
        v-for="(value, key) in options"
        :key="key"
        @click="optionSwitch(key)"
      >
        {{ value }}
      </button>
    </div>
  </div>
  <LoadingModal v-if="isLoading" />
</template>

<script>
import TopNavBar from "../components/TopNavBar.vue";
import LoadingModal from "../componentSet/LoadingModal.vue";
import { ref } from "vue";
import { url } from "../utils";
export default {
  components: {
    TopNavBar,
    LoadingModal,
  },
  emits: ["signOut", "optionSwitch"],
  setup(props, { emit }) {
    const signOut = () => {
      window.sessionStorage.clear();
      emit("signOut");
    };
    if (isExpired()) {
      signOut();
    }
    const isLoading = ref(true);
    const options = {
      checkRankPage: "查詢推薦順序",
      updateAspiredRankPage: "新增/修改預選志願學群",
      checkRankApplyPage: "瀏覽/列印預選志願學群",
      class8ValidsPage: "檢視合格的第八學群學系",
    };

    const optionSwitch = (page) => {
      emit("optionSwitch", page);
    };
    const authDatas = JSON.parse(window.sessionStorage.getItem("authData"));
    const datas = {
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
      validDept: [],
    };
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
          for (let key in data) {
            datas[key] = data[key];
          }
          authDatas.token = data.token;
          window.sessionStorage.setItem("authData", JSON.stringify(authDatas));
          window.sessionStorage.setItem("userData", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    }
    isLoading.value = false;

    return {
      signOut,
      options,
      isLoading,
      optionSwitch,
    };
  },
};

function isExpired() {
  const datas = JSON.parse(window.sessionStorage.getItem("authData"));
  const now = new Date().getTime() / 1000;
  if (datas && now < datas.expired) return false;
  return true;
}
</script>

<style></style>
