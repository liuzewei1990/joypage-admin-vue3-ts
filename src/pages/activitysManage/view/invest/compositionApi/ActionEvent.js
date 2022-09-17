import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

/**
 * 操作逻辑区Api
 */
export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();
    console.log(router);
    // 批操作按钮
    const add = () => {
        router.push("/invest/add");
    };

    return { add };
}
