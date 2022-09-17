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
            name: "articleManage",
            path: "/articleManage",
            component: () => import(/* webpackChunkName: "articleManage" */ "../view/articleManage/index"),
            meta: { title: "帖子管理", requiresAuth: false }
        },
        {
            name: "articleManage-detail",
            path: "/articleManage/detail",
            component: () => import(/* webpackChunkName: "articleManage-detail" */ "../view/articleManage/detail.vue"),
            meta: { title: "帖子详情", requiresAuth: false }
        },
        {
            name: "articleManage-hotList",
            path: "/articleManage/hotList",
            component: () => import(/* webpackChunkName: "articleManage-hotList" */ "../view/articleManage/hotList.vue"),
            meta: { title: "推荐帖管理", requiresAuth: false }
        },
        {
            name: "commentManage",
            path: "/commentManage",
            component: () => import(/* webpackChunkName: "commentManage" */ "../view/commentManage/index.vue"),
            meta: { title: "评论管理", requiresAuth: false }
        },
        {
            name: "videoManage",
            path: "/videoManage",
            component: () => import(/* webpackChunkName: "videoManage" */ "../view/videoManage/index.vue"),
            meta: { title: "小视频管理", requiresAuth: false }
        },
        {
            name: "videoManage-detail",
            path: "/videoManage/detail",
            component: () => import(/* webpackChunkName: "videoManage-detail" */ "../view/videoManage/detail.vue"),
            meta: { title: "帖子详情", requiresAuth: false }
        },
        {
            name: "videoManage-hotList",
            path: "/videoManage/hotList",
            component: () => import(/* webpackChunkName: "videoManage-hotList" */ "../view/videoManage/hotList.vue"),
            meta: { title: "推荐视频管理", requiresAuth: false }
        }
    ]
});

export default router;
