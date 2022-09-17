import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    // 查看内容
    const checkContent = (scope) => {
        console.log(scope);
        that.$router.push({
            path: "/accuseManage/detail",
            query: { id: "1243" }
        });
    };
    // 下架删除
    const deteleContent = async (scope) => {
        console.log(scope.row);

        that.$confirm("是否确认下架该内容?", "提示", {
            confirmButtonText: "确认下架",
            cancelButtonText: "暂不处理",
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
                prop: "comNikename",
                label: "投诉人昵称"
            },
            {
                prop: "comId",
                label: "投诉人识贝ID"
            },
            {
                prop: "uncomNikename",
                label: "被投诉人昵称"
            },
            {
                prop: "uncomId",
                label: "被投诉人识贝ID"
            },
            {
                prop: "comType1",
                label: "投诉类型"
            },
            {
                prop: "comType2",
                label: "被投诉内容类型"
            },
            {
                prop: "uncomContentId",
                label: "被投诉内容ID"
            },
            {
                prop: "comDate",
                label: "投诉时间"
            }
        ],
        actionJson: {
            label: "操作",
            btns: [
                { text: "查看被投诉内容", click: checkContent },
                { text: "下架被投诉内容", click: deteleContent }
            ]
        }
    };
    return { tableConfig };
}
