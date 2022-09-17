import * as apis from "../apis/index";

// 适用类型
export const rewardScopeArr = [
    {
        name: "活动",
        id: "1"
    },
    {
        name: "任务",
        id: "2"
    }
];

// 混合奖励类型
export const blendRewardSelect = [
    {
        name: "现金",
        id: "1"
    },
    {
        name: "积分",
        id: "2"
    },
    {
        name: "加息",
        id: "3"
    },
    {
        name: "权益",
        id: "4"
    }
];

export let randomRewardSelect = [
    {
        name: "现金",
        id: "1"
    },
    {
        name: "积分",
        id: "2"
    },
    {
        name: "卡券",
        id: "3"
    },
    {
        name: "实物",
        id: "4"
    }
];

export let welfareTypeSelect = [
    {
        name: "激活码类",
        id: "1"
    },
    {
        name: "链接类",
        id: "2"
    },
    {
        name: "扫码类",
        id: "3"
    }
];

// 活动select
export const getActivitysSelect = async ($event) => {
    let { query, callback } = $event;
    let params = {};
    let data = await apis.getActivityList(params);
    callback({ list: data });
};

// 任务select
export const getTaskSelect = async ($event) => {
    let { query, callback } = $event;
    let params = {};
    let data = await apis.getTaskList(params);
    callback({ list: data });
};

// 任务select
export const getCouponSelect = async ($event) => {
    let { query, callback } = $event;
    let params = {};
    let data = await apis.getCouponList(params);
    callback({ list: data });
};

// 权益select
export const getWealBenefitByType = async ($event, benefitType) => {
    let { query, callback } = $event;
    let params = { benefitType: benefitType };
    let data = await apis.getWealBenefitByType(params);
    callback({ list: data });
};
