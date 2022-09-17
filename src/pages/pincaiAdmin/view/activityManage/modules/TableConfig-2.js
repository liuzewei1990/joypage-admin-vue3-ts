import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    // 修改内容
    const acctivityFormVisible = ref(false);
    let FormData = ref({});
    const changeContent = (scope) => {
        acctivityFormVisible.value = true;
        FormData.value = scope;
    };
    // 下架删除
    const deteleContent = async (scope) => {
        console.log(scope.row);

        that.$confirm("是否删除该活动?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(async () => {
                await that.$apis.successful();
                that.$message({ type: "success", message: "删除成功!" });
                instance.refs["BcTable"].emitGetApiData();
            })
            .catch(() => {});
    };
    const tableConfig = {
        columnJson: [
            {
                prop: "actLocation",
                label: "活动位置"
            },
            {
                prop: "device",
                label: "设备"
            },
            {
                prop: "channle",
                label: "投放渠道"
            },
            {
                prop: "actNumber",
                label: "活动数量"
            },
            {
                prop: "isOpen",
                label: "是否开启"
            }
        ],
        actionJson: {
            label: "操作",
            btns: [
                { text: "修改", click: changeContent },
                { text: "删除", click: deteleContent }
            ]
        }
    };

    return { tableConfig, acctivityFormVisible, FormData };
}
