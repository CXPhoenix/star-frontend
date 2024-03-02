import Home from "../pages/Home.vue";
import Nav from "../pages/Nav.vue";
import NotFound from "../pages/NotFound.vue";
import SignInPage from "../pages/SignInPage.vue";
import MenuPage from "../pages/MenuPage.vue";
import UserPage from "../pages/UserPage.vue";
import ApplyVolunteerRankPage from "../pages/ApplyVolunteerRankPage.vue";
import CheckVolunteerRankPage from "../pages/CheckVolunteerRankPage.vue";
import CheckValidDept8Page from "../pages/CheckValidDept8Page.vue";
import ApplyVolunteerPage from "../pages/ApplyVolunteerPage.vue";
import WatchPage_polling_version from "../pages/WatchPage_polling_version.vue";
import WatchPersonalRankPage_polling_version from "../pages/WatchPersonalRankPage_polling_version.vue";
import ApplyValidRankPage from "../pages/ApplyValidRankPage.vue";
import ApplyValidPage from "../pages/ApplyValidPage.vue";

export const routes = [
  {
    path: "/:pathMatch(.*)*",
    components: { default: NotFound },
    alias: "/404",
  },
  {
    path: "/",
    components: { default: Home },
  },
  {
    path: "/sign-in",
    components: { default: SignInPage },
  },
  {
    path: "/user/menu",
    components: { default: MenuPage, Nav },
  },
  {
    path: "/user/user",
    components: { default: UserPage, Nav },
  },
  {
    path: "/user/apply-volunteer",
    components: { default: ApplyVolunteerRankPage, Nav },
  },
  {
    path: "/user/check-volunteer",
    components: { default: CheckVolunteerRankPage, Nav },
  },
  {
    path: "/user/valid-dept8",
    components: { default: CheckValidDept8Page, Nav },
    alias: "/user/valid-dept8",
  },
  {
    path: "/apply",
    component: ApplyVolunteerPage,
  },
  {
    path: "/watch",
    components: { default: WatchPage_polling_version, Nav },
  },
  {
    path: "/watch/:stuAccount",
    component: WatchPersonalRankPage_polling_version,
  },
  {
    path: "/user/apply-star-rank",
    components: { default: ApplyValidRankPage, Nav },
  },
  {
    path: "/apply-star",
    component: ApplyValidPage,
  },
];
