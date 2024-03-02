import { reactive } from "vue";

export const rank = reactive({
  volunteer: JSON.parse(sessionStorage.getItem("user"))
    ? JSON.parse(sessionStorage.getItem("user")).volunteerRank
    : "",
});

export const star = reactive({
  rank: JSON.parse(sessionStorage.getItem("user"))
    ? JSON.parse(sessionStorage.getItem("user")).applyDeptRank
    : "",
});

window.addEventListener("user-update", (e) => {
  rank.volunteer = e.detail.storage.volunteerRank;
});

window.addEventListener("star-update", (e) => {
  star.rank = e.detail.storage.applyDeptRank;
});
