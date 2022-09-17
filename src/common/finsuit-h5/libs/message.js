// import { ELMessage } from 'element-plus';

import * as element from "element-plus";
const isIframe = !!window.parent.exportApi;
/**
 * message封装
 * 调用 ：this.$msg.success | this.$msg.fail | this.$msg.error
 * @param {*} message
 * @returns
 */

/* 操作成功 */
export const success = (message = "") => (isIframe ? window.parent.exportApi.message({ type: "success", message }) : element.ElMessage.success(message));

/* 操作失败 */
export const fail = (message = "") => (isIframe ? window.parent.exportApi.message({ type: "warning", message }) : element.ElMessage.warning(message));

/* 操作错误 */
export const error = (message = "") => (isIframe ? window.parent.exportApi.message({ type: "error", message }) : element.ElMessage.error(message));
