<!--  -->
<template>
    <section class="form-list-box">
        <!-- 列头 -->
        <el-row class="row-col-title" v-if="isShowTitle">
            <div :style="{ width: item.width }" v-for="item in columnConfig" :key="item.title">
                <el-form-item :show-message="false" :label="item.title" :rules="{ required: item.required }"></el-form-item>
            </div>
        </el-row>
        <!-- 列内容 -->
        <el-row class="row-col-content" v-show="true">
            <slot></slot>
        </el-row>
    </section>
</template>

<script setup>
    import { ref, reactive, getCurrentInstance, useAttrs, useSlots, provide, computed, h } from "vue";
    import RenderDom from "@common/finsuit-components/RenderDom";

    const props = defineProps({
        // 是否显示title
        isShowTitle: {
            type: Boolean,
            default: true
        }
    });

    // 列头配置
    const columnConfig = ref([]);

    // 注入到子组件中，收集数据
    provide("columnConfig", columnConfig);
</script>
<style lang="less" scoped>
    .form-list-box {
        border-top: none;
    }
    .row-col-title {
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #f7f7f7;
        color: #606266;
        font-size: 13px;
        border: 1px solid #ececec;
    }

    .row-col-content {
        border-bottom: 1px solid #ececec;
        border-left: 1px solid #ececec;
        border-right: 1px solid #ececec;
    }

    .flex-center {
        //   display: flex;
        //   flex-direction: column;
        //   align-items: center;
        //   justify-content: center;
    }
</style>
