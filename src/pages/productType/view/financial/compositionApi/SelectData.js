import { getCurrentInstance, reactive, toRaw } from "vue";
import * as finsuitApis from "@common/finsuit-apis";

export default function (form) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 机构select
    const getOrgSelect = async ($event) => {
        let { query, callback } = $event;
        let params = {};
        let data = await finsuitApis.getOrgSelect(params);
        callback({ list: data });
    };

    // 获取币种select
    const getCurrencyAndOrg = async ($event, nationalType) => {
        let { query, callback } = $event;
        let params = { nationalType: nationalType };
        let data = await _this.$apis.getCurrencyAndOrg(params);
        callback({ list: data.currencyList });
    };

    return {
        getOrgSelect,
        getCurrencyAndOrg
    };
}

// 产品类型
export const prdTypeList = [
    {
        id: "1",
        name: "基金"
    },
    {
        id: "2",
        name: "理财"
    }
];

// 曲线图类型
export const rateCurveGraphTypeList = [
    {
        id: "1",
        name: "七日年化收益"
    },
    {
        id: "2",
        name: "固定收益"
    }
];

// 风险等级
export const riskLevelList = [
    {
        id: "1",
        name: "低"
    },
    {
        id: "2",
        name: "较低"
    },
    {
        id: "3",
        name: "中"
    },
    {
        id: "4",
        name: "较高"
    },
    {
        id: "5",
        name: "高"
    }
];

// 期限单位
export const rateUnitList = [
    {
        id: "0",
        name: "天"
    },
    {
        id: "1",
        name: "月"
    },
    {
        id: "2",
        name: "年"
    }
];

// 监管属性
export const isSupervisionList = [
    {
        id: "0",
        name: "待定-未知"
    },
    {
        id: "1",
        name: "监管-集合资产管理计划"
    },
    {
        id: "2",
        name: "监管-银行理财"
    },
    {
        id: "3",
        name: "监管-保险"
    },
    {
        id: "5",
        name: "监管-结构性存款"
    },
    {
        id: "7",
        name: "监管-存款"
    },
    {
        id: "4",
        name: "非监管-融资"
    },
    {
        id: "6",
        name: "非监管-票据"
    }
];

// 产品区域
export const nationalTypeList = [
    {
        id: "1",
        name: "中国大陆"
    },
    {
        id: "2",
        name: "中国香港"
    }
];

// 机构对接方式
export const bankDockTypeList = [
    {
        id: "0",
        name: "无"
    },
    {
        id: "1",
        name: "SDK"
    },
    {
        id: "2",
        name: "H5"
    },
    {
        id: "3",
        name: "api+h5"
    },
    {
        id: "4",
        name: "api+小程序"
    }
];
