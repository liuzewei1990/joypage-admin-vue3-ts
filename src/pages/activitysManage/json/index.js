import * as apis from "../apis/index";

// 活动入口
export const entranceSelect = [
    {
        name: "首页榜单",
        id: "1"
    },
    {
        name: "银行主页",
        id: "2"
    },
    {
        name: "搜索结果",
        id: "3"
    },
    {
        name: "推荐产品(资讯)",
        id: "4"
    },
    {
        name: "我的浏览",
        id: "5"
    },
    {
        name: "关联产品(视频)",
        id: "6"
    }
];

// 拼团状态
export const statusSelect = [
    {
        name: "开启",
        id: "1"
    },
    {
        name: "关闭",
        id: "2"
    }
];

// 用户select
export const userSelect = [
    {
        id: "3",
        name: "全部用户"
    },
    {
        id: "1",
        name: "新用户"
    }
];

// 渠道select
export const appFlagSelect = [
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

// 渠道select 含异业
export const appFlagSelectMore = [
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
    },
    {
        id: "YIYE",
        name: "异业"
    }
];

// 设备select
export const deviceSelect = [
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

// 奖励类型
export const rewardType = [
    {
        name: "加息奖励",
        id: "1"
    },
    {
        name: "混合奖励",
        id: "2"
    },
    {
        name: "周期奖励",
        id: "4"
    }
];

// 可见用户
export const visibleSelect = [
    {
        name: "新用户",
        id: "1"
    },
    {
        name: "全部用户",
        id: "3"
    }
];

// 拼团控制
export const comtrolArr = [
    {
        name: "购买成团",
        id: "1"
    },
    {
        name: "自然成团",
        id: "2"
    },
    {
        name: "固定成团",
        id: "3"
    },
    {
        name: "投融资固定成团",
        id: "4"
    }
];

// 拼团入口
export const entranceArr = [
    {
        name: "首页榜单",
        id: "1"
    },
    {
        name: "银行主页",
        id: "2"
    },
    {
        name: "搜索结果",
        id: "3"
    },
    {
        name: "推荐产品(资讯)",
        id: "4"
    },
    {
        name: "我的浏览",
        id: "5"
    },
    {
        name: "关联产品(视频)",
        id: "6"
    }
];

// 拼团金额时间段
export const timeQuantumArr = [
    {
        name: "08:00 - 12:00",
        id: "1"
    },
    {
        name: "12:00 - 16:00",
        id: "2"
    },
    {
        name: "16:00 - 20:00",
        id: "3"
    },
    {
        name: "20:00 - 24:00",
        id: "4"
    }
];

// 拼人数团类型
export const assembleTypeArr = [
    {
        name: "超级团",
        id: "1"
    },
    {
        name: "普通团",
        id: "2"
    }
];

// 人数拼团控制
export const personComtrolArr = [
    {
        name: "购买成团",
        id: "1"
    },
    {
        name: "自然成团",
        id: "2"
    },
    {
        name: "固定成团",
        id: "3"
    }
];

// 机构select
export const getOrgSelect = async ($event) => {
    let { query, callback } = $event;
    let params = {};
    let data = await apis.getOrgSelect(params);
    callback({ list: data });
};

// 产品select
export const getPrdSelect = async ($event, orgId = "") => {
    let { query, callback } = $event;
    let params = { orgId };
    let data = await apis.getPrdSelect(params);
    callback({ list: data });
};

// 优选奖励模板
export const getRewardInfoSelect = async ($event, rewardType = 2) => {
    let { query, callback } = $event;
    let params = { rewardType };
    let data = await apis.getRewardInfoSelect(params);
    callback({ list: data });
};

// 拼团奖励模版
export const getActTeamRewardInfoSelect = async ($event, rewardType = 2) => {
    let { query, callback } = $event;
    let params = { activityCode: "SFACT", rewardType };
    let data = await apis.getActTeamRewardInfoSelect(params);
    callback({ list: data });
};

// 拼人数奖励模版
export const getActPersonRewardInfoSelect = async ($event, rewardType = 2) => {
    let { query, callback } = $event;
    let params = { rewardType };
    let data = await apis.getActPersonRewardInfoSelect(params);
    callback({ list: data });
};

// 活动规则
export const getActivityRuleListNoPage = async ($event) => {
    let { query, callback } = $event;
    let params = {};
    let data = await apis.getActivityRuleListNoPage(params);
    callback({ list: data });
};
