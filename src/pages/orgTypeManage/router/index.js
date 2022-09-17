/*
 * @Author: your name
 * @Date: 2021-10-20 10:25:37
 * @LastEditTime: 2021-10-21 14:07:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \finsuit-admin-joypage3.0\src\pages\orgTypeManage\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "home",
            path: "/",
            component: () => import(/* webpackChunkName: "home" */ "../view/main/index.vue"),
            meta: { title: "机构类型管理", requiresAuth: false }
        }
    ]
});

export default router;
