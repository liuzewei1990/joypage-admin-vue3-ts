<template>
    <BcTable ref="BcTable" :isFill="true" :tableConfig="tableConfig" @GetApiData="GetapiData">
        <!-- 类型切换 -->
        <template v-slot:action>
            <el-radio-group v-bind="$attrs" size="mini" fill="red" style="margin: 0px 10px 0px 0px">
                <el-radio-button label="index1"><i class="el-icon-tickets"></i> 投诉管理</el-radio-button>
                <el-radio-button label="index2"><i class="el-icon-tickets"></i> 投诉类型管理</el-radio-button>
            </el-radio-group>

            <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                <el-button size="mini" type="primary" @click="addAccuseType">新增</el-button>
            </el-button-group>
        </template>
    </BcTable>
</template>

<script>
    import BcTable from "@common/finsuit-components/BcTable";
    import createdTableConfig from "./modules/TableConfig-2";
    import createGetApi from "./modules/createGetApi";
    import actionEvent from "./modules/actionEvent";
    import { getCurrentInstance, onMounted } from "vue";
    export default {
        components: { BcTable },
        setup() {
            const instance = getCurrentInstance();
            const that = instance.appContext.config.globalProperties;
            onMounted(() => {
                instance.refs["BcTable"].emitGetApiData();
            });
            const { tableConfig } = createdTableConfig();
            const { GetapiData } = createGetApi();
            const { addAccuseType } = actionEvent();

            return {
                tableConfig,
                GetapiData,
                addAccuseType
            };
        }
    };
</script>

<style scoped lang="less"></style>
