<!-- eslint-disable vue/no-mutating-props -->
<!--  -->
<template>
    <!-- value-key如果为id 因为有重复的产品id，会导致回显的输入框显示错误 -->
    <el-select
        :class="{ 'bc-select': true, 'auto-w': isAutoWidth }"
        ref="SelectRefComponent"
        :loading="loading"
        :value-key="itemNameKey"
        @visible-change="visibleChange($event)"
        :remote-method="remoteMethod">
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
    import CompositionAPI from "./CompositionAPI";

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
            const SelectRefComponent = ref(null);

            const { list, total, pageSize } = toRefs(props);
            const { dataset, query, loading, currentChange, remoteMethod, visibleChange, emitGetApiData } = CompositionAPI(SelectRefComponent);
            const modelValue = ref(attrs.modelValue || {}); // 借用v-model的值

            // 初始化
            dataset.list = list.value;
            dataset.total = total.value;
            query.pageSize = pageSize.value;

            return {
                SelectRefComponent,
                modelValue,
                dataset,
                query,
                loading,
                currentChange,
                remoteMethod,
                visibleChange,
                emitGetApiData
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
