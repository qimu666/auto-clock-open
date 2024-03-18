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
        component: () => import("../pages/user/Login.vue"),
    },
    {
        path: "/clockInfo",
        name: "信息中台",
        component: () => import("../pages/ClockInfo.vue"),
    },
    {
        path: "/register",
        name: "注册",
        component: () => import("../pages/user/Register.vue"),
    },
    {
        path: "/mall",
        name: "积分商城",
        component: () => import("../pages/mall/Mall.vue"),
    },
    {
        path: "/moguding",
        name: "工学云",
        component: () => import("../pages/platform/gxy/MoGuDing.vue"),
    },
    {
        path: "/zxjy",
        name: "职校家园",
        component: () => import("../pages/platform/zxjy/ZXJY.vue"),
    },
    {
        path: "/gxy/update",
        name: "修改信息-工学云",
        component: () => import("../pages/platform/gxy/UpdateMoGuDing.vue"),
    },
    {
        path: "/zxjy/update",
        name: "修改信息-职校家园",
        component: () => import("../pages/platform/zxjy/UpdateZXJY.vue"),
    },
    {
        path: "/system",
        name: "系统管理",
        component: () => import("../pages/system/System.vue"),
    },
    {
        path: "/transferCoin",
        name: "积分转账",
        component: () => import("../pages/coin/TransferCoin.vue"),
    },
    {
        path: "/coinChange",
        name: "积分变更",
        component: () => import("../pages/coin/CoinChange.vue"),
    }, {
        path: "/500",
        name: "500",
        component: () => import("../components/500.vue"),
    },
    {
        path: "/mall_management",
        name: "商城管理",
        component: () => import("../pages/mall/MallManagement.vue"),
    },
    {
        path: "/platform_management",
        name: "平台管理",
        component: () => import("../pages/platform/platformSystem/PlatformManagement.vue"),
    },
    {
        path: "/add_platform",
        name: "添加平台",
        component: () => import("../pages/platform/platformSystem/AddPlatform.vue"),
    },
    {
        path: "/coin_detail",
        name: "积分明细",
        component: () => import("../pages/coin/CoinDetail.vue"),
    },
    {
        path: "/update_platform",
        name: "更新平台",
        component: () => import("../pages/platform/platformSystem/UpdatePlatform.vue"),
    },
    {
        path: "/update_mall",
        name: "修改积分规格",
        component: () => import("../pages/mall/UpdateMall.vue"),
    },
    {
        path: "/add_mall",
        name: "增加积分规格",
        component: () => import("../pages/mall/AddMall.vue"),
    },
    {
        path: "/notice",
        name: "消息通知",
        component: () => import("../pages/system/Notice.vue"),
    },
    {
        path: "/about",
        name: "我的",
        component: () => import("../pages/user/AboutView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;
