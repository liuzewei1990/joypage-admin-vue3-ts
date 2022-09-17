<!-- eslint-disable vue/no-mutating-props -->
<!--  -->
<template>
    <!-- value-key如果为id 因为有重复的产品id，会导致回显的输入框显示错误 -->
    <el-select
        :class="{ 'bc-select': true, 'auto-w': isAutoWidth }"
        ref="elSelect"
        v-model="selectVaule"
        :loading="loading"
        @change="$emit('change', $event)"
        @blur="blur"
        @focus="focus"
        :value-key="itemNameKey"
        @visible-change="visibleChange($event)"
        :remote-method="remoteMethod">
        <!-- 特殊处理，隐藏域，解决回显的数据在list列表中不存在，导致回显失败的问题 -->
        <template v-if="$attrs.multiple">
            <!-- 多选 -->
            <div v-if="item[itemValueKey]">
                <el-option v-for="item in selectVaule" :key="item[itemValueKey]" :value="item" :label="item[itemNameKey]" class="default-option-hide"></el-option>
            </div>
        </template>
        <template v-else>
            <!-- 单选 -->
            <el-option class="default-option-hide" v-if="selectVaule[itemValueKey]" :key="selectVaule[itemValueKey]" :value="selectVaule" :label="selectVaule[itemNameKey]"></el-option>
        </template>

        <!-- 数据列表 -->
        <el-option v-for="item in dataset.list" :key="item[itemValueKey]" :value="item" :label="item[itemNameKey]"></el-option>

        <!-- 数据分页 -->
        <el-pagination
            v-model:current-page="datatypeParam.currentPage"
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
    import { ref, reactive, toRefs, onMounted, watch, getCurrentInstance } from "vue";

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
             * v-model
             */
            // value: {
            //   type: String,
            //   default: ""
            // },

            /**
             * input placeholder
             */
            // placeholder: {
            //   type: String,
            //   default: ""
            // },

            /**
             * 是否禁用
             */
            // disabled: {
            //   type: Boolean,
            //   default: false
            // },

            /**
             * 是否可搜索
             */
            // filterable: {
            //   type: Boolean,
            //   default: false
            // },

            /**
             * 是否为远程搜索
             */
            // remote: {
            //   type: Boolean,
            //   default: false
            // },

            /**
             * 是否可以清空选项
             */
            // clearable: {
            //   type: Boolean,
            //   default: false
            // },

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

            /**
             * 是否可以多选
             */
            // multiple: {
            //   type: Boolean,
            //   default: false
            // }
        },

        setup(props, context) {
            // console.log("context",context)
            const instance = getCurrentInstance();
            //初始化数据
            const state = reactive({
                selectVaule: "",
                // 机构列表
                dataset: {
                    list: [],
                    total: 0
                },
                datatypeParam: {
                    pageSize: 10,
                    currentPage: 1,
                    keywords: ""
                },
                isFlag: false,
                loading: false,
                select: ""
            });

            const elSelect = ref(null);
            console.log(instance.refs);
            //赋值
            const loadData = () => {
                state.selectVaule = context.attrs.modelValue;
                state.dataset.list = props.list;
                state.dataset.total = props.total;
                state.datatypeParam.pageSize = props.pageSize;
            };
            loadData();

            /*监听props*/
            // watch(()=>[state.selectVaule],([newSelect, oldSelect]) => {
            //   // console.log("watchselectVaule",newSelect)
            //   context.emit("update:modelValue", newSelect)
            // })

            onMounted(() => {
                state.select = elSelect.value;
            });
            //  重置 暂时用不上
            const resetData = () => {
                state.datatypeParam.currentPage = 1;
                state.datatypeParam.keywords = "";
            };

            const currentChange = (pageNum) => {
                // 注意：pageNum无须赋值，因为使用了:current-page.sync
                // 1、这里由 focus 代替 getCommmonSelectList执行
                // 2、解决切换页码关键字消失的问题
                state.select.focus();
                getCommmonSelectList();

                // 派发到父级使用，父级需要的话
                context.emit("paginationChange", pageNum);
            };

            // 获取数据
            const getCommmonSelectList = () => {
                //  只有空数据的时候显示loading
                if (state.dataset.list.length === 0) state.loading = true;

                // 拷贝实时参数
                let query = JSON.parse(JSON.stringify(state.datatypeParam));

                //  数据的回调
                let callback = (dataset = {}) => {
                    state.loading = false;
                    state.dataset.list = dataset.list || [];
                    state.dataset.total = dataset.total || 0;
                };

                //  触发事件-父级调用接口请求数据
                context.emit("GetApiData", { query, callback });
            };

            // 关键字输入时
            const remoteMethod = (queryValue) => {
                state.loading = true;
                // 输入时 将分页重置第一页
                state.datatypeParam.currentPage = 1;
                // 记录关键字
                state.datatypeParam.keywords = queryValue;
                // 触发事件去 - 发起请求
                getCommmonSelectList();
            };

            // 失去焦点情况关键字
            const blur = ($event) => {
                // 派发到父级使用，父级需要的话
                context.emit("blur", $event);
            };

            // 获取焦点调用数据
            const focus = ($event) => {
                // 派发到父级使用，父级需要的话
                context.emit("focus", $event);
            };

            // 当收起或展开时触发
            const visibleChange = ($event) => {
                // 每次展开时 列表为空时--调用数据
                if ($event === true && state.dataset.list.length === 0) {
                    getCommmonSelectList();
                }

                // 每当收起时 处理关键字
                if ($event === false) {
                    // 收起时 如果有关键字同时清空列表，避免展开时显示旧数据
                    if (state.datatypeParam.keywords != "") {
                        state.dataset.list = [];
                        state.dataset.total = 0;
                    }

                    // 收起时清空关键字
                    state.datatypeParam.keywords = "";
                }

                // 派发到父级使用，父级需要的话
                context.emit("visible-change", $event);
            };

            return {
                ...toRefs(state),
                resetData,
                currentChange,
                getCommmonSelectList,
                remoteMethod,
                blur,
                focus,
                visibleChange,
                elSelect
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
