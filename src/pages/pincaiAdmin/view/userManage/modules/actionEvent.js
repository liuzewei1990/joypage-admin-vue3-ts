import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    const addOfficialUser = () => {};
    return { addOfficialUser };
}
