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
        // 奖励名称
        rewardName: "",
        // 适用类型
        rewardScope: "",
        // 适用范围
        rewardScopeId: "",
        // 奖励类型 4:周期奖励
        rewardType: "4",

        // 适用类型变化时
        _typeChange() {
            queryForm.rewardScopeId = "";
        }
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
            pageSize: query.pageSize,
            ...toRaw(queryForm)
        };
        // 这里调用接口，接口响应后需回调callback
        let data = await _this.$apis.getLoopRewardList(params);
        callback({ list: data.retList, total: data.totalCount });
        try {
        } catch (error) {
            _this.$msg.error("获取数据异常");
        }
    };

    return { queryForm, GetapiData, clickQueryBtn, clickResetBtn };
}
