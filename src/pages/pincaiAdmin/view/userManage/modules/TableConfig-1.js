import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    // 下架删除
    const deteleContent = async (scope) => {
        console.log(scope.row);

        that.$confirm("是否删除该用户?", "提示", {
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
                instance.refs["BcTableAcc"].emitGetApiData();
            })
            .catch(() => {});
    };
    const tableConfig = {
        columnJson: [
            {
                prop: "vipId",
                label: "会员ID"
            },
            {
                prop: "nickName",
                label: "昵称"
            },
            {
                prop: "sbId",
                label: "识贝ID"
            },
            {
                prop: "introduction",
                label: "简介"
            },
            {
                prop: "sex",
                label: "性别"
            },
            {
                prop: "interDate",
                label: "注册时间"
            },
            {
                prop: "vipJf",
                label: "会员积分"
            },
            {
                prop: "fansNum",
                label: "粉丝数量"
            },
            {
                prop: "focusNum",
                label: "关注数量"
            },
            {
                prop: "praiseNum",
                label: "获赞数量"
            },
            {
                prop: "videoNum",
                label: "小视频数量"
            },
            {
                prop: "postNum",
                label: "帖子数量"
            },
            {
                prop: "professional",
                label: "职业"
            },
            {
                prop: "region",
                label: "地区"
            }
        ],
        actionJson: {
            label: "操作",
            btns: [
                {
                    text: "移除",
                    click: deteleContent
                }
            ]
        }
    };
    return {
        tableConfig
    };
}
