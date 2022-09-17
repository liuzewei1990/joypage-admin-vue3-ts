import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "home",
            path: "/",
            component: () => import(/* webpackChunkName: "home" */ "../view/main/index.vue"),
            meta: { title: "不计入总资产机构管理", requiresAuth: false }
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
        }
    ]
});

export default router;
