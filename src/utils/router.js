import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";
import { getUser } from "./api.js";
import { rank } from "./status";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith("/watch")) {
    next();
    return;
  }

  if (to.path === "/sign-in" || to.path === "/" || to.path === "/404") {
    next();
    return;
  }

  let signInInfo = window.localStorage.getItem("signIn");
  if (!signInInfo) {
    next({ path: "/sign-in" });
    return;
  }
  signInInfo = JSON.parse(signInInfo);
  if (!signInInfo.accessToken) {
    next({ path: "/sign-in" });
    return;
  }
  try {
    const user = await getUser(signInInfo.accessToken);
    next();
  } catch (e) {
    console.log(e);
    next({ path: "/sign-in" });
  }
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default router;
