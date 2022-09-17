import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "index",
            path: "/",
            component: require("../view/main").default,
            meta: { title: "首页", requiresAuth: false }
            // redirect: "/",
        },
        {
            name: "accuseManage",
            path: "/accuseManage",
            component: () => import(/* webpackChunkName: "accuseManage" */ "../view/accuseManage/index.vue"),
            meta: { title: "投诉管理", requiresAuth: false }
        },
        {
            name: "accuseManage-detail",
            path: "/accuseManage/detail",
            component: () => import(/* webpackChunkName: "accuseManage-detail" */ "../view/accuseManage/detail.vue"),
            meta: { title: "新增投诉管理", requiresAuth: false }
        },
        {
            name: "activityManage",
            path: "/activityManage",
            component: () => import(/* webpackChunkName: "activityManage" */ "../view/activityManage/index.vue"),
            meta: { title: "活动管理", requiresAuth: false }
        },
        {
            name: "activityManage-add",
            path: "/activityManage/add",
            component: () => import(/* webpackChunkName: "activityManage-add" */ "../view/activityManage/add.vue"),
            meta: { title: "新增活动管理", requiresAuth: false }
        },
        {
            name: "hotProducts",
            path: "/hotProducts",
            component: () => import(/* webpackChunkName: "hotProducts" */ "../view/hotProducts/index.vue"),
            meta: { title: "热销产品管理", requiresAuth: false }
        },
        {
            name: "hotProducts-add",
            path: "/hotProducts/add",
            component: () => import(/* webpackChunkName: "hotProducts-add" */ "../view/hotProducts/add.vue"),
            meta: { title: "新增热销产品", requiresAuth: false }
        },
        {
            name: "userManage",
            path: "/userManage",
            component: () => import(/* webpackChunkName: "userManage" */ "../view/userManage/index.vue"),
            meta: { title: "用户管理", requiresAuth: false }
        },
        {
            name: "userManage-officialAccount",
            path: "/userManage/officialAccount",
            component: () => import(/* webpackChunkName: "userManage-officialAccount" */ "../view/userManage/officialAccount.vue"),
            meta: { title: "官方用户管理", requiresAuth: false }
        },
        {
            name: "userManage-hotAccount",
            path: "/userManage/hotAccount",
            component: () => import(/* webpackChunkName: "userManage-hotAccount" */ "../view/userManage/hotAccount.vue"),
            meta: { title: "推荐用户管理", requiresAuth: false }
        }
    ]
});

export default router;
