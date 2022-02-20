<script>
import { reactive, ref } from "@vue/reactivity";
import BasicInfoPage from "./pages/BasicInfoPage.vue";
import SignInPage from "./pages/SignInPage.vue";
import UserPage from "./pages/UserPage.vue";
import CheckRankPage from "./pages/CheckRankPage.vue";
import UpdateAspiredRankPage from "./pages/UpdateAspiredRankPage.vue";
import CheckRankApplyPage from "./pages/CheckRankApplyPage.vue";
import NotOpen from "./pages/NotOpen.vue";
export default {
  components: {
    BasicInfoPage,
    SignInPage,
    UserPage,
    CheckRankPage,
    UpdateAspiredRankPage,
    CheckRankApplyPage,
    NotOpen,
  },
  setup() {
    const pageController = reactive({
      basicInfoPage: true,
      signInPage: false,
      userPage: false,
      checkRankPage: false,
      updateAspiredRankPage: false,
      checkRankApplyPage: false,
      notOpen: false,
    });
    const openTime = {
      start: new Date("2022/2/1").getTime(),
      end: new Date("2022/3/5").getTime(),
    };
    const nowTime = new Date().getTime();
    loadPageStatus(pageController);
    window.addEventListener("popstate", (e) => {
      let preState;
      if (!e.state) {
        preState = loadPageStatus(pageController);
        window.history.pushState(preState, "");
        return;
      }
      preState = e.state;
      for (let page in pageController) {
        pageController[page] = preState[page];
      }
      savePageStatus(pageController);
    });

    const switchPage = (to) => {
      for (let page in pageController) {
        pageController[page] = false;
      }
      if (nowTime < openTime.start || nowTime > openTime.end) {
        pageController["notOpen"] = true;
        return;
      }
      pageController[to] = true;
      const pageState = savePageStatus(pageController);
      window.history.pushState(pageState, to);
    };

    if (nowTime < openTime.start || nowTime > openTime.end) {
      switchPage("notOpen");
    }

    if (window.sessionStorage.getItem("authData")) {
      const authDatas = JSON.parse(window.sessionStorage.getItem("authData"));
      if (authDatas.expired < new Date().getTime() / 1000) {
        window.sessionStorage.clear();
        switchPage("signInPage");
      }
    }
    return {
      pageController,
      switchPage,
    };
  },
};

/**
 *
 * @param {Object} pageController reactive object
 * Will save the page status in sessionStorage and history.state
 * @returns {Object} the page status object.
 */
function savePageStatus(pageController) {
  let pageStatus = {};
  for (let page in pageController) {
    pageStatus[page] = pageController[page];
  }
  window.sessionStorage.setItem("pageStatus", JSON.stringify(pageStatus));
  return pageStatus;
}

/**
 *
 * @param {Object} pageController reactive object
 * @returns {Object} page status
 */
function loadPageStatus(pageController) {
  if (window.sessionStorage.getItem("pageStatus")) {
    let pageStatus = JSON.parse(window.sessionStorage.getItem("pageStatus"));
    for (let page in pageController) {
      pageController[page] = pageStatus[page];
    }
    return pageStatus;
  }
}
</script>

<template>
  <BasicInfoPage
    v-if="pageController.basicInfoPage"
    @readInfoAlready="switchPage('signInPage')"
  />
  <SignInPage
    v-if="pageController.signInPage"
    @onSigninSuccess="switchPage('userPage')"
    @switchToInfo="switchPage('basicInfoPage')"
  />
  <UserPage
    v-if="pageController.userPage"
    @signOut="switchPage('signInPage')"
    @optionSwitch="switchPage"
  />
  <CheckRankPage
    v-if="pageController.checkRankPage"
    @signOut="switchPage('signInPage')"
    @nextPage="switchPage"
    @prevPage="switchPage"
  />
  <UpdateAspiredRankPage
    v-if="pageController.updateAspiredRankPage"
    @signOut="switchPage('signInPage')"
    @nextPage="switchPage"
    @prevPage="switchPage"
  />
  <CheckRankApplyPage
    v-if="pageController.checkRankApplyPage"
    @signOut="switchPage('signInPage')"
    @prevPage="switchPage"
  />
  <NotOpen v-if="pageController.notOpen" />
</template>

<style></style>
