import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "../views/MainPage.vue";
import LogInPage from "../views/LogInPage.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "main-page",
      component: MainPage,
    },
    {
      path: "/login",
      name: "log-in",
      component: LogInPage,
    },
  ],
});

// export default router;
