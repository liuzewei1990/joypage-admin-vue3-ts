import { h, reactive } from "vue";

/**
 * 表格逻辑区Api
 */
export default function () {
    // 删除按钮
    const deleteRow = (row) => {
        console.log(row);
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
                label: "帖子ID",
                prop: "id",
                setting: { disabled: true }
            },
            {
                label: "名称",
                prop: "name"
            },
            {
                label: "年龄",
                prop: "age"
            },
            {
                label: "性别",
                prop: "sex",
                render: (scope) => {
                    const { row } = scope;
                    const text = row.sex === 1 ? "男" : "女";
                    return h("span", {}, text);
                }
            },
            {
                label: "地区",
                prop: "city"
            }
        ],

        actionJson: {
            label: "操作",
            width: "100px",
            btns: [
                {
                    text: "删除",
                    click: deleteRow
                }
            ]
        }
    });

    return { tableConfig };
}
