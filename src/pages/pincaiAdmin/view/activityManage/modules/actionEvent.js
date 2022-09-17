import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    const addActivity = () => {
        that.$router.push({
            path: "/activityManage/add",
            query: {
                id: "1243"
            }
        });
    };
    return { addActivity };
}
