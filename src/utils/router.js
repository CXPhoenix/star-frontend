import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";
import { getUser } from "./api.js";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path === "/sign-in" || to.path === "/") {
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
    await getUser(signInInfo.accessToken);
    next();
  } catch (e) {
    console.log(e);
    next({ path: "/sign-in" });
  }
});

export default router;
