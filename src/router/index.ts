import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "首页",
    component: () => import("../pages/HomeView.vue"),
  },
  {
    path: "/mall",
    name: "积分商城",
    component: () => import("../pages/Mall.vue"),
  },
  {
    path: "/agent",
    name: "代理",
    component: () => import("../pages/Agent.vue"),
  },
  {
    path: "/about",
    name: "我的",
    component: () => import("../pages/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
