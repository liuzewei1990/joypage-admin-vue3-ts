import { getCurrentInstance, reactive, toRaw, ref } from "vue";

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
        orgId: "", //机构名称
        type: "", //一级机构类型
        currentPage: 1, //查询当前页
        length: 10, //条数
        totalSize: 0
    });

    // 查询按钮
    const clickQueryBtn = () => {
        BcTableRefComponent.value.emitGetApiData();
    };

    // 重置按钮
    const clickResetBtn = () => {
        BcTableRefComponent.value.resetQueryBtn();
    };

    // 表单请求回来的数据 getSelectCPrdIndexInfo
    const getSelectTMPage = async ($event, topInfo) => {
        console.log(" $event", $event);
        let { query, callback } = $event;
        let params = {
            orgId: queryForm.orgId, //机构名称
            type: queryForm.type, //一级机构类型
            currentPage: query.currentPage, //查询当前页
            length: query.pageSize //条数
        };
        console.log("列表入参", params);
        let data = await _this.$apis.getSelectCPrdIndexInfo(params); //调表格数据
        console.log("获取列表数据", data);
        callback({ list: data.retList, total: data.totalCount });
    };

    return {
        queryForm,
        clickQueryBtn,
        clickResetBtn,
        getSelectTMPage
    };
}
