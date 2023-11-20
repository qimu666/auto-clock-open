import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

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
        path: "/moguding",
        name: "工学云",
        component: () => import("../pages/MoGuDing.vue"),
    },
    {
        path: "/notice",
        name: "消息通知",
        component: () => import("../pages/Notice.vue"),
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
