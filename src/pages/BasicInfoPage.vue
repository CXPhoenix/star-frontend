<template>
  <div
    class="h-screen w-screen space-y-6 py-3 sm:mx-auto sm:w-[30rem] md:mx-auto md:w-8/12"
  >
    <div class="flex items-center justify-center gap-x-3 px-4 py-6">
      <img :src="fhshLogo" alt="復興高中" class="w-[5rem]" />
      <h1
        class="flex flex-col items-center justify-center gap-y-2 text-3xl md:text-4xl"
      >
        <span class="block">臺北市立復興高中</span>
        <span class="block md:text-3xl">大學繁星推薦系統</span>
      </h1>
    </div>
    <div class="flex flex-col items-center justify-center gap-y-3 px-4">
      <p class="indent-[2.5rem] text-lg">
        本系統提供同學[報名前預選志願學群]使用,
        本系統僅供參考佐證,同學仍應自行查核各項推薦條件。
      </p>
      <!-- <div class="flex flex-col items-center justify-center gap-y-3 p-2">
        <h2 class="text-2xl font-bold">使用流程圖</h2>
        <div class="">
          <img src="" alt="使用流程圖" class="block h-auto w-10/12" />
        </div>
      </div> -->
    </div>
    <div class="flex flex-col items-center justify-center gap-3 p-2 md:gap-10">
      <h2 class="text-2xl font-bold">使用說明</h2>
      <div class="md:w-8/12">
        <h3 class="text-xl font-semibold">查詢推薦順序</h3>
        <p class="">
          查詢你的成績以及推薦順序，如有錯誤請立即與系統管理師聯繫 (02-2891-4131
          #641)
        </p>
      </div>
      <div class="md:w-8/12">
        <h3 class="text-xl font-semibold">新增/修改預選志願學群</h3>
        <p class="">
          選擇學群學系時請特別注意，不要弄錯。最重要的是，每次做完請記得按下【儲存志願】
        </p>
      </div>
      <div class="md:w-8/12">
        <h3 class="text-xl font-semibold">瀏覽/列印預選志願學群</h3>
        <p class="">
          瀏覽時請對一下你的學群都有上去，請小心！按下【產生申請表】按鈕後，系統會幫你生成
          pdf 檔案報名表，請特別留意！
        </p>
        <p class="mt-8 text-lg font-black md:text-center">
          ＊特別提醒：本系統提供【報名表自動生成】服務，並非完成報名手續！請多加留意！
        </p>
      </div>
    </div>
    <div class="px-3 py-3 text-center">
      <button
        class="w-full cursor-pointer rounded-lg bg-green-500 py-2 text-center text-xl text-white hover:bg-green-600 md:w-8/12"
        @click="readInfoAlready"
      >
        我知道了！
      </button>
    </div>
  </div>
</template>

<script>
import { getImage } from "../utils";
export default {
  setup(props, { emit }) {
    const fhshLogo = getImage("fhshLOGO.png");
    const readInfoAlready = () => {
      emit("readInfoAlready");
    };
    return { fhshLogo, readInfoAlready };
  },
};
</script>

<style></style>
