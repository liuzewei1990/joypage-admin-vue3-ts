<!-- 投诉管理 -->
<template>
    <section>
        <BcTable ref="BcTable" :isFill="true" @GetApiData="getActivitiesTableDate" :tableConfig="tableConfig">
            <!-- 操作按钮区 -->
            <template v-slot:action>
                <el-radio-group v-bind="$attrs" size="mini" fill="red" style="margin: 0px 10px 0px 0px">
                    <el-radio-button label="index1"> <i class="el-icon-tickets"></i> 拼团标签页活动管理 </el-radio-button>
                    <el-radio-button label="index2"> <i class="el-icon-tickets"></i> 活动位置管理 </el-radio-button>
                </el-radio-group>

                <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                    <el-button size="mini" type="primary" @click="addActivity">新增</el-button>
                </el-button-group>
            </template>
        </BcTable>
    </section>
</template>

<script setup>
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";

    import { getCurrentInstance, onMounted } from "vue";

    import createdTableConfig from "./modules/TableConfig-1";
    import createGetApi from "./modules/createGetApi";
    import actionEvent from "./modules/actionEvent";
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    onMounted(() => {
        instance.refs["BcTable"].emitGetApiData();
    });
    const { tableConfig } = createdTableConfig();
    const { getActivitiesTableDate, accuseManageForm, getSelectData } = createGetApi();
    const { addActivity } = actionEvent();
</script>
<style lang="less" scoped>
    /deep/ .el-col-2 {
        text-align: center;
    }
    .top-btns {
        display: flex;
        justify-content: space-between;
    }
</style>
