<!-- 活动位置管理 -->
<template>
    <section>
        <BcTable ref="BcTableactivity" :isFill="true" @GetApiData="getActivitiesData" :tableConfig="tableConfig">
            <template v-slot:action>
                <el-radio-group v-bind="$attrs" size="mini" fill="red" style="margin: 0px 10px 0px 0px">
                    <el-radio-button label="index1"><i class="el-icon-tickets"></i> 拼团标签页活动管理</el-radio-button>
                    <el-radio-button label="index2"><i class="el-icon-tickets"></i> 活动位置管理</el-radio-button>
                </el-radio-group>
            </template>
        </BcTable>

        <changeDialog v-model="acctivityFormVisible" :dialogData="FormData" @sureChangeData="changeActivitiesData"></changeDialog>
    </section>
</template>
<script setup>
    import BcTable from "@common/finsuit-components/BcTable";
    import changeDialog from "./modules/changeDialog.vue";

    import { ref, getCurrentInstance, onMounted } from "vue";

    import createdTableConfig from "./modules/TableConfig-2";
    import createGetApi from "./modules/createGetApi";
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    onMounted(() => {
        instance.refs["BcTableactivity"].emitGetApiData();
    });
    const { tableConfig, acctivityFormVisible, FormData } = createdTableConfig();
    const { getActivitiesData, changeActivitiesData } = createGetApi();
</script>
<style lang="less" scoped></style>
