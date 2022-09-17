import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "index",
            path: "/",
            component: require("../view/main").default,
            meta: { title: "比财后台管理系统", requiresAuth: true }
            // redirect: "/",
        },
        {
            name: "main2",
            path: "/main2",
            component: require("../view/main2").default,
            meta: { title: "比财后台管理系统main2", requiresAuth: true }
            // redirect: "/",
        },
        {
            name: "login",
            path: "/login",
            component: require("../view/login").default,
            meta: { title: "用户登陆 - 比财后台管理系统", requiresAuth: false }
            // redirect: "/",
        },
        {
            name: "home",
            path: "/home",
            component: () => import(/* webpackChunkName: "home" */ "../view/home/index.vue"),
            meta: { title: "主页", requiresAuth: true }
        }
    ]
});

export default router;
