import "@common/finsuit-assets/css/reset.css";
import "@common/finsuit-assets/less/common.less";
import "@common/finsuit-assets/icon/iconfont.css";

import modalHelper from "./libs/modalHelper.js";
import bootstrap from "./libs/bootstrap.js";
import * as utils from "./libs/utils.js";
import * as message from "./libs/message.js";

const obj = {};
obj.install = function (app) {
    app.config.globalProperties.$modalHelper = modalHelper;
    app.config.globalProperties.$msg = message;
    app.config.globalProperties.$utils = utils;
};

obj.bootstrap = bootstrap;
export default obj;
