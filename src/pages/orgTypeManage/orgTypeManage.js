import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
const app = createApp(App);

/* 注意顺序，和自定义globalProperties有着覆盖的关系 */
app.use(store);
app.use(router);
app.use(ElementPlus);

/* 注册配置文件 */
import config from "./config/config.index.js";
app.config.globalProperties.$config = config;

/* 注册api接口 */
import * as apis from "./apis/index.js";
app.config.globalProperties.$apis = apis;

/* 通用select组件 */
import BcSelect from "@common/finsuit-components/BcSelect";
app.component("BcSelect", BcSelect);

/* 引入全局路由钩子守卫 */
import "./router/routerController.js";

/* 安装finsuit插件包 */
import joypage from "@common/finsuit-h5";
app.use(joypage, { appStore: store });

joypage.bootstrap(app, store, router);
