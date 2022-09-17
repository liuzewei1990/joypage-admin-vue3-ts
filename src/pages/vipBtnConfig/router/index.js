import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "home",
            path: "/",
            component: () => import(/* webpackChunkName: "home" */ "../view/main/index.vue"),
            meta: { title: "首页列表", requiresAuth: false }
        },

        {
            name: "table",
            path: "/table",
            component: () => import(/* webpackChunkName: "table" */ "../view/table/index.vue"),
            meta: { title: "表格demo", requiresAuth: false }
        },
        {
            name: "table-add",
            path: "/table/add",
            component: () => import(/* webpackChunkName: "table-add" */ "../view/table/add.vue"),
            meta: { title: "表格demo", requiresAuth: false }
        },
        {
            name: "calculator",
            path: "/calculator",
            component: () => import(/* webpackChunkName: "calculator" */ "../view/calculator/index.vue"),
            meta: { title: "计算器配置管理", requiresAuth: false }
        }
    ]
});

export default router;
