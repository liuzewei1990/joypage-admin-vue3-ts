<!-- 官方账户管理 -->
<template>
    <BcTable ref="BcTableAcc" :isFill="true" v-bind="$attrs" :tableConfig="tableConfig" @GetApiData="getOfficialAccount" @selection-change="selectionChange">
        <template v-slot:action>
            <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                <el-button size="mini" type="primary" @click="AddFormVisible = true"> 新增 </el-button>
            </el-button-group>
        </template>
        <!-- checkbox选择列 -->
        <template v-slot:column-before>
            <el-table-column fixed="left" type="selection" width="40"></el-table-column>
        </template>
    </BcTable>
    <addOfficialDialog v-model="AddFormVisible" @sureAddData="sureAddOfficialData"></addOfficialDialog>
</template>

<script setup>
    import BcTable from "@common/finsuit-components/BcTable";
    import createdTableConfig from "./modules/TableConfig-1";
    import createGetApi from "./modules/createGetApi";
    import actionEvent from "./modules/actionEvent";
    import addOfficialDialog from "./modules/addOfficialDialog.vue";
    import { ref, onMounted, reactive, getCurrentInstance, toRefs } from "vue";
    const instance = getCurrentInstance();
    const that = getCurrentInstance().appContext.config.globalProperties;
    onMounted(() => {
        instance.refs["BcTableAcc"].emitGetApiData();
    });
    const { tableConfig } = createdTableConfig();
    const { getOfficialAccount, selectionChange, sureAddOfficialData } = createGetApi();
    const { addOfficialUser } = actionEvent();

    const AddFormVisible = ref(false);
</script>
<style lang="less" scoped></style>
