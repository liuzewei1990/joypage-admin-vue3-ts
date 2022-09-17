<!--  -->
<template>
    <div class="form-list-item flex-center" :style="{ width: width }">
        <slot></slot>
    </div>
</template>

<script setup>
    import { ref, reactive, getCurrentInstance, useAttrs, useSlots, inject, h, watchEffect } from "vue";

    const props = defineProps({
        // 列标题
        title: {
            type: String,
            default: "标题"
        },
        // 列宽
        width: {
            type: String,
            default: "150px"
        },
        // 是否必填
        required: {
            type: Boolean,
            default: false
        }
    });

    const column = reactive({});
    // 收集列配置
    watchEffect(() => (column.width = props.width));
    watchEffect(() => (column.title = props.title));
    watchEffect(() => (column.required = props.required));

    // 注入配置列表
    const columnConfig = inject("columnConfig");
    // 将列配置push到配置列表中
    columnConfig.value.push(column);
</script>
<style lang="less" scoped>
    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form-list-item {
        padding: 5px 3px;
        box-sizing: border-box;
        /deep/ .el-form-item {
            margin: 0;
            width: 100%;
        }
        // 解决input水平不对齐问题
        /deep/.el-form-item__content {
            line-height: normal;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        // 缩小input两边slot的宽度
        /deep/ .el-input-group__prepend,
        /deep/.el-input-group__append {
            padding: 0 5px;
        }

        /deep/.el-input__inner {
            padding: 0 6px;
        }
    }
</style>
