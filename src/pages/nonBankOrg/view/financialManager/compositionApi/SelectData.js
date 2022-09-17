import { reactive, getCurrentInstance } from "vue";
import { getOrgSelectApi } from "../../../apis/index";
export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    //因为提交数据时,提交string类型 后端可能返回string，
    //可能返回number,后端返回数据不能统一 所以以下本地数据有number和string

    //是否
    const judgeList = [
        {
            name: "是",
            id: 1
        },
        {
            name: "否",
            id: 0
        }
    ];
    //产品类型
    const proTypeList = [
        {
            name: "七日年化收益",
            id: 1
        },
        {
            name: "固定收益",
            id: 2
        }
    ];
    //产品类型 新增修改页面
    const proTypeAddList = [
        {
            name: "七日年化收益",
            id: 1
        },
        {
            name: "固定收益",
            id: 2
        }
    ];
    //风险等级
    const riskRatingList = [
        {
            name: "暂无",
            id: "0"
        },
        {
            name: "低",
            id: "1"
        },
        {
            name: "中低",
            id: "2"
        },
        {
            name: "中",
            id: "3"
        },
        {
            name: "中高",
            id: "4"
        },
        {
            name: "高",
            id: "5"
        }
    ];
    //期限 单位
    const timeLimitUnitList = [
        {
            name: "天",
            id: 0
        },
        {
            name: "个月",
            id: 1
        },
        {
            name: "年",
            id: 2
        }
    ];
    //监管属性
    const regAttrList = [
        {
            name: "待定-未知",
            id: "0"
        },
        {
            name: "监管-集合资产管理计划",
            id: "1"
        },
        {
            name: "监管-银行理财",
            id: "2"
        },
        {
            name: "监管-保险",
            id: "3"
        },
        {
            name: "非监管-融资",
            id: "4"
        },
        {
            name: "监管-结构性存款",
            id: "5"
        },
        {
            name: "非监管-票据",
            id: "6"
        },
        {
            name: "监管-存款",
            id: "7"
        }
    ];
    //产品区域
    const areaList = [
        {
            name: "中国大陆",
            id: "1"
        },
        {
            name: "中国香港",
            id: "2"
        }
    ];
    //币种
    const currencyList = [
        {
            name: "人民币",
            id: "CNY"
        }
    ];
    //机构对接方式
    const dockingList = [
        {
            name: "无",
            id: "0"
        },
        {
            name: "API",
            id: "1"
        },
        {
            name: "H5",
            id: "2"
        },
        {
            name: "API+H5",
            id: "3"
        }
    ];
    //所属非银机构
    const getOrgSelect = async ($event) => {
        let { query, callback } = $event;
        let params = {
            orgId: "",
            orgName: query.keywords
        };
        let data = await getOrgSelectApi(params);
        // console.log(data)
        callback({ list: data });
    };

    return {
        judgeList,
        proTypeList,
        proTypeAddList,
        riskRatingList,
        timeLimitUnitList,
        regAttrList,
        areaList,
        currencyList,
        dockingList,
        getOrgSelect
    };
}
