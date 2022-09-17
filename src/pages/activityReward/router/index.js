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
            name: "channelReward",
            path: "/channelReward",
            component: () => import(/* webpackChunkName: "channelReward" */ "../view/channelReward/index.vue"),
            meta: { title: "渠道权益", requiresAuth: false }
        },
        {
            name: "detail1",
            path: "/channelReward/detail-1",
            component: () => import(/* webpackChunkName: "channelReward/detail-1" */ "../view/detail/index-1.vue"),
            meta: { title: "激活码", requiresAuth: false }
        },
        {
            name: "detail11",
            path: "/channelReward/detail-1-1",
            component: () => import(/* webpackChunkName: "channelReward/detail-1-1" */ "../view/detail/index-1-1.vue"),
            meta: { title: "激活码领用详情", requiresAuth: false }
        },
        {
            name: "detail2",
            path: "/channelReward/detail-2",
            component: () => import(/* webpackChunkName: "channelReward/detail-2" */ "../view/detail/index-2.vue"),
            meta: { title: "链接类", requiresAuth: false }
        },
        {
            name: "detail3",
            path: "/channelReward/detail-3",
            component: () => import(/* webpackChunkName: "channelReward/detail-3" */ "../view/detail/index-3.vue"),
            meta: { title: "扫码类", requiresAuth: false }
        }
    ]
});

export default router;
