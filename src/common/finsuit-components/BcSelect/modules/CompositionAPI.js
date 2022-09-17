import { reactive, toRefs, toRaw, getCurrentInstance, ref } from "vue";

export default function (SelectRefComponent) {
    const instance = getCurrentInstance();

    const state = reactive({
        // 下拉列表
        dataset: {
            list: [],
            total: 0
        },
        // 异步时的查询条件
        query: {
            pageSize: 10,
            currentPage: 1,
            keywords: ""
        }
    });

    // 异步时的loading
    const loading = ref(false);

    const api = {
        /**
         * 事件派发函数
         * 组件所有涉及到数据更改的动作都走这个函数
         */
        emitGetApiData() {
            //  只有空数据的时候显示loading
            if (state.dataset.list.length === 0) loading.value = true;

            // 返回datatypeParam的原始对象，这样做的用处是断开响应式链接，避免父级的更改，看情况以后考虑放开这行代码
            let query = toRaw(state.query);

            //  数据的回调
            let callback = (dataset = {}) => {
                loading.value = false;
                state.dataset.list = dataset.list || [];
                state.dataset.total = dataset.total || 0;
            };

            //  触发事件-父级调用接口请求数据
            instance.emit("GetApiData", { query, callback });
        },

        currentChange(pageNum) {
            // 1、这里由 focus 代替 getCommmonSelectList执行
            // 2、解决切换页码关键字消失的问题
            SelectRefComponent.value.focus();
            api.emitGetApiData();

            // 派发到父级使用，父级需要的话
            instance.emit("current-change", pageNum);
        },

        /**
         * 当开启远程搜索时，关键字输入时触发事件通知接口调用
         */
        remoteMethod(queryValue) {
            loading.value = true;
            // 输入时 将分页重置第一页
            state.query.currentPage = 1;
            // 记录关键字
            state.query.keywords = queryValue;
            // 触发事件去 - 发起请求
            api.emitGetApiData();
        },

        /**
         * 当el-select组件的visible-change事件触发时
         * 展开时：首次请求数据
         * 关闭时：清除查询条件的关键字
         */
        visibleChange($event) {
            // 每次展开时 列表为空时--调用数据
            if ($event === true && state.dataset.list.length === 0) {
                api.emitGetApiData();
            }

            // 每当收起时 处理关键字
            if ($event === false) {
                // 收起时 如果有关键字同时清空列表，避免展开时显示旧数据
                if (state.query.keywords != "") {
                    state.dataset.list = [];
                    state.dataset.total = 0;
                }

                // 收起时清空关键字
                state.query.keywords = "";
            }
        }
    };

    return {
        loading,
        ...state,
        ...api
    };
}
