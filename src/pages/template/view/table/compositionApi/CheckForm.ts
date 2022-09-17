import { getCurrentInstance, reactive, ref, toRaw } from "vue";

/**
 * 查询逻辑区Api
 */
export default function (BcTableRefComponent: any) {
    const instance = getCurrentInstance();
    const _this = instance?.appContext.config.globalProperties;

    /**
     * 表单查询字段
     */
    const queryForm = reactive({
        item1: "",
        item2: "item2",
        item3: 1
    });

    const a = ref(true);
    // 查询按钮
    const clickQueryBtn = () => {
        BcTableRefComponent.value.startQueryBtn();
    };

    // 重置按钮
    const clickResetBtn = () => {
        BcTableRefComponent.value.resetQueryBtn();
    };

    // 获取表格数据
    const GetapiData = async ($event: any) => {
        const { query, callback } = $event;
        console.log("GetapiData：", query);
        const params = {
            currentPage: query.currentPage,
            pageSize: query.pageSize,
            ...toRaw(queryForm)
        };

        // 这里调用接口，接口响应后需回调callback
        // ......
        setTimeout(() => {
            callback({
                list: [
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" },
                    { id: 1001, name: "小青", age: 22, sex: 1, city: "北京市" }
                ],
                total: 1
            });
        }, 500);
        try {
            console.log(222);
        } catch (error) {
            _this?.$msg.error("获取数据异常");
        }
    };

    return { queryForm, GetapiData, clickQueryBtn, clickResetBtn };
}
