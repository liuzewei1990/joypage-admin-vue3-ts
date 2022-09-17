import { ref, reactive, toRaw, getCurrentInstance } from "vue";

export default (tc = {}) => {
    const instance = getCurrentInstance();

    // 表格数据
    const tableData = reactive({ list: tc.list, total: tc.total });

    // 基础查询条件
    const query = reactive({ pageSize: tc.pageSize, currentPage: tc.currentPage });

    // el-table loading...
    const loading = ref(false);

    // 派发事件
    const emitGetApiData = () => {
        loading.value = true;
        //  数据的回调
        let callback = (dataset = {}) => {
            if (dataset.list) {
                tableData.list = dataset.list || [];
                tableData.total = dataset.total || 0;
            }
            setTimeout(() => {
                loading.value = false;
            }, 100);
        };
        instance.emit("GetApiData", { query: toRaw(query), callback });
    };

    // 指定页码-刷新数据
    const toTablePage = (page) => {
        if (page) query.currentPage = page;
        emitGetApiData();
    };

    // pageSize变化时 刷新当前页码
    const pageSizeChange = (pageSize) => {
        query.pageSize = pageSize;
        toTablePage();
    };

    // 页码变化时调用
    const currentPageChange = (pageNum) => {
        toTablePage(pageNum);
    };

    // 筛选相关-点击查询
    const startQueryBtn = () => {
        toTablePage(1);
    };

    // 筛选相关-点击重置
    const resetQueryBtn = (form) => {
        console.log(form);
        form && form.resetFields();
        toTablePage(1);
    };

    // 入口初始化
    // const init = async () => {
    //     await emitGetApiData();
    // }

    // init();

    return {
        tableData,
        query,
        loading,
        startQueryBtn,
        resetQueryBtn,
        pageSizeChange,
        currentPageChange,
        emitGetApiData
    };
};
