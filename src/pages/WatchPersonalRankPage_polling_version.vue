<script setup>
import { reactive, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import Loading from "../components/Loading.vue";
import Model from "../components/Model.vue";

// import { wsUrl } from "../utils/api.js";

import { getApplyResultUrl } from "../utils/api";

const timeInterval = 5000;

const route = useRoute();
const router = useRouter();

const stuAccount = route.params.stuAccount;

const stuApplyData = reactive({
  value: {},
});

const polling = reactive({
  timeId: "",
});

const model = reactive({
  on: true,
});

const deptsApplyData = reactive({
  value: [],
  tableHeader: [
    "大學代碼",
    "大學名稱",
    "該大學已推薦數",
    "學群類別",
    "學群已推薦數",
    "報名狀況",
  ],
});

const dataShow = (fromApiData) => {
  // const allData = JSON.parse(fromApiData);
  const allData = fromApiData;
  let tempStuApplyData = [];
  let tempDeptApplyDatas = [];
  if (allData.updateStudentApplyData !== undefined) {
    tempStuApplyData = [...allData.updateStudentApplyData.result];
  }
  if (allData.stuApplyDatas !== undefined) {
    tempStuApplyData = [...allData.stuApplyDatas.result];
  }
  if (allData.updateDeptApplyData !== undefined) {
    tempDeptApplyDatas = [...allData.updateDeptApplyData];
  }
  if (allData.deptApplyDatas !== undefined) {
    tempDeptApplyDatas = [...allData.deptApplyDatas];
  }

  const afterFilter = tempStuApplyData.filter(
    (tad) => tad.account === stuAccount
  );

  if (afterFilter.length === 0) {
    router.push("/404");
  }

  stuApplyData.value = [...afterFilter][0];
  sessionStorage.setItem("stuApplyData", JSON.stringify(stuApplyData.value));

  tempDeptApplyDatas.forEach((tdad, i) => {
    const temp = [
      ...tempDeptApplyDatas.filter((d) => d.schoolId === tdad.schoolId),
    ];
    const schoolLimit = temp.length * 2;
    let schoolNowAppliedNumber = 0;
    temp.forEach((t) => {
      schoolNowAppliedNumber += t.studentsApplied.length;
    });
    tempDeptApplyDatas[i].schoolLimit = schoolLimit;
    tempDeptApplyDatas[i].schoolNowAppliedNumber = schoolNowAppliedNumber;
  });

  const afterFilterDept = [];
  stuApplyData.value.volunteerRank.forEach((vr) => {
    const i = tempDeptApplyDatas.findIndex(
      (tdad) =>
        tdad.schoolName === vr.schoolName &&
        tdad.deptCategory === vr.deptCategory
    );
    afterFilterDept.push(tempDeptApplyDatas[i]);
  });

  deptsApplyData.value = [...afterFilterDept];

  sessionStorage.setItem(
    "deptsApplyData",
    JSON.stringify(deptsApplyData.value)
  );
  model.on = false;
};

onMounted(async () => {
  const results = await getApplyResultUrl();
  polling.timeId = setInterval(() => {
    dataShow(results);
    console.log(`update at ${new Date()}`);
  }, timeInterval);
});

onUnmounted(() => {
  clearInterval(polling.timeId);
});

// onMounted(() => {
//   const ws = new WebSocket(wsUrl);
//   ws.onmessage = (e) => {
//     const allData = JSON.parse(e.data);
//     let tempStuApplyData = [];
//     let tempDeptApplyDatas = [];
//     if (allData.updateStudentApplyData !== undefined) {
//       tempStuApplyData = [...allData.updateStudentApplyData.result];
//     }
//     if (allData.stuApplyDatas !== undefined) {
//       tempStuApplyData = [...allData.stuApplyDatas.result];
//     }
//     if (allData.updateDeptApplyData !== undefined) {
//       tempDeptApplyDatas = [...allData.updateDeptApplyData];
//     }
//     if (allData.deptApplyDatas !== undefined) {
//       tempDeptApplyDatas = [...allData.deptApplyDatas];
//     }

//     const afterFilter = tempStuApplyData.filter(
//       (tad) => tad.account === stuAccount
//     );

//     if (afterFilter.length === 0) {
//       router.push("/404");
//     }

//     stuApplyData.value = [...afterFilter][0];
//     sessionStorage.setItem("stuApplyData", JSON.stringify(stuApplyData.value));

//     tempDeptApplyDatas.forEach((tdad, i) => {
//       const temp = [
//         ...tempDeptApplyDatas.filter((d) => d.schoolId === tdad.schoolId),
//       ];
//       const schoolLimit = temp.length * 2;
//       let schoolNowAppliedNumber = 0;
//       temp.forEach((t) => {
//         schoolNowAppliedNumber += t.studentsApplied.length;
//       });
//       tempDeptApplyDatas[i].schoolLimit = schoolLimit;
//       tempDeptApplyDatas[i].schoolNowAppliedNumber = schoolNowAppliedNumber;
//     });

//     const afterFilterDept = [];
//     stuApplyData.value.volunteerRank.forEach((vr) => {
//       const i = tempDeptApplyDatas.findIndex(
//         (tdad) =>
//           tdad.schoolName === vr.schoolName &&
//           tdad.deptCategory === vr.deptCategory
//       );
//       afterFilterDept.push(tempDeptApplyDatas[i]);
//     });

//     deptsApplyData.value = [...afterFilterDept];

//     sessionStorage.setItem(
//       "deptsApplyData",
//       JSON.stringify(deptsApplyData.value)
//     );
//     model.on = false;
//   };
// });
</script>

<template>
  <div class="mx-auto w-full max-w-4xl py-4 px-2 font-mono">
    <div class="grid grid-cols-6 items-stretch"></div>

    <div class="py-8">
      <!-- <div class="py-3">
        <input
          type="text"
          class="w-full rounded-md border-2 border-gray-400 py-2 pl-4 pr-2"
          v-model="deptsApplyData.searchText"
          @input="deptsApplyData.filterFunc"
          placeholder="可以根據大學代碼、大學名稱或學群類別進行搜尋..."
        />
      </div> -->
      <h3 class="pb-4 text-center text-2xl" v-if="stuApplyData.value.username">
        {{
          stuApplyData.value.schoolClass +
          stuApplyData.value.classSeat.toString().padStart(2, "0")
        }}
        {{ stuApplyData.value.username }}
        志願查詢
      </h3>
      <div class="grid grid-cols-6 items-center border-b-2 border-b-gray-500">
        <p
          class="p-1 text-center"
          v-for="(header, index) in deptsApplyData.tableHeader"
          :key="header + index.toString()"
        >
          {{ header }}
        </p>
      </div>
      <div
        class="grid grid-cols-6 items-center border-b-2 border-b-gray-300 pt-3 text-center"
        v-for="data in deptsApplyData.value"
        :key="data.account"
      >
        <p class="p-1">{{ data.schoolId }}</p>
        <p class="p-1">{{ data.schoolName }}</p>
        <p class="p-1">{{ data.schoolNowAppliedNumber }}</p>
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
            <span class="">{{
              stu.schoolClass + stu.classSeat.toString().padStart(2, "0")
            }}</span>
            <span class="">{{ stu.username }}</span>
            <span class="col-span-3">
              {{ data.schoolName }} 排序
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
  <div class="fixed top-2 left-4">
    <router-link to="/watch">
      <span class="text-xl text-black">
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
      </span>
    </router-link>
  </div>
</template>
