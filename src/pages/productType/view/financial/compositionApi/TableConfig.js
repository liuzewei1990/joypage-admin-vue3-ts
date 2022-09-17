import { h, reactive, getCurrentInstance, toRaw, ref } from "vue";
import { ElForm, ElImage, ElLink, ElSpace, ElTag, ElButton, ElIcon } from "element-plus";
import { useRouter } from "vue-router";
import { default as SelectData, rateCurveGraphTypeList, riskLevelList, rateUnitList, isSupervisionList, nationalTypeList, bankDockTypeList } from "./SelectData";
/**
 * 表格逻辑区Api
 */
export default function (BcTableRefComponent) {
    const router = useRouter();
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 删除按钮
    const deleteRow = async (scope) => {
        await _this.$confirm("确定删除吗?");
        try {
            const { row } = scope;
            let params = { id: row.id };
            let data = await _this.$apis.del(params);
            _this.$msg.success("删除成功");
            BcTableRefComponent.value.emitGetApiData();
        } catch (error) {
            _this.$msg.error("操作失败");
        }
    };

    // 修改
    const updateRow = async (scope) => {
        const { row } = scope;
        let o = toRaw(row);
        let params = { id: o.id };
        let data = await _this.$apis.queryById(params);
        router.push({ path: "/financial/add", query: { row: encodeURIComponent(JSON.stringify(data.success)), pageType: "2" } });
    };

    // 上下架
    const changeStatus = async (scope) => {
        await _this.$confirm("确定执行该操作吗?");
        try {
            const { row } = scope;
            // 1-上架  2-下架
            let params = { id: row.id, isEnabled: row.isEnabled == "2" ? "1" : "2" };
            let data = await _this.$apis.enabled(params);
            _this.$msg.success("操作成功");
            BcTableRefComponent.value.emitGetApiData();
        } catch (error) {
            _this.$msg.error("操作失败");
        }
    };

    // 编辑利率曲线弹窗
    const rateCurveGraphDialog = reactive({
        show: false,
        rateCurveGraphType: "",
        prdIndexId: ""
    });

    // 利率曲线-点击编辑按钮
    const handelRateCurveGraphBtn = (scope) => {
        const { row } = scope;
        rateCurveGraphDialog.show = true;
        rateCurveGraphDialog.rateCurveGraphType = row.rateCurveGraphType || "1";
        rateCurveGraphDialog.prdIndexId = row.id;
    };

    /**
     * 表格列配置
     */
    const tableConfig = reactive({
        // 列管理是否显示
        isShowGrid: true,
        // 不显示分页
        isShowPagination: true,
        // 是否显示刷新按钮
        isShowRefresh: true,
        // 表格列配置
        columnJson: [
            {
                label: "产品ID",
                prop: "id",
                setting: { disabled: true }
            },
            {
                label: "产品名称",
                prop: "prdName"
            },
            {
                label: "产品类型",
                prop: "typeName",
                width: "80px"
            },
            {
                label: "所属机构",
                prop: "orgName"
            },
            {
                label: "期限",
                prop: "period",
                width: "50px"
            },
            {
                label: "期限单位",
                prop: "periodUnit",
                render: (scope) => {
                    const { row } = scope;
                    return _this.$utils.findSelectTextArr(row.periodUnit, rateUnitList).join("");
                },
                width: "80px"
            },
            {
                label: "收益率(%)",
                prop: "rate",
                width: "85px"
            },
            {
                label: "最小起购金额(元)",
                prop: "minAmount",
                width: "115px"
            },
            {
                label: "风险等级",
                prop: "riskLevel",
                render: (scope) => {
                    const { row } = scope;
                    return _this.$utils.findSelectTextArr(row.riskLevel, riskLevelList).join("");
                },
                width: "80px"
            },
            {
                label: "产品区域",
                prop: "nationalType",
                render: (scope) => {
                    const { row } = scope;
                    return _this.$utils.findSelectTextArr(row.nationalType, nationalTypeList).join("");
                }
            },
            {
                label: "利率曲线",
                prop: "sex",
                width: "70px",
                render: (scope) => {
                    const { row } = scope;
                    return h(ElButton, { size: "mini", type: "text", style: { padding: "0px 8px", minHeight: "22px" }, onclick: () => handelRateCurveGraphBtn(scope) }, () => "编辑");
                }
            },
            {
                label: "更改状态",
                prop: "sex",
                width: "70px",
                render: (scope) => {
                    const { row } = scope;
                    const hButton = (text, type) =>
                        h(ElButton, { onclick: () => changeStatus(scope), type: "text", size: "mini", style: { padding: "0px 8px", minHeight: "22px", color: type } }, () => text);
                    const Button = row.isEnabled == "2" ? hButton("上架", "#67C23A") : hButton("下架", "#F56C6C");
                    return Button;
                }
            }
        ],

        actionJson: {
            label: "操作",
            width: "100px",
            fixed: "right",
            btns: [
                {
                    text: "修改",
                    click: updateRow
                },
                {
                    text: "删除",
                    click: deleteRow
                }
            ]
        }
    });

    return { tableConfig, rateCurveGraphDialog };
}
