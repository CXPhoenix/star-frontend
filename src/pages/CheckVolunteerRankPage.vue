<script setup>
import { reactive } from "vue";
import Alert from "../components/Alert.vue";
import Gap from "../components/Gap.vue";
import JumpPageButton from "../components/JumpPageButton.vue";
import Loading from "../components/Loading.vue";
import Model from "../components/Model.vue";
import VerticalButton from "../components/VerticalButton.vue";
import { getApplyPaperUrl } from "../utils/api";

const user = JSON.parse(window.sessionStorage.getItem("user"));
const volunteerRank = user.volunteerRank;

const loading = reactive({
  isFin: true,
  isAlert: true,
});

const alertContent = `如果沒有自動下載，請確認右上角的彈出視窗是否被封鎖。請將彈出視窗調整成允許，並在重新下載一次。
若是已經下載，則請略過此則提醒。
`;

const getApplyPaper = async () => {
  loading.isFin = false;
  const url = await getApplyPaperUrl();
  const a = document.createElement("a");
  a.href = url.applyPaperUrl;
  a.setAttribute("target", "_black");
  loading.isFin = true;
  a.click();
  loading.isAlert = false;
};

const dismissAlert = () => {
  loading.isAlert = true;
};
</script>

<template>
  <div class="mx-auto w-full max-w-2xl space-y-3 p-6 pt-10">
    <p class="text-center text-5xl" v-if="volunteerRank.length === 0">
      尚未選擇任何志願
    </p>
    <div
      class="grid w-full grid-cols-4 justify-items-stretch gap-4 border-b-2 text-center"
      v-if="volunteerRank.length > 0"
    >
      <p class="">志願序</p>
      <p class="">大學名稱</p>
      <p class="">學群類別</p>
      <p class="">合格代表學系</p>
    </div>
    <div class="max-h-[67vh] overflow-auto lg:max-h-[75vh]">
      <div
        class="grid w-full grid-cols-4 justify-items-stretch gap-x-4 border-b-2 sm:text-center"
        v-for="(vR, index) in volunteerRank"
        :key="vR.deptId"
      >
        <p class="">{{ index + 1 }}</p>
        <p class="">{{ vR.schoolName }}</p>
        <p class="">{{ vR.deptCategory }}</p>
        <p class="">{{ vR.deptName }}</p>
      </div>
    </div>
    <Gap />
    <VerticalButton
      bg-color="rgb(93, 210, 82)"
      class="w-full text-white"
      v-if="volunteerRank.length > 0"
      @click="getApplyPaper"
    >
      <span class="">
        <font-awesome-icon icon="fa-solid fa-print" />
      </span>
      <p class="">產生申請表</p>
    </VerticalButton>
  </div>
  <JumpPageButton position="left" content="回到目錄" />
  <Model v-if="!loading.isFin">
    <Loading />
  </Model>
  <Model v-if="!loading.isAlert">
    <Alert
      type="alert"
      title="下載被阻擋提醒"
      :content="alertContent"
      :check-activity="dismissAlert"
      class="mx-auto"
    />
  </Model>
</template>
