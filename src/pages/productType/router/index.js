import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "financial",
            path: "/financial",
            component: () => import(/* webpackChunkName: "financial" */ "../view/financial/index.vue"),
            meta: { title: "理财子", requiresAuth: false }
        },
        {
            name: "financial-add",
            path: "/financial/add",
            component: () => import(/* webpackChunkName: "financial-add" */ "../view/financial/add.vue"),
            meta: { title: "新增", requiresAuth: false }
        }
    ]
});

export default router;
