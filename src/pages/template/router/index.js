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
            name: "table",
            path: "/table",
            component: () => import(/* webpackChunkName: "table" */ "../view/table/index.vue"),
            meta: { title: "表格demo", requiresAuth: false }
        },
        {
            name: "form",
            path: "/form",
            component: () => import(/* webpackChunkName: "form" */ "../view/form/index.vue"),
            meta: { title: "表单组件", requiresAuth: false }
        },
        {
            name: "table-add",
            path: "/table/add",
            component: () => import(/* webpackChunkName: "table-add" */ "../view/table/add.vue"),
            meta: { title: "表格demo", requiresAuth: false }
        },
        {
            name: "upLoadImg",
            path: "/upLoadImg",
            component: () => import(/* webpackChunkName: "upLoadImg" */ "../view/upLoadImg/index.vue"),
            meta: { title: "上传图片demo", requiresAuth: false }
        }
    ]
});

export default router;
