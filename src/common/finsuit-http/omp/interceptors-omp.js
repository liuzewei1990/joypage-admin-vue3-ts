/**
 * omp拦截器
 * @param {*} response
 */

import * as message from "../../finsuit-h5/libs/message.js";
export default function (response) {
    let config = response.config;
    let responseData = response.data;

    // 登陆过期-11111 派发过期通知事件 回传responseData需要的话就用
    if (responseData.code == "-11111") {
        window.parent.exportApi.exitMessage();
        return Promise.reject(responseData);
    }

    // 页面需要responseData全部数据
    if (config.isGetCode) {
        return responseData;
    }

    // 页面只需要responseData.data数据
    if (responseData.code == "00000" || responseData.result == true || responseData.code == "0") {
        return responseData.data || {};
    }

    message.error({ type: "error", message: responseData.msg || responseData.description || "未知异常" });
    return Promise.reject(responseData);
}
