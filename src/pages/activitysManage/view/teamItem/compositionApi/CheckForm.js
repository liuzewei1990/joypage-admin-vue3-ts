import { getCurrentInstance, reactive, toRaw } from "vue";

/**
 * 查询逻辑区Api
 */
export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    /**
     * 表单查询字段
     */
    const queryForm = reactive({
        prdName: "",
        rewardType: "",
        visibleType: "",
        appFlag: ""
    });

    // 查询按钮
    const clickQueryBtn = (BcTableRefComponent) => {
        BcTableRefComponent.startQueryBtn();
    };

    // 重置按钮
    const clickResetBtn = (BcTableRefComponent) => {
        BcTableRefComponent.resetQueryBtn();
    };

    // 获取表格数据
    const GetapiData = async ($event) => {
        let { query, callback } = $event;
        console.log("GetapiData：", query);
        const params = {
            currentPage: query.currentPage,
            pageSize: query.pageSize,
            ...toRaw(queryForm)
        };
        let data = await _this.$apis.getActTeam(params);
        callback({ list: data.retList, total: data.totalCount });

        try {
        } catch (error) {
            _this.$msg.error("获取数据异常");
        }
    };

    return { queryForm, GetapiData, clickQueryBtn, clickResetBtn };
}
