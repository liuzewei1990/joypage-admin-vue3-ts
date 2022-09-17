import { getCurrentInstance, reactive, toRaw } from "vue";

/**
 * 查询逻辑区Api
 */
export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    console.log("createCheckForm", _this);
    /**
     * 表单查询字段
     */
    const queryForm = reactive({
        item1: "",
        item2: "item2",
        item3: 1
    });

    // 获取表格数据 selectTMPage
    const getSelectTMPage = () => {
        _this.$apis.selectTMPage().then((res) => {
            console.log("getSelectTMPage", res);
        });
    };

    return { queryForm, getSelectTMPage };
}
