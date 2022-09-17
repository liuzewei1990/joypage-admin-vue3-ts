<!--  -->
<template>
    <BcTable ref="BcTableRefComponent" :isFill="true" :tableConfig="tableConfig" @GetApiData="GetapiData">
        <!-- 插槽：查询条件区 -->
        <template #search>
            <TableCheckForm :model="queryForm" @queryBtn="clickQueryBtn" @resetBtn="clickResetBtn"></TableCheckForm>
        </template>

        <!-- 插槽：操作区 -->
        <template v-slot:action>
            <RewardTypeTabs></RewardTypeTabs>
            <el-button style="float: right; margin: 0px 10px 0px 0px" size="mini" type="primary" @click="$router.push({ name: 'blendReward-add' })">新增混合奖励</el-button>
        </template>
    </BcTable>
</template>

<script setup>
    import { getCurrentInstance, h, onActivated, onMounted, reactive, ref, resolveComponent } from "vue";
    import BcTable from "@common/finsuit-components/BcTable";
    import TableCheckForm from "../../modules/TableCheckForm";
    import RewardTypeTabs from "../../modules/RewardTypeTabs";

    import createTableConfig from "./compositionApi/TableConfig";
    import createActionEvent from "./compositionApi/ActionEvent";
    import createCheckForm from "./compositionApi/CheckForm";

    const instance = getCurrentInstance();
    // BcTable的模版引用
    const BcTableRefComponent = ref(null);
    // BcTableQueryForm的模版引用
    const BcTableQueryRefComponent = ref(null);

    // 查询逻辑区Api
    const { queryForm, GetapiData, clickQueryBtn, clickResetBtn } = createCheckForm(BcTableRefComponent);

    // 操作区Api
    const { test } = createActionEvent();

    // 表格配置区Api
    const { tableConfig } = createTableConfig(BcTableRefComponent);

    // 手动触发表格GetapiData事件，首次加载表格数据
    onMounted(() => {
        BcTableRefComponent.value.emitGetApiData(); // 正确的写法
    });
</script>

<style lang="less" scoped></style>
