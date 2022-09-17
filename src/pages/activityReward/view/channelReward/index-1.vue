<!-- 激活码 -->
<template>
    <section>
        <BcTable ref="BcTableCode" :isFill="true" @GetApiData="getActivitiesTable" :tableConfig="tableConfigCode" @selection-change="selectionChange">
            <!--标头查询区-->
            <template v-slot:search>
                <BcTableQueryForm
                    :inline="true"
                    label-position="left"
                    size="mini"
                    ref="checkform"
                    :model="FormData"
                    @queryBtn="() => $refs['BcTableCode'].startQueryBtn()"
                    @resetBtn="() => $refs['BcTableCode'].resetQueryBtn()">
                    <template #default>
                        <el-form-item label="激活码名称:" prop="benefitName">
                            <el-input v-model="FormData.benefitName" placeholder="激活码名称"></el-input>
                        </el-form-item>
                    </template>
                </BcTableQueryForm>
            </template>

            <!-- 操作按钮区 -->
            <template v-slot:action>
                <el-radio-group v-bind="$attrs" size="mini" fill="red" style="margin: 0px 10px 0px 0px">
                    <el-radio-button label="1"><i class="el-icon-tickets"></i> 激活码类</el-radio-button>
                    <el-radio-button label="2"><i class="el-icon-tickets"></i> 链接类</el-radio-button>
                    <el-radio-button label="3"><i class="el-icon-tickets"></i> 扫码类</el-radio-button>
                </el-radio-group>

                <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                    <el-button size="mini" type="primary" @click="$router.push('/channelReward/detail-1?benefitType=1')">新增</el-button>
                </el-button-group>
            </template>
            <!-- checkbox选择列 -->
            <template v-slot:column-before>
                <el-table-column fixed="left" type="selection" width="40"></el-table-column>
            </template>
        </BcTable>
        <el-dialog title="激活码管理" v-model="addcode" width="600px">
            <AddCode v-if="addcode" :itemData="itemData"> </AddCode>
        </el-dialog>
    </section>
</template>

<script>
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";
    import AddCode from "./modules/addCode.vue";
    import { onMounted, getCurrentInstance } from "vue";

    import createdTableConfig from "./modules/TableConfig-1";
    import createGetApi from "./modules/createGetApi";
    export default {
        components: { BcTable, BcTableQueryForm, AddCode },
        setup(props, context) {
            const instance = getCurrentInstance();
            const that = instance.appContext.config.globalProperties;

            onMounted(() => {
                instance.refs["BcTableCode"].emitGetApiData();
            });
            const { tableConfigCode, addcode, itemData } = createdTableConfig();
            const { getActivitiesTable, FormData, delteAll, selectionChange } = createGetApi();

            return {
                delteAll,
                tableConfigCode,
                FormData,
                addcode,
                getActivitiesTable,
                selectionChange,
                itemData
            };
        }
    };
</script>
<style lang="less"></style>
