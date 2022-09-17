import { getCurrentInstance, reactive, toRaw, ref } from "vue";

/**
 * 查询逻辑区Api
 */
export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    /**
     * 表单查询字段
     */
    // const queryForm = reactive({
    //     item1: "",
    //     item2: "item2",
    //     item3: 1
    // })

    //表单请求回来的数据
    const tableList = ref([]);

    // 获取表格数据 selectTMPage
    const getSelectTMPage = () => {
        _this.$apis.selectTMPage().then((res) => {
            console.log("getSelectTMPage", res.success);
            tableList.value = res.success || [];
        });
    };

    // // 获取表格数据
    // const GetapiData = async ($event,item) => {
    //     let { query, callback } = $event
    //     console.log("GetapiData：", query);
    //     const params = {
    //         currentPage: query.currentPage,
    //         pageSize: query.pageSize,
    //         ...toRaw(queryForm)
    //     }
    //     callback({list:item.memberPageButtons})
    //     try {
    //     } catch (error) {
    //         _this.$msg.error("获取数据异常")
    //     }
    // }

    return {
        // queryForm,
        tableList,
        // GetapiData,
        getSelectTMPage
    };
}
