import { getCurrentInstance } from "vue";

/**
 * 操作逻辑区Api
 */
export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 批操作按钮
    const test = () => {
        _this.$msg.success("点我啦~");
    };

    return { test };
}
