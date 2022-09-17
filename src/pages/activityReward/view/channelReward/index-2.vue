<template>
    <BcTable ref="BcTableLink" :isFill="true" :tableConfig="tableConfigLink" @GetApiData="getActivitiesTable" @selection-change="selectionChange">
        <!--标头查询区-->
        <template v-slot:search>
            <BcTableQueryForm
                :inline="true"
                label-position="left"
                size="mini"
                ref="checkform"
                :model="FormData"
                @queryBtn="() => $refs['BcTableLink'].startQueryBtn()"
                @resetBtn="() => $refs['BcTableLink'].resetQueryBtn()">
                <template #default>
                    <el-form-item label="福利名称:" prop="benefitName">
                        <el-input v-model="FormData.benefitName" placeholder="福利名称"></el-input>
                    </el-form-item>
                </template>
            </BcTableQueryForm>
        </template>
        <!-- 类型切换 -->
        <template v-slot:action>
            <el-radio-group v-bind="$attrs" size="mini" fill="red" style="margin: 0px 10px 0px 0px">
                <el-radio-button label="1"><i class="el-icon-tickets"></i> 激活码类</el-radio-button>
                <el-radio-button label="2"><i class="el-icon-tickets"></i> 链接类</el-radio-button>
                <el-radio-button label="3"><i class="el-icon-tickets"></i> 扫码类</el-radio-button>
            </el-radio-group>

            <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                <el-button size="mini" type="primary" @click="$router.push('/channelReward/detail-2?benefitType=2')">新增</el-button>
                <el-button size="mini" type="primary" @click="delteAll">全部删除</el-button>
            </el-button-group>
        </template>
        <!-- checkbox选择列 -->
        <template v-slot:column-before>
            <el-table-column fixed="left" type="selection" width="40"></el-table-column>
        </template>
    </BcTable>
</template>

<script>
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";

    import createdTableConfig from "./modules/TableConfig-1";
    import createGetApi from "./modules/createGetApi";
    import { getCurrentInstance, onMounted } from "vue";
    export default {
        components: { BcTable, BcTableQueryForm },
        setup() {
            const instance = getCurrentInstance();
            const that = instance.appContext.config.globalProperties;
            onMounted(() => {
                instance.refs["BcTableLink"].emitGetApiData();
            });
            const { tableConfigLink } = createdTableConfig();
            const { getActivitiesTable, selectionChange, FormData, delteAll } = createGetApi();

            return {
                tableConfigLink,
                FormData,
                getActivitiesTable,
                delteAll,
                selectionChange
            };
        }
    };
</script>

<style scoped lang="less"></style>
