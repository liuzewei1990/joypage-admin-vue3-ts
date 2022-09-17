import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    // 多选框
    const selectionChange = (data) => {
        console.log(data);
    };

    // 获取官方账户表格数据
    const getOfficialAccount = async ({ query, callback }) => {
        let data = await that.$apis.getOfficialAccount();
        callback({
            list: data.data.tableDataList,
            total: data.data.totalCount
        });
    };
    // 新增官方账户
    const sureAddOfficialData = (formDate) => {
        console.log(formDate, "formdaraa");
    };

    // 官方推荐用户 大V ---------搜索表单
    const hotAccountForm = reactive({
        sbId: "",
        startDate: [], // 发布时间
        fansNum: [], // 粉丝
        focusNum: [], // 关注
        praiseNum: [], // 获赞
        videoNum: [], // 视频
        region: [] // 地区
    });
    // 官方推荐用户 大V ---------获取表格数据
    const getHotAccount = async ({ query, callback }) => {
        let data = await that.$apis.getHotAccount();
        callback({
            list: data.data.tableDataList,
            total: data.data.totalCount
        });
    };

    // 官方推荐用户 大V ---------批量移除
    const removeGroup = (id) => {
        console.log("remove", id);
    };
    // 官方推荐用户 大V ---------添加大V
    const sureAddVData = (forms) => {
        console.log(forms);
    };

    return {
        getOfficialAccount,
        selectionChange,
        sureAddOfficialData,
        sureAddVData,

        getHotAccount,
        hotAccountForm
    };
}
