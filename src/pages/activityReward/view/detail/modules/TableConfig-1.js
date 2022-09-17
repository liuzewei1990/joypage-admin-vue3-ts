import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    const tableConfigGetInfo = reactive({
        columnJson: [
            {
                prop: "activityName",
                label: "活动名称"
            },
            {
                prop: "memberPhone",
                label: "领取用户"
            },
            {
                prop: "receiveTime",
                label: "领取时间"
            }
        ]
    });
    return { tableConfigGetInfo };
}
