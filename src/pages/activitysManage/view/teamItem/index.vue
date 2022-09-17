<!--  -->
<template>
    <BcTable ref="BcTableRefComponent" :isFill="true" :tableConfig="tableConfig" @GetApiData="GetapiData">
        <!-- 插槽：查询条件区 -->
        <template #search>
            <BcTableQueryForm
                :inline="true"
                label-position="left"
                label-width="80px"
                size="mini"
                :model="queryForm"
                @queryBtn="clickQueryBtn(BcTableRefComponent)"
                @resetBtn="clickResetBtn(BcTableRefComponent)">
                <!-- 默认插槽：简单查询条件 -->
                <template #default>
                    <el-form-item label="产品名称" prop="prdName">
                        <el-input placeholder="根据产品名称查询" v-model="queryForm.prdName"></el-input>
                    </el-form-item>

                    <el-form-item label="奖励类型" prop="rewardType">
                        <BcSelect modelType="id" v-model="queryForm.rewardType" :list="$json.rewardType" clearable :style="{ width: '110px' }"></BcSelect>
                    </el-form-item>

                    <el-form-item label="可见用户" prop="visibleType">
                        <BcSelect modelType="id" v-model="queryForm.visibleType" :list="$json.visibleSelect" clearable :style="{ width: '110px' }"></BcSelect>
                    </el-form-item>

                    <el-form-item label="发布渠道" prop="appFlag">
                        <BcSelect modelType="id" v-model="queryForm.appFlag" :list="$json.appFlagSelectMore" clearable :style="{ width: '110px' }"></BcSelect>
                    </el-form-item>
                </template>
            </BcTableQueryForm>
        </template>

        <!-- 插槽：操作区 -->
        <template v-slot:action>
            <el-button size="mini" type="primary" @click="$router.push('/teamItem/add')">新增拼团</el-button>
        </template>
    </BcTable>
</template>

<script setup>
    import { getCurrentInstance, h, onActivated, onMounted, reactive, ref, resolveComponent } from "vue";
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";
    import createTableConfig from "./compositionApi/TableConfig";
    import createActionEvent from "./compositionApi/ActionEvent";
    import createCheckForm from "./compositionApi/CheckForm";
    import { useStore } from "vuex";

    const instance = getCurrentInstance();

    const BcTableRefComponent = ref(null);

    // 查询逻辑区Api
    const { queryForm, GetapiData, clickQueryBtn, clickResetBtn } = createCheckForm();

    // 操作区Api
    const { test } = createActionEvent();

    // 表格配置区Api
    const { tableConfig } = createTableConfig(BcTableRefComponent);

    // 手动触发表格GetapiData事件，首次加载表格数据
    onMounted(() => {
        BcTableRefComponent.value.emitGetApiData();
    });
</script>

<style lang="less" scoped></style>
