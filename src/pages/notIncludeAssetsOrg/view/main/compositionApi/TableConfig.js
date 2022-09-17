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
        isShowGrid: false, //操作区筛选按钮，不展示
        isShowPagination: false, //分页不展示
        list: [], //列表数据
        // 表格列配置
        columnJson: [
            {
                label: "按钮名称",
                prop: "buttonName",
                width: "500px"
            },
            {
                label: "icon",
                prop: "age"
            },
            {
                label: "副标题文案类型",
                prop: "age"
            },
            {
                label: "副标题文案",
                prop: "age"
            },
            {
                label: "排序",
                prop: "age"
            },
            {
                label: "是否需要实名",
                prop: "age"
            },
            {
                label: "生效渠道",
                prop: "age"
            },
            {
                label: "是否启用",
                prop: "city"
            }
        ],

        actionJson: {
            label: "操作",
            width: "100px",
            btns: [
                {
                    text: "修改",
                    click: deleteRow
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
