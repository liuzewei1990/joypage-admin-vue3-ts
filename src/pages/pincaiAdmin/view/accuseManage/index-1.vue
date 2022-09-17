<!-- 投诉管理 -->
<template>
    <section>
        <BcTable ref="BcTable" :isFill="true" @GetApiData="getcomTableDate" :tableConfig="tableConfig">
            <!--标头查询区-->
            <template v-slot:search>
                <BcTableQueryForm
                    :inline="true"
                    label-position="left"
                    size="mini"
                    ref="checkform"
                    :model="accuseManageForm"
                    @queryBtn="() => $refs['BcTable'].startQueryBtn()"
                    @resetBtn="() => $refs['BcTable'].resetQueryBtn(accuseManageForm)">
                    <template #default>
                        <el-form-item label="投诉人ID:">
                            <el-input v-model="accuseManageForm.complaintsId" placeholder="请输入投诉人ID"></el-input>
                        </el-form-item>
                        <el-form-item label="被投诉人ID:">
                            <el-input v-model="accuseManageForm.uncomplaintsId" placeholder="请输入被投诉人ID"></el-input>
                        </el-form-item>
                        <el-form-item label="投诉类型:">
                            <BcSelect v-model="accuseManageForm.complaintsType1" modelType="id" @GetApiData="getSelectData($event)" placeholder="请选择"></BcSelect>
                        </el-form-item>
                    </template>

                    <template #more>
                        <el-form-item label="投诉类型:">
                            <BcSelect v-model="accuseManageForm.complaintsType2" modelType="id" :list="$json.b.accuseType" placeholder="请选择"></BcSelect>
                        </el-form-item>
                        <el-form-item label="内容ID:">
                            <el-input v-model="accuseManageForm.contentId" placeholder="请输入被投诉内容ID"></el-input>
                        </el-form-item>
                        <el-form-item label="投诉时间:">
                            <el-date-picker v-model="accuseManageForm.date1" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                        </el-form-item>
                    </template>
                </BcTableQueryForm>
            </template>

            <!-- 操作按钮区 -->
            <template v-slot:action>
                <el-radio-group v-bind="$attrs" size="mini" fill="red" style="margin: 0px 10px 0px 0px">
                    <el-radio-button label="index1"><i class="el-icon-tickets"></i> 投诉管理</el-radio-button>
                    <el-radio-button label="index2"><i class="el-icon-tickets"></i> 投诉类型管理</el-radio-button>
                </el-radio-group>
            </template>
        </BcTable>
    </section>
</template>

<script>
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";

    import { ref, onMounted, reactive, getCurrentInstance, toRefs } from "vue";

    import createdTableConfig from "./modules/TableConfig-1";
    import createGetApi from "./modules/createGetApi";
    import actionEvent from "./modules/actionEvent";

    export default {
        components: { BcTable, BcTableQueryForm },
        setup() {
            const instance = getCurrentInstance();
            const that = instance.appContext.config.globalProperties;
            onMounted(() => {
                instance.refs["BcTable"].emitGetApiData();
            });
            const { tableConfig } = createdTableConfig();
            const { getcomTableDate, accuseManageForm, getSelectData } = createGetApi();
            const { addAccuseType } = actionEvent();

            return {
                tableConfig,
                accuseManageForm,
                getcomTableDate,
                getSelectData
            };
        }
    };
</script>
<style lang="less">
    .el-date-editor {
        width: 220px !important;
    }
</style>
