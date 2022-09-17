import { ElImage, ElLink, ElSpace, ElTag } from "element-plus";
import { h, toRefs } from "vue";
import * as $json from "../../json/index";

/**
 * 帖子@\产品 暂且不支持跳转
 * @param {*} list
 * @param {*} nameKey
 * @param {*} valueKey
 * @returns
 */
export const PrdsLink = (props, context) => {
    const { list, nameKey, valueKey } = props;
    // return list.map(item => item[nameKey]).join('，')
    const items = list.map((item) =>
        h(
            ElLink,
            {
                href: "javascript:void(0);",
                underline: false,
                style: {
                    display: "block",
                    width: "80px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "12px"
                }
            },
            { default: () => item[nameKey] }
        )
    );
    return h(ElSpace, { size: 1, direction: "vertical", spacer: "", wrap: true }, { default: () => items });
};
PrdsLink.props = { list: { default: [] }, nameKey: { default: "name" }, valueKey: { default: "id" } };

/**
 * 帖子@\用户  暂且不支持跳转
 * @param {*} props
 * @param {*} context
 * @returns
 */
export const UserLink = (props, context) => {
    const { list, nameKey, valueKey } = props;
    const items = list.map((item) =>
        h(
            ElLink,
            {
                href: "javascript:void(0);",
                underline: false,
                style: {
                    fontSize: "12px"
                }
            },
            { default: () => item[nameKey] }
        )
    );
    return h(ElSpace, { size: 1, direction: "horizontal", spacer: ",", wrap: true }, { default: () => items });
};
UserLink.props = { list: { default: [] }, nameKey: { default: "name" }, valueKey: { default: "id" } };

/**
 * 贴子类型
 * @param {*} props
 * @param {*} context
 */
export const OType = (props, context) => {
    const { status = "" } = props;
    const text = $json.oTypes.find((item) => item.id == status);
    return h(ElTag, { size: "small", type: text.id == 1 ? "success" : "info" }, { default: () => text.name });
};

/**
 * 帖子状态
 * @param {*} props
 * @param {*} context
 */
export const OStatus = (props, context) => {
    const { status = "" } = props;
    const text = $json.oTypes.find((item) => item.id == status);
    return h(ElTag, { size: "small", type: text.id == 1 ? "success" : "info" }, { default: () => text.name });
};

/**
 * 审核状态
 * @param {*} props
 * @param {*} context
 */
export const SStatus = (props, context) => {
    const { status = "" } = props;
    const text = $json.oTypes.find((item) => item.id == status);
    return h(ElTag, { size: "small", type: text.id == 1 ? "success" : "info" }, { default: () => text.name });
};
