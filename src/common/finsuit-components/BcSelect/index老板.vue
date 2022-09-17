<!--  -->
<template>
    <!-- value-key如果为id 因为有重复的产品id，会导致回显的输入框显示错误 -->
    <el-select :class="{ 'bc-select': true, 'auto-w': isAutoWidth }" ref="elSelect" :loading="loading" :value-key="itemNameKey" @visible-change="visibleChange($event)" :remote-method="remoteMethod">
        <!-- 特殊处理，隐藏域，解决回显的数据在list列表中不存在，导致回显失败的问题 -->
        <!-- 多选时回显未知v-model值 -->
        <template v-if="$attrs.multiple">
            <div v-if="item[itemValueKey]">
                <el-option v-for="item in modelValue" :key="item[itemValueKey]" :value="item" :label="item[itemNameKey]" class="default-option-hide"></el-option>
            </div>
        </template>
        <!-- 特殊处理，隐藏域，解决回显的数据在list列表中不存在，导致回显失败的问题 -->
        <!-- 单选时回显未知v-model值 -->
        <template v-else>
            <el-option class="default-option-hide" v-if="modelValue[itemValueKey]" :key="modelValue[itemValueKey]" :value="modelValue" :label="modelValue[itemNameKey]"></el-option>
        </template>

        <!-- 数据列表 -->
        <el-option v-for="item in dataset.list" :key="item[itemValueKey]" :value="item" :label="item[itemNameKey]"></el-option>

        <!-- 数据分页 -->
        <el-pagination
            v-model:current-page="query.currentPage"
            @current-change="currentChange"
            :hide-on-single-page="true"
            :pager-count="7"
            small
            layout="prev,pager,next,jumper,->,total"
            v-model:page-size="pageSize"
            prev-text="上一页"
            next-text="下一页"
            :total="dataset.total"></el-pagination>
    </el-select>
</template>

<script>
    import { ref, reactive, toRefs, onMounted, watch, getCurrentInstance, toRaw } from "vue";

    /**
     * bc-select二次封装，继承el-select所有props和emits，集成同步数据、异步数据、异步数据分页、回显单选未知数据、回显多选未知数据
     * 注意：单根节点时bc-select自动继承el-select所有属性和事件 v-bind=“$attrs” 详情参考el-select组件props
     */

    export default {
        props: {
            /**
             * options列表
             */
            list: {
                type: Array,
                default: () => []
            },
            /**
             * options总条数 可显示分页
             */
            total: {
                type: Number,
                default: 0
            },

            /**
             * 分页最大条数大小
             */
            pageSize: {
                type: Number,
                default: 10
            },

            /**
             * item label 键名
             */
            itemNameKey: {
                type: String,
                default: "name"
            },

            /**
             * item value 键名
             */
            itemValueKey: {
                type: String,
                default: "id"
            },

            /**
             * 是否设置为自适应宽度
             */
            isAutoWidth: {
                type: Boolean,
                default: true
            }
        },

        // 这里注意：必须声明事件列表，否则会进入$attrs中
        emits: ["GetApiData", "current-change"],

        setup(props, { emit, attrs }) {
            const { list, total, pageSize } = toRefs(props);
            const instance = getCurrentInstance();

            //初始化数据
            const state = reactive({
                // 借用v-model的值
                modelValue: null,
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
                },
                // 异步时的loading
                loading: false
            });

            /**
             * 初始化state data
             */
            const created = () => {
                state.modelValue = attrs.modelValue || {};
                state.dataset.list = list.value;
                state.dataset.total = total.value;
                state.query.pageSize = pageSize.value;
            };
            created();

            /**
             * 当分页变化时触发
             * 注意：pageNum无须赋值，因为:current-page为双向绑定关系
             */
            const currentChange = (pageNum) => {
                // 1、这里由 focus 代替 getCommmonSelectList执行
                // 2、解决切换页码关键字消失的问题
                instance.refs.elSelect.focus();
                emitGetApiData();

                // 派发到父级使用，父级需要的话
                emit("current-change", pageNum);
            };

            /**
             * 事件派发函数
             * 组件所有涉及到数据更改的动作都走这个函数
             */
            const emitGetApiData = () => {
                //  只有空数据的时候显示loading
                if (state.dataset.list.length === 0) state.loading = true;

                // 返回datatypeParam的原始对象，这样做的用处是断开响应式链接，避免父级的更改，看情况以后考虑放开这行代码
                let query = toRaw(state.query);

                //  数据的回调
                let callback = (dataset = {}) => {
                    state.loading = false;
                    state.dataset.list = dataset.list || [];
                    state.dataset.total = dataset.total || 0;
                };

                //  触发事件-父级调用接口请求数据
                emit("GetApiData", { query, callback });
            };

            /**
             * 当开启远程搜索时，关键字输入时触发事件通知接口调用
             */
            const remoteMethod = (queryValue) => {
                state.loading = true;
                // 输入时 将分页重置第一页
                state.query.currentPage = 1;
                // 记录关键字
                state.query.keywords = queryValue;
                // 触发事件去 - 发起请求
                emitGetApiData();
            };

            /**
             * 当el-select组件的visible-change事件触发时
             * 展开时：首次请求数据
             * 关闭时：清除查询条件的关键字
             */
            const visibleChange = ($event) => {
                // 每次展开时 列表为空时--调用数据
                if ($event === true && state.dataset.list.length === 0) {
                    emitGetApiData();
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
            };

            return {
                ...toRefs(state),
                currentChange,
                emitGetApiData,
                remoteMethod,
                visibleChange
            };
        }
    };
</script>
<style lang="less">
    /* 是否自适应宽度 */
    .auto-w {
        width: 100%;
    }

    /* 特殊处理 */
    .default-option-hide {
        display: none !important;
    }

    /* 控制下拉的最大高度，增加可视区域 */
    .el-select-dropdown__wrap {
        max-height: 400px;
    }

    /* 控制分页数字列表的宽度 防止抖动 */
    .el-select-dropdown .el-pagination .el-pager {
        width: 200px;
    }
</style>
