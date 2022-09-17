import { ref, reactive, getCurrentInstance, useAttrs, useSlots, onMounted, toRaw } from "vue";

import exportFile from "../../../utils/exportFile";

export default function (param = {}, BcTableRefComponent) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    // 产品ID
    const prdIndexId = param.prdIndexId;
    // 曲线图类型
    const rateCurveGraphType = param.rateCurveGraphType;
    // 表格数据
    const tableConfig = reactive({
        list: [],
        total: 0,
        isShowRefresh: true
    });

    // 新增一行输入框UI
    const addRowInput = async () => {
        let rowForm = reactive({
            // table行类型 输入框或者展示
            type: "input",
            // 曲线图类型1七日年化2固定收益
            rateCurveGraphType: rateCurveGraphType,
            // 产品id
            prdIndexId: prdIndexId,
            // 日期
            dataDate: "",
            // 七日年化
            sevenDayAnnualizedRate: "",
            // 万份收益
            tenThousandEarnings: "",
            // 业绩走势
            performanceTrend: "",
            // 单位净值
            averageNav: "",
            // 累计净值
            accumulatedNet: ""
        });
        tableConfig.list.unshift(rowForm);
    };

    // 新增接口
    const addPost = async (row) => {
        try {
            let params = {
                ...toRaw(row)
            };
            let data = await _this.$apis.saveRateCurveGraph(params);
            _this.$msg.success("添加成功");
            BcTableRefComponent.value.emitGetApiData();
        } catch (error) {
            _this.$msg.error("添加失败");
        }
    };

    // 删除接口
    const delPost = async (row) => {
        try {
            await _this.$confirm("确定删除吗?");
            let params = {
                rateCurveGraphType: rateCurveGraphType,
                id: row.id
            };
            let data = await _this.$apis.deletPrdGraphInfo(params);
            _this.$msg.success("删除成功");
            BcTableRefComponent.value.emitGetApiData();
        } catch (error) {
            _this.$msg.error("操作失败");
        }
    };

    // 获取表格数据
    const GetapiData = async ($event) => {
        let { query, callback } = $event;
        let params = {
            currentPage: query.currentPage,
            length: query.pageSize,
            rateCurveGraphType: rateCurveGraphType,
            prdIndexId: prdIndexId
        };
        let data = await _this.$apis.selectPrdGraphInfo(params);
        tableConfig.list = data.pageList.retList || [];
        // tableConfig.list = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]
        tableConfig.total = data.pageList.totalCount || 0;
        callback();
        // 默认给一行输入框
        if (query.currentPage == 1) addRowInput();
        try {
        } catch (error) {
            _this.$msg.error("获取数据异常");
        }
    };

    // 导入
    const importRateCurveGraph = async () => {};
    // 导入成功
    const onSuccess = async (res) => {
        _this.$msg.success("导入成功");
        BcTableRefComponent.value.emitGetApiData();
    };
    // 导出失败
    const onError = (res) => {
        _this.$msg.error("导出失败，请重试");
    };

    // 导出
    const exportRateCurveGraph = async () => {
        exportFile(_this.$config.baseUrlHost + `/financeChildController/exportRateCurveGraph?rateCurveGraphType=${rateCurveGraphType}&prdIndexId=${prdIndexId}`);
    };

    return {
        GetapiData,
        addPost,
        delPost,
        tableConfig,
        exportRateCurveGraph,
        importRateCurveGraph,
        onSuccess,
        onError
    };
}
