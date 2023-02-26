import Home from "../pages/Home.vue";
import Nav from "../components/Nav.vue";
import NotFound from "../pages/NotFound.vue";
import SignInPage from "../pages/SignInPage.vue";
import MenuPage from "../pages/MenuPage.vue";
import UserPage from "../pages/UserPage.vue";

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
    path: "/menu",
    components: { default: MenuPage, Nav },
  },
  {
    path: "/user",
    components: { default: UserPage, Nav },
  },
];
