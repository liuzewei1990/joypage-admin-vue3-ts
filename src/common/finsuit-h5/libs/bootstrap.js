/**
 * 页面挂载方法：用于页面挂载拦截使用
 */

// import authorityErrorPage from "./authorityErrorPage"
export default function (app, $store, router) {
    // if ($store.getters.isLogin) {
    app.mount("#app");
    // } else {
    // alert("无权限")
    // authorityErrorPage.$mount("#app");
    // }
}
