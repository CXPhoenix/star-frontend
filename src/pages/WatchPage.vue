<script setup>
import { reactive, onMounted } from "vue";

import Loading from "../components/Loading.vue";
import Model from "../components/Model.vue";

import VerticalButton from "../components/VerticalButton.vue";

import { wsUrl } from "../utils/api.js";

const model = reactive({
  on: true,
});

const stuApplyDatas = reactive({
  value: [],
  stuApplyShow: true,
  tableHeader: [
    "序號",
    "班級座號",
    "姓名",
    "被推薦大學",
    "被推薦學群",
    "代表系代碼",
    "代表系名稱",
  ],
  searchText: "",
  filterFunc: () => {
    stuApplyDatas.value = [
      ...JSON.parse(sessionStorage.getItem("stuApplyDatas")),
    ];
    stuApplyDatas.value = stuApplyDatas.value.filter(
      (sad) =>
        (sad.schoolClass + sad.classSeat.toString().padStart(2, "0")).search(
          stuApplyDatas.searchText
        ) !== -1 || sad.username.search(stuApplyDatas.searchText) !== -1
    );
  },
});

const deptApplyDatas = reactive({
  value: [],
  deptApplyShow: false,
  tableHeader: [
    "大學代碼",
    "大學名稱",
    "該大學已推薦數",
    "學群類別",
    "學群已推薦數",
    "報名狀況",
  ],
  searchText: "",
  filterFunc: () => {
    deptApplyDatas.value = [
      ...JSON.parse(sessionStorage.getItem("deptApplyDatas")),
    ];
    deptApplyDatas.value = deptApplyDatas.value.filter(
      (dad) =>
        dad.schoolId.search(deptApplyDatas.searchText) !== -1 ||
        dad.deptCategory.search(deptApplyDatas.searchText) !== -1 ||
        dad.schoolName.search(deptApplyDatas.searchText) !== -1
    );
  },
});

const switchShow = (switchTo) => {
  if (switchTo === "stu") {
    stuApplyDatas.stuApplyShow = true;
    deptApplyDatas.deptApplyShow = false;
    return;
  }
  stuApplyDatas.stuApplyShow = false;
  deptApplyDatas.deptApplyShow = true;
};

onMounted(() => {
  const ws = new WebSocket(wsUrl);
  ws.onmessage = (e) => {
    const allData = JSON.parse(e.data);
    console.log(allData);
    if (allData.updateStudentApplyData !== undefined) {
      stuApplyDatas.value = [...allData.updateStudentApplyData.result];
    }
    if (allData.stuApplyDatas !== undefined) {
      stuApplyDatas.value = [...allData.stuApplyDatas.result];
    }
    if (allData.updateDeptApplyData !== undefined) {
      deptApplyDatas.value = [...allData.updateDeptApplyData];
    }
    if (allData.deptApplyDatas !== undefined) {
      deptApplyDatas.value = [...allData.deptApplyDatas];
    }

    deptApplyDatas.value.forEach((dad, i) => {
      const temp = [
        ...deptApplyDatas.value.filter((d) => d.schoolId === dad.schoolId),
      ];
      const schoolLimit = temp.length * 2;
      let schoolNowAppliedNumber = 0;
      temp.forEach((t) => {
        schoolNowAppliedNumber += t.studentsApplied.length;
      });
      deptApplyDatas.value[i].schoolLimit = schoolLimit;
      deptApplyDatas.value[i].schoolNowAppliedNumber = schoolNowAppliedNumber;
    });

    sessionStorage.setItem(
      "stuApplyDatas",
      JSON.stringify(stuApplyDatas.value)
    );
    sessionStorage.setItem(
      "deptApplyDatas",
      JSON.stringify(deptApplyDatas.value)
    );
    stuApplyDatas.filterFunc();
    deptApplyDatas.filterFunc();
    model.on = false;
  };
});
</script>

<template>
  <div class="mx-auto w-full max-w-4xl py-4 px-2 font-mono">
    <div class="grid grid-cols-6 items-stretch">
      <VerticalButton
        bg-color="#58C9B9"
        class="col-span-3 rounded-none text-xl text-white md:text-3xl"
        :class="{
          'shadow-[0_10px_0_#248595]': !deptApplyDatas.deptApplyShow,
          'shadow-[0_5px_0_#248595]': deptApplyDatas.deptApplyShow,
          'translate-y-[5px]': deptApplyDatas.deptApplyShow,
        }"
        @click="switchShow('dept')"
      >
        大學推薦狀況
      </VerticalButton>
      <VerticalButton
        bg-color="#9055A2"
        class="col-span-3 rounded-none text-xl text-white shadow-[0_10px_0_#402270] md:text-3xl"
        :class="{
          'shadow-[0_10px_0_#402270]': !stuApplyDatas.stuApplyShow,
          'shadow-[0_5px_0_#402270]': stuApplyDatas.stuApplyShow,
          'translate-y-[5px]': stuApplyDatas.stuApplyShow,
        }"
        @click="switchShow('stu')"
      >
        學生推薦狀況
      </VerticalButton>
    </div>

    <div class="py-6" v-if="stuApplyDatas.stuApplyShow">
      <div class="py-3">
        <input
          type="text"
          class="w-full rounded-md border-2 border-gray-400 py-2 pl-4 pr-2"
          v-model="stuApplyDatas.searchText"
          @input="stuApplyDatas.filterFunc"
          placeholder="可以根據班級座號、姓名進行搜尋..."
        />
      </div>
      <div class="grid grid-cols-7 items-center border-b-2 border-b-gray-500">
        <p
          class="p-1 text-center"
          v-for="(header, index) in stuApplyDatas.tableHeader"
          :key="header + index.toString()"
        >
          {{ header }}
        </p>
      </div>
      <router-link
        :to="`/watch/${data.account}`"
        class="grid grid-cols-7 items-center border-b-2 border-b-gray-300 pt-4 text-center"
        v-for="data in stuApplyDatas.value"
        :key="data.account"
      >
        <p class="p-1">{{ data.applyRank }}</p>
        <p class="p-1">
          {{
            data.schoolClass.toString().padStart(3, "0") +
            data.classSeat.toString().padStart(2, "0")
          }}
        </p>
        <p class="p-1">{{ data.username }}</p>
        <p class="p-1">{{ data.applyResult.schoolName }}</p>
        <p class="p-1">{{ data.applyResult.deptCategory }}</p>
        <p class="p-1">{{ data.applyResult.deptId }}</p>
        <p class="p-1">{{ data.applyResult.deptName }}</p>
      </router-link>
    </div>

    <div class="py-6" v-if="deptApplyDatas.deptApplyShow">
      <div class="py-3">
        <input
          type="text"
          class="w-full rounded-md border-2 border-gray-400 py-2 pl-4 pr-2"
          v-model="deptApplyDatas.searchText"
          @input="deptApplyDatas.filterFunc"
          placeholder="可以根據大學代碼、大學名稱或學群類別進行搜尋..."
        />
      </div>
      <div class="grid grid-cols-6 items-center border-b-2 border-b-gray-500">
        <p
          class="p-1 text-center"
          v-for="(header, index) in deptApplyDatas.tableHeader"
          :key="header + index.toString()"
        >
          {{ header }}
        </p>
      </div>
      <div
        class="grid grid-cols-6 items-center border-b-2 border-b-gray-300 pt-3 text-center"
        v-for="data in deptApplyDatas.value"
        :key="data.account"
      >
        <p class="p-1">{{ data.schoolId }}</p>
        <p class="p-1">{{ data.schoolName }}</p>

        <p class="p-1" v-if="data.schoolNowAppliedNumber < data.schoolLimit">
          {{ data.schoolNowAppliedNumber }}
        </p>
        <p
          class="p-1 text-red-500"
          v-if="data.schoolNowAppliedNumber >= data.schoolLimit"
        >
          額滿
        </p>

        <p class="p-1">{{ data.deptCategory }}</p>

        <p class="p-1" v-if="data.studentsApplied.length < 2">
          {{ data.studentsApplied.length }}
        </p>
        <p class="p-1 text-red-500" v-if="data.studentsApplied.length >= 2">
          額滿
        </p>
        <p class="p-3">
          <label
            :for="data.schoolId + data.deptCategory"
            class="rounded-lg bg-green-700 p-1 text-xs text-white sm:text-base"
          >
            查看
          </label>
        </p>
        <input
          type="radio"
          :id="data.schoolId + data.deptCategory"
          name="studentApplied"
          class="peer hidden"
        />
        <div
          class="col-span-6 hidden justify-self-stretch border-t-2 border-t-gray-200 pt-2 peer-checked:block"
        >
          <p
            class="grid grid-cols-6 items-center text-center"
            v-for="(stu, index) in data.studentsApplied"
            :key="stu.schoolClass + stu.classSeat + stu.username"
          >
            <span class="">序號{{ index + 1 }}</span>
            <span class="">{{ stu.schoolClass + stu.classSeat }}</span>
            <span class="">{{ stu.username }}</span>
            <span class="col-span-3">
              {{ data.schoolName }}排序
              {{ stu.applyResult.applyDeptSeq }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <Model v-if="model.on">
    <Loading />
  </Model>
</template>
