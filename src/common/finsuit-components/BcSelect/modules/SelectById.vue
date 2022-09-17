<!--  -->
<template>
    <el-select :class="{ 'bc-select': true, 'auto-w': isAutoWidth }" ref="SelectRefComponent" :loading="loading" @visible-change="visibleChange($event)">
        <!-- 数据列表 -->
        <el-option v-for="item in dataset.list" :key="item[itemValueKey]" :value="item[itemValueKey]" :label="item[itemNameKey]"></el-option>
    </el-select>
</template>

<script>
    import { toRefs, getCurrentInstance, ref } from "vue";
    import CompositionAPI from "./CompositionAPI";
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
        emits: ["GetApiData"],

        setup(props, { emit, attrs }) {
            const SelectRefComponent = ref(null);
            const { list } = toRefs(props);
            const { dataset, loading, visibleChange, emitGetApiData } = CompositionAPI(SelectRefComponent);

            // 初始化
            dataset.list = list.value;

            // emitGetApiData();
            return {
                SelectRefComponent,
                dataset,
                loading,
                visibleChange,
                emitGetApiData
            };
        }
    };
</script>
<style lang="less" scoped></style>
