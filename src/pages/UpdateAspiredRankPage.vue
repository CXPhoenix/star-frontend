<template>
  <div class="h-screen w-screen space-y-6">
    <TopNavBar @signOut="signOut" />
    <div class="pl-3 pb-1 md:hidden">
      <button class="text-xl" @click="changePage('prevPage', 'userPage')">
        <i class="fa-solid fa-house"></i>
      </button>
    </div>
    <div
      class="flex items-center justify-between py-2 px-3 sm:w-11/12 sm:justify-end sm:gap-x-5"
    >
      <button
        class="rounded-lg bg-gradient-to-b from-blue-300 to-blue-600 py-2 px-3 text-gray-200 shadow md:hover:scale-105"
        @click="addRankingDataModal"
      >
        <i class="fa-solid fa-plus"></i>&nbsp;增加志願
      </button>
      <button
        class="rounded-lg bg-gradient-to-b from-green-300 to-green-600 py-2 px-3 text-gray-200 shadow disabled:from-gray-300 disabled:to-gray-600 md:hover:scale-105 md:disabled:scale-100"
        :disabled="isSaved"
        @click="saveRanking"
      >
        <i class="fa-solid fa-floppy-disk"></i>&nbsp;儲存志願
      </button>
    </div>
    <div class="mx-auto flex w-11/12 items-center justify-center px-2">
      <table class="table-auto text-center md:w-8/12">
        <thead>
          <tr class="border-2">
            <th class="border-2 px-2 py-1">志願序</th>
            <th class="border-2 px-2 py-1">學校名稱</th>
            <th class="border-2 px-2 py-1">學群類別</th>
            <th class="border-2 px-2 py-1">學系代碼</th>
            <th class="border-2 px-2 py-1">學系名稱</th>
            <th class="" v-if="rankingDatas.length > 0"></th>
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
            <td class="border-2 px-2 py-1">{{ data.deptName }}</td>
            <td
              class="flex flex-col items-center justify-center gap-2 px-2 py-1"
            >
              <button
                class="rounded-lg bg-yellow-400 p-2"
                @click="updateRanking(index)"
              >
                修改
              </button>
              <button
                class="rounded-lg bg-red-500 p-2"
                @click="deleteRanking(index)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="flex items-center justify-end px-3 pt-5 pb-16 text-green-600 hover:text-green-800 md:justify-between md:px-10"
    >
      <button
        class="hidden md:block"
        @click="changePage('prevPage', 'userPage')"
      >
        <i class="fa-solid fa-house"></i>&nbsp;選單
      </button>
      <button @click="changePage('nextPage', 'checkRankApplyPage')">
        瀏覽預選志願學群&nbsp;<i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
  <Modal @closeModal="closeAddModal" v-if="isAddModalOpen">
    <div
      class="max-h-[80vh] w-full space-y-3 overflow-y-auto rounded-md bg-white py-3 px-2"
    >
      <p class="text-center">新增志願</p>
      <label for="" class="relative my-2 w-full p-2">
        <button
          class="absolute top-4 right-4 h-full select-none p-1 outline-none focus:border-0"
          aria-label="搜尋志願 search departments"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          class="w-full rounded-md border-[1px] border-gray-600 py-2 px-2"
          placeholder="搜尋學系代碼或學系名稱"
          aria-label="搜尋學系代碼或學系名稱"
          v-model="searchString"
          @input="searchInput"
        />
      </label>
      <div class="h-full w-full space-y-4">
        <div
          class="h-full w-full space-y-2"
          v-for="data in deptDatas"
          :key="data._id"
        >
          <p
            class="cursor-pointer py-2 hover:bg-gray-200"
            @click="addRankingData(data)"
          >
            {{ data.deptId }}&nbsp;{{ data.deptClassName }}&nbsp;{{
              data.schoolName
            }}{{ data.deptName }}
          </p>
        </div>
      </div>
    </div>
  </Modal>
  <LoadingModal v-if="isLoading" />
  <Modal v-if="isSaveAlert">
    <AlertFrame></AlertFrame>
  </Modal>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import TopNavBar from "../components/TopNavBar.vue";
import Modal from "../components/Modal.vue";
import AlertFrame from "../components/AlertFrame.vue";
import LoadingModal from "../componentSet/LoadingModal.vue";
import { url } from "../utils";
export default {
  emits: ["signOut", "prevPage", "nextPage"],
  components: {
    TopNavBar,
    Modal,
    AlertFrame,
    LoadingModal,
  },
  setup(props, { emit }) {
    const isAddModalOpen = ref(false);
    const isCreate = ref(true);
    const updateRankingIndex = ref(-1);
    const isLoading = ref(true);
    const isSaved = ref(false);
    const isSaveAlert = ref(false);
    const checkUnSaved = ref(false);
    const emits = (eName, eData) => {
      emit(eName, eData);
    };
    const changePage = (event, page) => {
      if (!isSaved.value) {
        if (window.confirm("你還沒有儲存志願，確定離開嗎？")) {
          emit(event, page);
        }
        return;
      }
      emit(event, page);
    };
    const signOut = () => {
      window.sessionStorage.clear();
      emit("signOut");
    };
    const closeAddModal = () => {
      isAddModalOpen.value = false;
    };
    const storeRanking = (rankings) => {
      const tempUserData = JSON.parse(
        window.sessionStorage.getItem("userData")
      );
      tempUserData["userRankings"] = rankings;
      window.sessionStorage.setItem("userData", JSON.stringify(tempUserData));
    };
    const addRankingDataModal = () => {
      isAddModalOpen.value = true;
      isSaved.value = false;
      deptDatas.value = [
        ...JSON.parse(window.sessionStorage.getItem("deptDatas")),
      ];
      deptDatas.value = [
        ...deptDatas.value.filter(
          (item) => !rankingDatas.value.find((i) => i.deptId == item.deptId)
        ),
      ];
      isCreate.value = true;
    };
    const rankingDatas = ref([]);
    if (JSON.parse(window.sessionStorage.getItem("userData")).userRankings) {
      rankingDatas.value = [
        ...JSON.parse(window.sessionStorage.getItem("userData")).userRankings,
      ];
    }
    const addRankingData = (dataObject) => {
      if (!isCreate.value) {
        rankingDatas.value.splice(updateRankingIndex.value, 1, {
          schoolId: dataObject.schoolId,
          schoolName: dataObject.schoolName,
          deptClassName: dataObject.deptClassName,
          deptId: dataObject.deptId,
          deptName: dataObject.deptName,
        });
        closeAddModal();
        storeRanking(rankingDatas.value);
        return;
      }
      rankingDatas.value.push({
        schoolId: dataObject.schoolId,
        schoolName: dataObject.schoolName,
        deptClassName: dataObject.deptClassName,
        deptId: dataObject.deptId,
        deptName: dataObject.deptName,
      });
      closeAddModal();
      storeRanking(rankingDatas.value);
    };
    const searchString = ref("");
    const searchInput = () => {
      deptDatas.value = [
        ...JSON.parse(window.sessionStorage.getItem("deptDatas")),
      ];
      deptDatas.value = [
        ...deptDatas.value.filter(
          (item) => !rankingDatas.value.find((i) => i.deptId == item.deptId)
        ),
      ];
      deptDatas.value = [
        ...deptDatas.value.filter(
          (item) =>
            item.schoolId.search(searchString.value) != -1 ||
            item.schoolName.search(searchString.value) != -1 ||
            item.deptClassName.search(searchString.value) != -1 ||
            item.deptId.search(searchString.value) != -1 ||
            item.deptName.search(searchString.value) != -1
        ),
      ];
    };
    const deleteRanking = (index) => {
      isSaved.value = false;
      rankingDatas.value.splice(index, 1);
      storeRanking(rankingDatas.value);
    };
    const updateRanking = (index) => {
      isSaved.value = false;
      updateRankingIndex.value = index;
      isCreate.value = false;
      isAddModalOpen.value = true;
      storeRanking(rankingDatas.value);
    };
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "application/json");
    const fetchOptions = {
      headers: headers,
      method: "GET",
    };
    const userDatas = JSON.parse(window.sessionStorage.getItem("userData"));
    const deptIds = userDatas.validDept;
    const stringIds = deptIds.join("_");
    const deptInfoUrl = new URL(`./dept/${stringIds}`, url);
    const deptDatas = ref([]);
    if (!window.sessionStorage.getItem("deptDatas")) {
      fetch(deptInfoUrl, fetchOptions)
        .then((res) => {
          if (res.ok) {
            isLoading.value = false;
            return res.json();
          }
          signOut();
        })
        .then((datas) => {
          deptDatas.value = [...datas];
          window.sessionStorage.setItem("deptDatas", JSON.stringify(datas));
        })
        .catch((e) => console.log(e));
    } else {
      isLoading.value = false;
      deptDatas.value = [
        ...JSON.parse(window.sessionStorage.getItem("deptDatas")),
      ];
    }
    const saveRanking = () => {
      try {
        isSaved.value = true;
        isLoading.value = true;
        const saveRankingURL = new URL("./saveRanking/", url);
        const authData = JSON.parse(window.sessionStorage.getItem("authData"));
        const headers = new Headers();
        headers.append("token", authData.token);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        const fetchOptions = {
          headers,
          body: JSON.stringify({
            userId: authData.addr,
            userRankings: JSON.parse(window.sessionStorage.getItem("userData"))
              .userRankings,
          }),
          method: "POST",
        };
        fetch(saveRankingURL, fetchOptions)
          .then((res) => {
            isLoading.value = false;
            if (res.ok) {
              return res.json();
            }
            if (!res.ok) {
              alert("伺服器可能產生了一些問題，請跟管理人員連繫！");
              throw Error;
            }
          })
          .then((data) => {
            const tempAuth = JSON.parse(
              window.sessionStorage.getItem("authData")
            );
            tempAuth.token = data.token;
            window.sessionStorage.setItem("authData", JSON.stringify(tempAuth));
            window.sessionStorage.setItem("userData", JSON.stringify(data));
            alert("儲存成功！");
          })
          .catch((e) => {
            console.log(e);
            signOut();
          });
      } catch (e) {
        console.log(e);
      }
    };
    return {
      emits,
      signOut,
      changePage,
      rankingDatas,
      isAddModalOpen,
      closeAddModal,
      addRankingDataModal,
      isLoading,
      deptDatas,
      addRankingData,
      searchString,
      searchInput,
      deleteRanking,
      updateRanking,
      isSaved,
      isSaveAlert,
      saveRanking,
    };
  },
};
</script>

<style scoped></style>
