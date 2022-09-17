<!-- 奖励类型公共Tbale查询form组件 -->
<template>
    <BcTableQueryForm :inline="true" label-position="left" label-width="80px" size="mini" v-bind="$attrs">
        <template #default>
            <el-form-item label="奖励名称" prop="rewardName">
                <el-input placeholder="" v-model="queryForm.rewardName" style="width: 120px"></el-input>
            </el-form-item>

            <el-form-item label="适用类型" prop="rewardScope">
                <BcSelect placeholder="" v-model="queryForm.rewardScope" clearable @change="queryForm._typeChange" :list="$json.rewardScopeArr" style="width: 120px"></BcSelect>
            </el-form-item>

            <el-form-item label="适用范围" prop="rewardScopeId">
                <BcSelect
                    placeholder="根据活动查找"
                    v-if="queryForm.rewardScope == '1'"
                    v-model="queryForm.rewardScopeId"
                    clearable
                    @GetApiData="$json.getActivitysSelect"
                    style="width: 120px"></BcSelect>
                <BcSelect placeholder="根据任务查找" v-if="queryForm.rewardScope == '2'" v-model="queryForm.rewardScopeId" clearable @GetApiData="$json.getTaskSelect" style="width: 120px"></BcSelect>
                <BcSelect placeholder="请先选择类型" v-if="queryForm.rewardScope == ''" :disabled="true" v-model="queryForm.rewardScopeId" style="width: 120px"></BcSelect>
            </el-form-item>
        </template>
        <!-- <template #more>
      更多查询条件
    </template> -->
    </BcTableQueryForm>
</template>

<script setup>
    import { ref, reactive, getCurrentInstance, useAttrs, useSlots } from "vue";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";

    const attrs = useAttrs();
    const queryForm = attrs.model;
</script>
<style lang="less" scoped></style>
