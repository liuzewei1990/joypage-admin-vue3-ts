<!-- eslint-disable vue/no-mutating-props -->
<!--  -->
<template>
    <!-- prop : 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的-->
    <el-form-item :label="config.label" :prop="prop + '.modelValue'">
        <component :is="config.componentName" v-bind="config.attrs" v-model="config.modelValue"></component>
    </el-form-item>
</template>

<script setup>
    import { ref, toRefs } from "@vue/reactivity";
    import BcSelect from "../BcSelect";
    const props = defineProps({
        prop: {
            type: String,
            default: ""
        },
        componentName: {
            type: String,
            default: "input"
        },
        config: {
            type: Object,
            default: () => {
                return {};
            }
        }
    });
</script>
<style lang="less" scoped></style>
