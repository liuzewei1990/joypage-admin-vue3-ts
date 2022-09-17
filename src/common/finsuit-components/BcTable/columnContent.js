import { ElForm, ElImage, ElLink, ElSpace, ElTag } from "element-plus";
import { h, toRefs } from "vue";

/**
 * 渲染图片组件 可放大预览
 * @param {*} props
 * @param {*} context
 * @returns
 */
export const HeaderImage = (props, context) => {
    const { src = "" } = props;
    const preList = [src];
    return h(ElImage, { src: src, fit: "contain", alt: "图片无法显示", previewSrcList: preList, style: { width: "50px", height: "50px" } });
};

/**
 * 渲染带链接的文字
 * @param {*} props
 * @param {*} context
 * @returns
 */
export const TextLink = (props, context) => {
    return h(
        ElLink,
        {
            style: { fontSize: "12px" },
            type: "primary",
            href: "javascript:void(0);",
            ...props
        },
        { default: () => (context.slots.default ? context.slots.default() : "我是链接") }
    );
};

/**
 * 状态类型
 * @param {*} props
 * @param {*} context
 */
export const SuccessStatusCol = (props, context) => {
    const { isSucc = true, text = "成功状态演示" } = props;
    return h(ElTag, { size: "small", type: isSucc ? "success" : "info" }, { default: () => text });
};
