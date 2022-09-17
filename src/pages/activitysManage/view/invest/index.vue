<!--  -->
<template>
    <BcTable ref="BcTable" :isFill="true" :tableConfig="tableConfig" @GetApiData="GetapiData">
        <!-- 审核：查询条件 -->
        <template #search>
            <BcTableQueryForm :inline="true" label-position="left" size="mini" ref="checkform" :model="queryForm" @queryBtn="clickQueryBtn" @resetBtn="clickResetBtn">
                <!-- 默认：简单查询条件 -->
                <template #default>
                    <el-form-item label="银行" prop="orgId">
                        <BcSelect modelType="id" v-model="queryForm.orgId" @GetApiData="getOrgSelect" placeholder="点击模糊查询" @change="queryForm._orgIdChange" clearable filterable></BcSelect>
                    </el-form-item>

                    <el-form-item label="产品" prop="prdIndexId">
                        <BcSelect
                            modelType="id"
                            v-model="queryForm.prdIndexId"
                            @GetApiData="getPrdSelect($event, queryForm.orgId)"
                            placeholder="点击模糊查询"
                            :key="queryForm.orgId"
                            clearable
                            filterable></BcSelect>
                    </el-form-item>

                    <el-form-item label="用户" prop="visibleType">
                        <BcSelect modelType="id" v-model="queryForm.visibleType" :list="userSelect" placeholder="选择用户" clearable></BcSelect>
                    </el-form-item>

                    <el-form-item label="渠道" prop="appFlag">
                        <BcSelect modelType="id" v-model="queryForm.appFlag" :list="appFlagSelect" placeholder="选择渠道" clearable></BcSelect>
                    </el-form-item>
                </template>
            </BcTableQueryForm>
        </template>

        <!-- 审核：操作 -->
        <template v-slot:action>
            <el-button-group style="float: left; margin: 0px 10px 0px 0px">
                <el-button size="mini" type="primary" @click="add">新增优选</el-button>
            </el-button-group>
        </template>
    </BcTable>
</template>
<script>
    import { getCurrentInstance, h, onActivated, onMounted, reactive, ref, resolveComponent } from "vue";
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";
    import createTableConfig from "./compositionApi/TableConfig";
    import createActionEvent from "./compositionApi/ActionEvent";
    import createCheckForm from "./compositionApi/CheckForm";
    import SelectData from "./compositionApi/SelectData";
    export default {
        components: { BcTable, BcTableQueryForm },
        setup() {
            const instance = getCurrentInstance();

            // 查询逻辑区Api
            const { queryForm, GetapiData, clickQueryBtn, clickResetBtn } = createCheckForm();

            // 导入select数据
            const { getOrgSelect, getPrdSelect, userSelect, appFlagSelect, statusSelect, deviceSelect } = SelectData(queryForm);

            // 操作区Api
            const { add } = createActionEvent();

            // 表格配置区Api
            const { tableConfig } = createTableConfig({ userSelect, appFlagSelect, statusSelect, deviceSelect });

            // 手动触发表格GetapiData事件，首次加载表格数据
            onMounted(() => {
                console.log("实例：", instance);
                instance.refs["BcTable"].emitGetApiData();
            });

            return {
                queryForm,
                GetapiData,
                clickQueryBtn,
                clickResetBtn,
                getOrgSelect,
                getPrdSelect,
                userSelect,
                appFlagSelect,
                statusSelect,
                deviceSelect,
                add,
                tableConfig
            };
        }
    };
</script>
<style lang="less" scoped></style>
