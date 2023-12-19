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
        name: "信息中台",
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
        path: "/update",
        name: "修改信息",
        component: () => import("../pages/UpdateMoGuDing.vue"),
    },
    {
        path: "/system",
        name: "系统管理",
        component: () => import("../pages/System.vue"),
    },
    {
        path: "/coinChange",
        name: "积分变更",
        component: () => import("../pages/CoinChange.vue"),
    },
    {
        path: "/mall_management",
        name: "商城管理",
        component: () => import("../pages/MallManagement.vue"),
    },
    {
        path: "/platform_management",
        name: "平台管理",
        component: () => import("../pages/PlatformManagement.vue"),
    },
    {
        path: "/add_platform",
        name: "添加平台",
        component: () => import("../pages/AddPlatform.vue"),
    },
    {
        path: "/coin_detail",
        name: "积分明细",
        component: () => import("../pages/CoinDetail.vue"),
    },
    {
        path: "/update_platform",
        name: "更新平台",
        component: () => import("../pages/UpdatePlatform.vue"),
    },
    {
        path: "/mall_update",
        name: "修改积分规格",
        component: () => import("../pages/UpdateMall.vue"),
    },
    {
        path: "/add_mall",
        name: "修改积分规格",
        component: () => import("../pages/AddMall.vue"),
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
