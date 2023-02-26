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

export const routes = [
  {
    path: "/:pathMatch(.*)*",
    components: { default: NotFound },
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
];
