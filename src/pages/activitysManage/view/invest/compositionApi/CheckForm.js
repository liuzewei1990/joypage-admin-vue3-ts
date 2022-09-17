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
        // 机构
        orgId: "",
        // 产品
        prdIndexId: "",
        // 渠道
        appFlag: "",
        // 用户
        visibleType: "",

        _orgIdChange() {
            queryForm.prdIndexId = "";
        }
    });

    // 查询按钮
    const clickQueryBtn = () => {
        instance.refs["BcTable"].startQueryBtn();
    };

    // 重置按钮
    const clickResetBtn = () => {
        instance.refs["BcTable"].resetQueryBtn();
    };

    // 获取表格数据
    const GetapiData = async ($event) => {
        let { query, callback } = $event;
        console.log("GetapiData：", query, _this.$apis);
        const params = {
            currentPage: query.currentPage,
            pageSize: query.pageSize,
            // 机构
            orgId: queryForm.orgId,
            // 产品
            prdIndexId: queryForm.prdIndexId,
            // 渠道
            appFlag: queryForm.appFlag,
            // 用户
            visibleType: queryForm.visibleType
        };
        const data = await _this.$apis.getTableList(params);

        callback({ list: data.retList, total: data.totalCount });

        try {
        } catch (error) {
            _this.$msg.error("获取数据异常");
        }
    };

    return {
        queryForm,
        GetapiData,
        clickQueryBtn,
        clickResetBtn
    };
}
