import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    // 查询条件
    const accuseManageForm = reactive({
        complaintsId: "",
        uncomplaintsId: "",
        complaintsType1: "",
        complaintsType2: "",
        contentId: "",
        date1: "",
        date2: "",
        resetFields: function () {
            Object.keys(this).forEach((ele, index) => {
                this[ele] = this[ele] instanceof Function ? this[ele] : "";
            });
        }
    });

    // 获取表格数据index-2
    const GetapiData = async ($event) => {
        let { query, callback } = $event;
        let data = await that.$apis.successful();
        callback({
            list: [
                { id: "34523452", comType: "王小虎虎虎" },
                { id: "34523452", comType: "王小虎虎虎" }
            ]
        });
    };

    // 获取表格数据index-1
    const getcomTableDate = async ({ query, callback }) => {
        console.log(query);
        let params = {
            pageNum: query.currentPage,
            pageSize: query.pageSize || 10
        };
        let data = await that.$apis.getTableData({ ...accuseManageForm, ...params });
        callback({ list: data.data.tableDataList, total: data.data.totalCount });
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
        callback({ list: data.data.comtypes, total: data.totalCount });
    };
    return { accuseManageForm, GetapiData, getcomTableDate, getSelectData };
}
