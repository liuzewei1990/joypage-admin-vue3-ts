import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: "main",
            path: "/",
            redirect: "/couponReward"
        },
        {
            name: "blendReward",
            path: "/blendReward",
            component: () => import(/* webpackChunkName: "blendReward" */ "../view/blendReward/index.vue"),
            meta: { title: "混合奖励", requiresAuth: false }
        },
        {
            name: "blendReward-add",
            path: "/blendReward/add",
            component: () => import(/* webpackChunkName: "blendReward-add" */ "../view/blendReward/add.vue"),
            meta: { title: "新增混合奖励", requiresAuth: false }
        },
        {
            name: "couponReward",
            path: "/couponReward",
            component: () => import(/* webpackChunkName: "couponReward" */ "../view/couponReward/index.vue"),
            meta: { title: "加息奖励", requiresAuth: false }
        },
        {
            name: "couponReward-add",
            path: "/couponReward/add",
            component: () => import(/* webpackChunkName: "couponReward-add" */ "../view/couponReward/add.vue"),
            meta: { title: "新增加息奖励", requiresAuth: false }
        },
        {
            name: "loopReward",
            path: "/loopReward",
            component: () => import(/* webpackChunkName: "loopReward" */ "../view/loopReward/index.vue"),
            meta: { title: "周期奖励", requiresAuth: false }
        },
        {
            name: "loopReward-add",
            path: "/loopReward/add",
            component: () => import(/* webpackChunkName: "loopReward-add" */ "../view/loopReward/add.vue"),
            meta: { title: "新增周期奖励", requiresAuth: false }
        },
        {
            name: "randomReward",
            path: "/randomReward",
            component: () => import(/* webpackChunkName: "randomReward" */ "../view/randomReward/index.vue"),
            meta: { title: "随机奖励", requiresAuth: false }
        },
        {
            name: "randomReward-add",
            path: "/randomReward/add",
            component: () => import(/* webpackChunkName: "randomReward-add" */ "../view/randomReward/add.vue"),
            meta: { title: "新增随机奖励", requiresAuth: false }
        }
    ]
});

export default router;
