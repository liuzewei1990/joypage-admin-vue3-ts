import { getCurrentInstance, reactive, toRaw } from "vue";

export default function (form) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 渠道select
    const appFlagSelect = [
        {
            id: "BC",
            name: "比财"
        },
        {
            id: "PC",
            name: "拼财"
        },
        {
            id: "PMP",
            name: "小程序"
        }
    ];

    // 设备select
    const deviceSelect = [
        {
            name: "通用",
            id: "TY"
        },
        {
            name: "苹果",
            id: "IOS"
        },
        {
            name: "安卓",
            id: "ANDROID"
        }
    ];

    // ......这里如果有本地json的话

    // ...

    // 机构select
    const getOrgSelect = async ($event) => {
        let { query, callback } = $event;
        let params = {};
        let data = await _this.$apis.getOrgSelect(params);
        callback({ list: data });
    };

    // 产品select
    const getPrdSelect = async ($event, orgId = "") => {
        let { query, callback } = $event;
        let params = { orgId };
        let data = await _this.$apis.getPrdSelect(params);
        callback({ list: data });
    };

    // ......这里如果有其他异步json的话

    // ...

    return {
        appFlagSelect,
        deviceSelect,
        getOrgSelect,
        getPrdSelect
    };
}
