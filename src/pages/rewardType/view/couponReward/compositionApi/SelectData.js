import { getCurrentInstance, reactive, toRaw } from "vue";

export default function (form) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // ......这里如果有本地json的话

    // ...

    // ......这里如果有其他异步json的话

    // ...

    return {};
}
