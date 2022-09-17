import { getCurrentInstance, reactive, toRaw } from "vue";

export default function (form) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 活动入口
    const entranceSelect = [
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
    const statusSelect = [
        {
            name: "开启",
            id: 1
        },
        {
            name: "关闭",
            id: 2
        }
    ];

    // 用户select
    const userSelect = [
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

    // 奖励类型
    const rewardType = [
        {
            id: 2,
            name: "混合"
        }
    ];

    // 可见用户
    const visibleSelect = [
        {
            name: "新用户",
            id: 1
        },
        {
            name: "全部用户",
            id: 3
        }
    ];

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

    // 奖励模板
    const getRewardInfoSelect = async ($event, rewardType = 2) => {
        let { query, callback } = $event;
        let params = { rewardType };
        let data = await _this.$apis.getRewardInfoSelect(params);
        callback({ list: data });
    };

    // 活动规则
    const getActivityRuleListNoPage = async ($event) => {
        let { query, callback } = $event;
        let params = {};
        let data = await _this.$apis.getActivityRuleListNoPage(params);
        callback({ list: data });
    };

    return {
        userSelect,
        appFlagSelect,
        rewardType,
        entranceSelect,
        statusSelect,
        deviceSelect,
        visibleSelect,
        getOrgSelect,
        getPrdSelect,
        getRewardInfoSelect,
        getActivityRuleListNoPage
    };
}
