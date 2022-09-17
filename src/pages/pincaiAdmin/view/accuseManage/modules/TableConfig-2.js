import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    // 修改
    const openEdit = (scope) => {
        const item = scope.row;
        const parms = {
            confirmButtonText: "保存",
            cancelButtonText: "取消",
            inputPattern: /\S/,
            inputErrorMessage: "不能为空",
            inputValue: item && item.comType
        };
        that.$prompt("请输入投诉类型", "提示", parms)
            .then(({ value }) => {
                that.$message({
                    type: "success",
                    message: `保存成功`
                });
                instance.refs["BcTable"].emitGetApiData();
            })
            .catch((error) => {});
    };
    // 删除
    const handleDelete = async (scope) => {
        console.log(scope.row);
        await that.$apis.successful();
        that.$message.success({
            message: "移除成功！",
            type: "success"
        });
        instance.refs["BcTable"].emitGetApiData();
    };

    const tableConfig = reactive({
        columnJson: [
            {
                prop: "id",
                label: "类型ID"
            },
            {
                prop: "comType",
                label: "投诉类型"
            }
        ],
        actionJson: {
            label: "操作",
            fixed: "right",
            width: "100px",
            btns: [
                {
                    text: "移除",
                    click: handleDelete
                },
                {
                    text: "修改",
                    click: openEdit
                }
            ]
        }
    });
    return { tableConfig };
}
