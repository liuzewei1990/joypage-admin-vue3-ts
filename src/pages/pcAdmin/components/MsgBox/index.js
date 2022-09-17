import { h, ref } from "vue";
import { ElMessageBox } from "element-plus";
import Radios from "./modules/Radios";

/**
 * 这是一个自定义VNode的ElMessageBox弹窗confirm radio组件
 * @param {*} title 标题 “我是标题”
 * @param {*} modelValue radio ref流 ：ref对象
 * @param {*} radios radios json配置 ： [{ label: "通过", value: 1, tip: "通过后所有人可见" }, { label: "不通过", value: 2, tip: "不通过仅发帖人可见" }]
 * @param {*} bottomMassage 底部msg文本
 * @param {*} confirmConfig ElMessageBox.confirm的配置
 * @returns
 */
export const ConfirmRadios = async (title = "", { modelValue = ref(null), radios = [], bottomMassage }, confirmConfig = {}) => {
    return await ElMessageBox.confirm(h(Radios, { modelValue, radios, bottomMassage }), title, { center: true, customClass: "aaaaaaaaaaaaaaaaaaaaa", ...confirmConfig });
};

/**
 * 这是一个alert的二次封装
 * @param {*} title  标题 “我是标题”
 * @param {*} msg 提示内容文本
 * @returns
 */
export const AlertText = async (title = "", msg = "") => {
    return await ElMessageBox.alert(msg, title, { center: true, customClass: "aaaaaaaaaaaaaaaaaaaaa" });
};
