import { getCurrentInstance, reactive, toRaw } from "vue";

/**
 * 查询逻辑区Api
 */
export default function (BcTableRefComponent) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    /**
     * 表单查询字段
     */
    const queryForm = reactive({
        // 产品名称
        prdName: "",
        // 产品类型
        prdType: "",
        // 机构id
        orgId: "",
        // 风险等级
        riskLevel: "",
        // 曲线类型
        rateCurveGraphType: ""
    });

    // 查询按钮
    const clickQueryBtn = () => {
        BcTableRefComponent.value.startQueryBtn();
    };

    // 重置按钮
    const clickResetBtn = () => {
        BcTableRefComponent.value.resetQueryBtn();
    };

    // 获取表格数据
    const GetapiData = async ($event) => {
        let { query, callback } = $event;
        console.log("GetapiData：", query);
        const params = {
            currentPage: query.currentPage,
            length: query.pageSize,
            ...toRaw(queryForm)
        };
        const data = await _this.$apis.query(params);
        // callback({ list: [{ name: 111, id: 1100002002, isEnabled: "1" }], total: 1 })
        callback({ list: data.retList, total: data.totalCount });
        try {
        } catch (error) {
            _this.$msg.error("获取数据异常");
        }
    };

    return { queryForm, GetapiData, clickQueryBtn, clickResetBtn };
}
