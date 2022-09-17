import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        // {
        //     name: "home",
        //     path: "/",
        //     component: () => import(/* webpackChunkName: "home" */ '../view/main/index.vue'),
        //     meta: { title: '首页', requiresAuth: false, },
        // },
        {
            name: "nonBankOrgProManage-index",
            path: "/",
            component: () => import(/* webpackChunkName: "nonBankOrgProManage" */ "../view/nonBankOrgProManage/index.vue"),
            meta: { title: "非银机构产品管理", requiresAuth: false }
        },
        {
            name: "nonBankOrgProManage-add",
            path: "/add",
            component: () => import(/* webpackChunkName: "nonBankOrgProManage" */ "../view/nonBankOrgProManage/add.vue"),
            meta: { title: "非银机构产品管理新增和修改", requiresAuth: false }
        },
        {
            name: "financialManager-index",
            path: "/financialIndex",
            component: () => import(/* webpackChunkName: "financialManager" */ "../view/financialManager/index.vue"),
            meta: { title: "非银机构产品管理", requiresAuth: false }
        },
        {
            name: "financialManager-add",
            path: "/financialAdd",
            component: () => import(/* webpackChunkName: "financialManager" */ "../view/financialManager/add.vue"),
            meta: { title: "非银机构产品管理新增和修改", requiresAuth: false }
        }
    ]
});

export default router;
