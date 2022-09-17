import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    // 修改内容
    const changeContent = (scope) => {
        console.log(scope);
        that.$router.push({
            path: "/activityManage/add",
            query: {
                id: "1243"
            }
        });
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
                that.$message({
                    type: "success",
                    message: "删除成功!"
                });
                instance.refs["BcTable"].emitGetApiData();
            })
            .catch(() => {});
    };
    const tableConfig = {
        columnJson: [
            {
                prop: "actName",
                label: "活动名称"
            },
            {
                prop: "icon",
                label: "icon"
            },
            {
                prop: "type",
                label: "类型"
            },
            {
                prop: "orderBy",
                label: "排序"
            },
            {
                prop: "seeUsers",
                label: "可见用户"
            },
            {
                prop: "local",
                label: "位置"
            },
            {
                prop: "isShow",
                label: "是否在首页热门活动展示"
            },
            {
                prop: "channel",
                label: "渠道"
            },
            {
                prop: "equipment",
                label: "设备"
            }
        ],
        actionJson: {
            label: "操作",
            btns: [
                {
                    text: "修改",
                    click: changeContent
                },
                {
                    text: "删除",
                    click: deteleContent
                }
            ]
        }
    };
    return {
        tableConfig
    };
}
