import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "home",
            path: "/",
            component: () => import(/* webpackChunkName: "home" */ "../view/main/index.vue"),
            meta: { title: "首页", requiresAuth: false }
        },
        {
            name: "invest",
            path: "/invest",
            component: () => import(/* webpackChunkName: "invest" */ "../view/invest/index.vue"),
            meta: { title: "优选列表", requiresAuth: false }
        },
        {
            name: "invest-add",
            path: "/invest/add",
            component: () => import(/* webpackChunkName: "invest-add" */ "../view/invest/add.vue"),
            meta: { title: "新增优选", requiresAuth: false }
        },
        {
            name: "personItem",
            path: "/personItem",
            component: () => import(/* webpackChunkName: "personItem" */ "../view/personItem/index.vue"),
            meta: { title: "拼人数管理", requiresAuth: false }
        },
        {
            name: "personItem-add",
            path: "/personItem/add",
            component: () => import(/* webpackChunkName: "personItem-add" */ "../view/personItem/add.vue"),
            meta: { title: "新增拼人数", requiresAuth: false }
        },
        {
            name: "teamItem",
            path: "/teamItem",
            component: () => import(/* webpackChunkName: "teamItem" */ "../view/teamItem/index.vue"),
            meta: { title: "拼团管理", requiresAuth: false }
        },
        {
            name: "teamItem-add",
            path: "/teamItem/add",
            component: () => import(/* webpackChunkName: "teamItem-add" */ "../view/teamItem/add.vue"),
            meta: { title: "新增拼团", requiresAuth: false }
        }
    ]
});

export default router;
