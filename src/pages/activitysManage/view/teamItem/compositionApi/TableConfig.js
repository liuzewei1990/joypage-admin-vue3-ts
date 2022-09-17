import { getCurrentInstance, h, reactive, toRaw } from "vue";
import { useRouter } from "vue-router";
import { SuccessStatusCol } from "@common/finsuit-components/BcTable/columnContent.js";

/**
 * 表格逻辑区Api
 */
export default function (BcTableRefComponent) {
    const router = useRouter();
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 修改
    const updateRow = (scope) => {
        const { row } = scope;
        let o = toRaw(row);
        router.push({ path: "/teamItem/add", query: { row: encodeURIComponent(JSON.stringify(o)), pageType: "2" } });
    };

    // 复制
    const copyRow = (scope) => {
        const { row } = scope;
        let o = toRaw(row);
        delete o.id;
        router.push({ path: "/teamItem/add", query: { row: encodeURIComponent(JSON.stringify(o)), pageType: "3" } });
    };

    // 删除按钮
    const deleteRow = async (scope) => {
        await _this.$confirm("确定删除吗?");
        const { row } = scope;
        let params = { id: row.id };
        let data = await _this.$apis.delActTeam(params);
        _this.$msg.success("删除成功");
        BcTableRefComponent.value.emitGetApiData();
    };

    /**
     * 表格列配置
     */
    const tableConfig = reactive({
        // 表格列配置
        columnJson: [
            {
                label: "编号",
                prop: "id",
                width: "50px",
                setting: { disabled: true }
            },
            {
                label: "产品名称",
                prop: "prdName",
                width: "200px"
            },
            {
                label: "拼团排序",
                prop: "sort"
            },
            {
                label: "奖励名称",
                prop: "rewardName"
            },
            {
                label: "渠道",
                prop: "appFlag",
                render: (scope) => {
                    const { row } = scope;
                    return _this.$utils.findSelectTextArr(row.appFlag, _this.$json.appFlagSelectMore).join("、");
                }
            },
            {
                label: "设备",
                prop: "deviceType",
                render: (scope) => {
                    const { row } = scope;
                    return _this.$utils.findSelectTextArr(row.deviceType, _this.$json.deviceSelect).join("、");
                }
            },
            {
                label: "可见用户",
                prop: "visibleType",
                render: (scope) => {
                    const { row } = scope;
                    return _this.$utils.findSelectTextArr(row.visibleType, _this.$json.visibleSelect).join("、");
                }
            },
            {
                label: "拼团状态",
                prop: "status",
                render: (scope) => {
                    const { row } = scope;
                    const item = _this.$json.statusSelect.find((item) => item.id == row.status);
                    return h(SuccessStatusCol, { isSucc: item.id == "1", text: item.name });
                }
            }
        ],

        actionJson: {
            label: "操作",
            right: "right",
            width: "120px",
            btns: [
                {
                    text: "修改",
                    click: updateRow
                },
                {
                    text: "复制",
                    click: copyRow
                },
                {
                    text: "删除",
                    click: deleteRow
                }
            ]
        }
    });

    return { tableConfig };
}
