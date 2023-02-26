import Home from "../pages/Home.vue";
import Nav from "../components/Nav.vue";
import NotFound from "../pages/NotFound.vue";

export const routes = [
  {
    path: "/:pathMatch(.*)*",
    components: { default: NotFound },
  },
  {
    path: "/",
    components: { default: Home },
  },
];
