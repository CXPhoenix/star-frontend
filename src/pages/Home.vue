<script setup>
import logo from "../assets/celebrate-70-logo.png";
import Gap from "../components/Gap.vue";
import VerticalButton from "../components/VerticalButton.vue";
</script>

<template>
  <div
    class="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-16 p-8 pt-12"
  >
    <div class="flex items-center justify-center gap-3">
      <img :src="logo" alt="logo" class="h-[18vw] max-h-36" />
      <h1 class="flex flex-col items-center justify-center gap-2 sm:gap-[3vw]">
        <span class="text-2xl sm:text-[4vw]">臺北市立復興高中</span>
        <span class="text-xl sm:text-[3vw]">大學繁星推薦系統</span>
      </h1>
    </div>
    <p class="text-xl">
      本系統提供同學【 報名前欲選志願學群
      】使用，僅供參考佐證，同學仍應自行查核各項推薦條件。
    </p>
    <div class="flex flex-col items-start justify-center gap-5">
      <h2 class="w-full text-center text-2xl">使用說明</h2>
      <div class="text-lg">
        <h3 class="font-bold">查詢推薦順序</h3>
        <p class="">
          查詢你的成績以及推薦順序，如有錯誤請立即系統管理師聯繫 (02-28914131
          #641)
        </p>
      </div>
      <div class="text-lg">
        <h3 class="font-bold">新增/修改預選志願學群</h3>
        <p class="">
          選擇學群學系時請特別注意，不要弄錯。最重要的是，每次做完請務必按下【
          儲存志願 】按鈕
        </p>
      </div>
      <div class="text-lg">
        <h3 class="font-bold">確認/列印預選志願學群</h3>
        <p class="">
          確認時請特別核對你的學群都有上去。當按下【 產生申請表
          】按鈕後，系統會幫你自動生成 pdf 檔案格式的報名表。
        </p>
        <p class="">
          ＊特別提醒：本系統提供【 報名表自動生成
          】服務，並非完成報名手續，請務必將報名表繳交至教務處進行報名！
        </p>
      </div>
    </div>
    <router-link to="/sign-in" class="w-full">
      <VerticalButton bgColor="#13da32" class="w-full">
        <p class="text-white">我知道了！</p>
      </VerticalButton>
    </router-link>
  </div>
  <Gap />
</template>
