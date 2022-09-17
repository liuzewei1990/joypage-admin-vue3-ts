import { ElTag } from "element-plus";
import { getCurrentInstance, h, reactive, toRaw } from "vue";
import { useRouter } from "vue-router";

/**
 * 表格逻辑区Api
 */
export default function ({ userSelect, appFlagSelect, statusSelect, deviceSelect }) {
    const router = useRouter();
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 修改
    const updateRow = (scope) => {
        const { row } = scope;
        let o = toRaw(row);
        router.push({ path: "/invest/add", query: { row: encodeURIComponent(JSON.stringify(o)), pageType: "2" } });
    };

    // 复制
    const copyRow = (scope) => {
        const { row } = scope;
        let o = toRaw(row);
        delete o.id;
        router.push({ path: "/invest/add", query: { row: encodeURIComponent(JSON.stringify(o)), pageType: "3" } });
    };

    // 删除按钮
    const deleteRow = async (scope) => {
        await _this.$confirm("确定删除吗?");
        const { row } = scope;
        let params = { id: row.id };
        let data = await _this.$apis.delActInvest(params);
        _this.$msg.success("删除成功");
        instance.refs["BcTable"].emitGetApiData();
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
                width: "100px",
                setting: { disabled: true }
            },
            {
                label: "银行名称",
                prop: "orgName",
                setting: { disabled: true }
            },
            {
                label: "产品名称",
                prop: "prdName",
                setting: { visible: true }
            },
            {
                label: "开始时间",
                prop: "startTime",
                setting: { visible: false }
            },
            {
                label: "结束时间",
                prop: "endTime",
                setting: { visible: false }
            },
            {
                label: "奖励标签",
                prop: "rewardDesc",
                setting: { visible: false }
            },
            {
                label: "可见用户",
                width: "100px",
                // 用这个会多次执行
                // formatter: (row) => {
                //     return userSelect.find(item => item.id == row.visibleType).name
                // },
                render: (scope) => {
                    const { row } = scope;
                    return findSelectText(row.visibleType, userSelect).join("、");
                }
            },
            {
                label: "渠道",
                width: "150px",
                prop: "appFlag",
                render: (scope) => {
                    const { row } = scope;
                    return findSelectText(row.appFlag, appFlagSelect).join("、");
                }
            },
            {
                label: "设备",
                width: "100px",
                render: (scope) => {
                    const { row } = scope;
                    return findSelectText(row.deviceType, deviceSelect).join("、");
                }
            },
            {
                label: "状态",
                width: "100px",
                render: (scope) => {
                    const { row } = scope;
                    const text = findSelectText(row.status, statusSelect).join("、");
                    return h(ElTag, { size: "mini", type: row.status == "1" ? "success" : "info" }, { default: () => text });
                }
            }
        ],

        actionJson: {
            label: "操作",
            fixed: "right",
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

    function findSelectText(target = "", selectArrs = []) {
        let targetArrs = (target + "").split(/，|,/);
        return targetArrs.map((key) => (selectArrs.find((item) => item.id == key) || {}).name);
    }

    return { tableConfig };
}
