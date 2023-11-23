import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "首页",
        component: () => import("../pages/HomeView.vue"),
    },
    {
        path: "/login",
        name: "登录",
        component: () => import("../pages/Login.vue"),
    },
    {
        path: "/clockInfo",
        name: "打卡信息",
        component: () => import("../pages/ClockInfo.vue"),
    },
    {
        path: "/register",
        name: "注册",
        component: () => import("../pages/Register.vue"),
    },
    {
        path: "/mall",
        name: "积分商城",
        component: () => import("../pages/Mall.vue"),
    },
    {
        path: "/clockInfo/detailed/:id",
        name: "详细信息",
        component: () => import("../pages/DetailedClockInfo.vue"),
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
        path: "/userCenter",
        name: "个人中心",
        component: () => import("../pages/UserCenter.vue"),
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
