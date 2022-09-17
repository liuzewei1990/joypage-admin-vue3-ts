<!-- 官方推荐关注用户 -->
<template>
    <section class="">
        <BcTable ref="CommonTableData" :isFill="true" v-bind="$attrs" @GetApiData="getHotAccount" :tableConfig="tableConfig">
            <template v-slot:search>
                <!--标头查询区-->
                <BcTableQueryForm
                    :inline="true"
                    label-position="left"
                    size="mini"
                    ref="checkform"
                    :model="hotAccountForm"
                    @queryBtn="() => $refs['CommonTableData'].startQueryBtn()"
                    @resetBtn="() => $refs['CommonTableData'].resetQueryBtn()">
                    <template v-slot:default>
                        <el-form-item label="识贝ID：">
                            <el-input v-model="hotAccountForm.sbId" placeholder="请11输入ID"></el-input>
                        </el-form-item>
                        <el-form-item label="时间">
                            <el-date-picker v-model="hotAccountForm.startDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                        </el-form-item>
                    </template>
                    <template v-slot:more>
                        <el-form-item label="粉丝数量：">
                            <BcNumRange v-model="hotAccountForm.fansNum"></BcNumRange>
                        </el-form-item>

                        <el-form-item label="关注数量：">
                            <BcNumRange v-model="hotAccountForm.focusNum"></BcNumRange>
                        </el-form-item>

                        <el-form-item label="获赞数量：">
                            <BcNumRange v-model="hotAccountForm.praiseNum"></BcNumRange>
                        </el-form-item>

                        <el-form-item label="视频数量：">
                            <BcNumRange v-model="hotAccountForm.videoNum"></BcNumRange>
                        </el-form-item>

                        <el-form-item label="地区 ：">
                            <region v-model="hotAccountForm.region"></region>
                        </el-form-item>
                    </template>
                </BcTableQueryForm>
            </template>

            <!-- 操作按钮区 -->
            <template v-slot:action>
                <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                    <el-button size="mini" type="primary" @click="addaccount = true"> 新增 </el-button>
                    <el-button size="mini" type="primary" @click="removeGroup"> 移除 </el-button>
                </el-button-group>
            </template>

            <!-- checkbox选择列 -->
            <template v-slot:column-before>
                <el-table-column fixed="left" type="selection" width="40"></el-table-column>
            </template>
        </BcTable>
        <addHotAccount v-model="addaccount" @sureAddVData="sureAddVData"></addHotAccount>
    </section>
</template>

<script setup>
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";
    import region from "./area/region.vue";
    import BcNumRange from "@common/finsuit-components/BcNumRange";
    import addHotAccount from "./modules/addHotAccountDialog.vue";
    import { ref, onMounted, reactive, getCurrentInstance, toRefs } from "vue";

    import createdTableConfig from "./modules/TableConfig-1";
    import createGetApi from "./modules/createGetApi";
    import actionEvent from "./modules/actionEvent";

    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    const addaccount = ref(false);
    onMounted(() => {
        instance.refs["CommonTableData"].emitGetApiData();
    });
    const { tableConfig } = createdTableConfig();
    const { getHotAccount, hotAccountForm, removeGroup, sureAddVData } = createGetApi();
    const {} = actionEvent();
</script>
<style lang="less">
    .el-date-editor {
        width: 220px !important;
    }
</style>
