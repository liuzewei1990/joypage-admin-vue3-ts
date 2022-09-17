import { h, reactive, getCurrentInstance, toRaw } from "vue";
import { useRouter } from "vue-router";

/**
 * 表格逻辑区Api
 */
export default function (BcTableRefComponent) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();

    // 修改按钮
    const updataRow = async (scope) => {
        const { row } = scope;
        let o = toRaw(row);
        router.push({ name: "blendReward-add", query: { row: encodeURIComponent(JSON.stringify(o)), pageType: "2" } });
    };

    // 删除按钮
    const deleteRow = async (scope) => {
        const { row } = scope;
        await _this.$confirm("确定删除吗?");
        let params = { id: row.id };
        let data = await _this.$apis.delRewardById(params);
        _this.$msg.success("删除成功");
        BcTableRefComponent.value.emitGetApiData();
    };

    /**
     * 表格列配置
     */
    const tableConfig = reactive({
        // 列管理是否显示
        isShowGrid: false,
        // 不显示分页
        isShowPagination: true,
        // 是否显示刷新按钮
        isShowRefresh: true,
        // 表格列配置
        columnJson: [
            {
                label: "ID",
                prop: "id",
                setting: { disabled: true }
            },
            {
                label: "奖励名称",
                prop: "rewardName"
            },
            {
                label: "奖励类型",
                prop: "mixType",
                render: (scope) => {
                    const { row } = scope;
                    return _this.$utils.findSelectTextArr(row.mixType, _this.$json.blendRewardSelect).join("");
                }
            },
            {
                label: "适用类型",
                prop: "rewardScope",
                render: (scope) => {
                    const { row } = scope;
                    return _this.$utils.findSelectTextArr(row.rewardScope, _this.$json.rewardScopeArr).join("");
                }
            },
            {
                label: "适用范围",
                prop: "rewardScopeName"
            },
            {
                label: "奖励描述",
                prop: "rewardDescribe"
            }
        ],

        actionJson: {
            label: "操作",
            width: "100px",
            btns: [
                {
                    text: "修改",
                    click: updataRow
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
