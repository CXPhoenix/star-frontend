<template>
  <div class="h-screen w-screen">
    <TopNavBar @signOut="signOut" />
    <div class="pl-3 pb-1 pt-4 md:hidden">
      <button class="text-xl" @click="emits('prevPage', 'userPage')">
        <i class="fa-solid fa-house"></i>
      </button>
    </div>
    <div class="flex items-center justify-center py-4 px-1">
      <table class="table-auto">
        <thead>
          <tr class="border-2">
            <th class="border-2 px-2 py-1">志願序</th>
            <th class="border-2 px-2 py-1">大學名稱</th>
            <th class="border-2 px-2 py-1">學群類別</th>
            <th class="border-2 px-2 py-1">合格代表學系</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-2"
            v-for="(data, index) in rankingDatas"
            :key="data.deptId"
          >
            <td class="border-2 px-2 py-1 text-center">{{ index + 1 }}</td>
            <td class="border-2 px-2 py-1">{{ data.schoolName }}</td>
            <td class="border-2 px-2 py-1">{{ data.deptClassName }}</td>
            <td class="border-2 px-2 py-1">{{ data.deptId }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-center py-5">
      <button
        class="md:1/3 w-10/12 rounded-lg bg-green-700 py-2 text-white sm:w-1/2"
        @click="getApplyPaper"
      >
        產生申請表
      </button>
    </div>
    <div
      class="flex items-center justify-end px-3 pt-5 pb-16 text-green-600 hover:text-green-800 md:justify-between md:px-10"
    >
      <button class="hidden md:block" @click="emits('prevPage', 'userPage')">
        <i class="fa-solid fa-house"></i>&nbsp;選單
      </button>
    </div>
  </div>
  <LoadingModal v-if="isLoading" />
</template>

<script>
import { ref } from "vue";
import TopNavBar from "../components/TopNavBar.vue";
import LoadingModal from "../componentSet/LoadingModal.vue";
import { url } from "../utils";
export default {
  components: {
    TopNavBar,
    LoadingModal,
  },
  emits: ["signOut", "prevPage"],
  setup(props, { emit }) {
    const rankingDatas = ref([]);
    const isLoading = ref(true);
    const emits = (event, data) => {
      emit(event, data);
    };
    const signOut = () => {
      window.sessionStorage.clear();
      emit("signOut");
    };
    const getApplyPaper = () => {
      isLoading.value = true;
      try {
        const authData = JSON.parse(window.sessionStorage.getItem("authData"));
        const headers = new Headers();
        headers.append("token", authData.token);
        headers.append("Content-type", "application/json");
        headers.append("Accept", "application/json");
        const fetchOptions = {
          headers,
          body: JSON.stringify({
            userId: authData.addr,
            rankingDatas: rankingDatas.value,
          }),
          method: "POST",
        };
        const applyPaperRequestURL = new URL("./applyPaper/", url);
        fetch(applyPaperRequestURL, fetchOptions)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            alert("系統產生了一些問題，請洽管理員！");
            throw Error();
          })
          .then((data) => {
            isLoading.value = false;
            authData.token = data.token;
            window.sessionStorage.setItem("authData", JSON.stringify(authData));
            const a = document.createElement("a");
            a.target = "_top";
            a.href = data.applyPaperURL;
            a.click();
          })
          .catch((e) => {
            console.log(e);
            signOut();
          });
      } catch (e) {
        console.log(e);
        alert("系統出現了一些問題，請聯繫管理員！");
      }
    };
    try {
      const userData = JSON.parse(window.sessionStorage.getItem("userData"));
      const userRankings = userData.userRankings;
      userRankings.forEach((userRanking) => {
        if (
          rankingDatas.value.find(
            (element) =>
              element.schoolId === userRanking.schoolId &&
              element.deptClassName === userRanking.deptClassName
          )
        ) {
          return;
        }
        rankingDatas.value.push(userRanking);
        isLoading.value = false;
      });
    } catch (e) {
      console.log(e);
      alert("系統出現異常問題，請聯繫管理人員！");
      // signOut();
    }
    return {
      signOut,
      emits,
      isLoading,
      rankingDatas,
      getApplyPaper,
    };
  },
};
</script>

<style lang="scss" scoped></style>
