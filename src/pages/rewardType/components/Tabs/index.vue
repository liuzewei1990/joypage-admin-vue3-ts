<!--  -->
<template>
    <el-radio-group size="mini" fill="#F56C6C" style="margin: 0px 10px 0px 0px">
        <el-radio-button v-for="item in props.tabs" :key="item.label" :label="item.label"><i class="el-icon-tickets"></i>{{ item.name }}</el-radio-button>
    </el-radio-group>
</template>

<script setup>
    const props = defineProps({
        tabs: {
            type: Array,
            default: []
        }
    });
</script>
<style lang="less" scoped></style>
