import { reactive } from "vue";

export const rank = reactive({
  volunteer: JSON.parse(sessionStorage.getItem("user"))
    ? JSON.parse(sessionStorage.getItem("user")).volunteerRank
    : "",
});

window.addEventListener("user-update", (e) => {
  rank.volunteer = e.detail.storage.volunteerRank;
});
