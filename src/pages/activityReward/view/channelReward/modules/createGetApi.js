import { getCurrentInstance, reactive, ref } from "vue";

export default function (itemData) {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    // 查询条件
    const FormData = reactive({
        benefitName: ""
    });
    const tabIndex = {
        1: "BcTableCode",
        2: "BcTableLink",
        3: "BcTableScanCode"
    };
    // 勾选数据
    let selectArr = reactive([]);

    // 获取表格数据
    const getActivitiesTable = async ({ query, callback }) => {
        let params = {
            currentPage: query.currentPage,
            pageSize: query.pageSize || 10,
            //1-激活码，2-链接，3-扫码
            benefitType: instance.attrs.modelValue || "1"
        };
        let data = await that.$apis.getActivitiesTable({ ...FormData, ...params });
        console.log("Data", data);
        callback({ list: data.retList, total: data.totalCount });
    };
    // 获取弹框--券码数据
    const getjihuomaCode = async ({ query, callback }) => {
        let params = {
            currentPage: query.currentPage,
            pageSize: query.pageSize || 10,
            benefitConfigId: itemData.id
        };
        let data = await that.$apis.getjihuomaCode(params);
        callback({ list: data.retList, total: data.totalCount });
    };
    // 选择--勾选框
    const selectionChange = (arg) => {
        selectArr = arg;
    };
    // 删除所选---批量删除
    const delteAll = async () => {
        if (!selectArr.length) {
            that.$message({ type: "warning", message: "请先勾选需要删除的数据!" });
            return;
        }
        const params = selectArr.map((i) => i.id);
        let data = await that.$apis.deleteAll(params);
        instance.refs[tabIndex[instance.attrs.modelValue]].emitGetApiData();
        that.$message({ type: "success", message: "删除成功!" });
    };
    return { FormData, getActivitiesTable, delteAll, selectionChange, getjihuomaCode };
}
