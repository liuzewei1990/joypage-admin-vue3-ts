import { t } from "element-plus/lib/locale";
import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    // 获取活动位置管理表格数据index-2
    const getActivitiesData = async ($event) => {
        let { query, callback } = $event;
        let data = await that.$apis.getActivitiesLocal();
        callback({
            list: data.data.tableDataList,
            total: data.data.totalCount
        });
    };
    // 修改 活动位置管理表格数据index-2
    const changeActivitiesData = async ($event) => {
        console.log($event, "修改数据");
        let data = await that.$apis.successful();
        instance.refs["BcTableactivity"].emitGetApiData();
    };

    // 获取活动管理表格数据 index-1
    const getActivitiesTableDate = async ({ query, callback }) => {
        let data = await that.$apis.getActivities();
        callback({
            list: data.data.tableDataList,
            total: data.data.totalCount
        });
    };

    // 新增活动保存
    const saveActivities = (form, acctivityRulesRef) => {
        // instance.refs["acctivityRules"].$refs["elForm"]
        acctivityRulesRef.elForm.validate(async (valid) => {
            if (!valid) {
                return;
            }
            console.log(form, "保存活动成功");
            let data = await that.$apis.successful(form);
            that.$router.back();
        });
    };

    // 当获取焦点时  投诉 内容类型
    const getSelectData = async ($event) => {
        let { query, callback } = $event;

        let params = {
            pageNum: query.currentPage,
            pageSize: 10,
            contentTypeId: 3,
            name: query.keywords //后端仅支持产品模糊查询，机构和资讯都没有
        };

        let data = await that.$apis.getComType(params);
        callback({
            list: data.data.comtypes,
            total: data.totalCount
        });
    };
    return {
        getActivitiesData,
        getActivitiesTableDate,
        getSelectData,
        changeActivitiesData,
        saveActivities
    };
}
