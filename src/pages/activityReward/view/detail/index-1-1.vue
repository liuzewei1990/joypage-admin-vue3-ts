<!-- 激活码详情 -->
<template>
    <BcPageForm title="领用详情">
        <ItemBox :title="`激活码名称：${itemData.benefitName}`" style="margin: -10px 0 10px 0; padding-bottom: 10px">
            <p class="top-info">发放总数：{{ itemData.totalNum }}； 领用总数：{{ itemData.receiveNum }}</p>
        </ItemBox>
        <ItemBox>
            <BcTable ref="BcTableCode" :isFill="false" @GetApiData="getInfoDetail" :tableConfig="tableConfigGetInfo" @selection-change="selectionChange">
                <!--标头查询区-->
                <template v-slot:search>
                    <BcTableQueryForm
                        :inline="true"
                        label-position="left"
                        size="mini"
                        ref="checkform"
                        :model="codeFormData"
                        @queryBtn="() => $refs['BcTableCode'].startQueryBtn()"
                        @resetBtn="() => $refs['BcTableCode'].resetQueryBtn()">
                        <template #default>
                            <el-form-item label="活动名称:" prop="activityName">
                                <el-input v-model="codeFormData.activityName" placeholder="请输入活动名称"></el-input>
                            </el-form-item>
                            <el-form-item label="领取用户:" prop="memberPhone">
                                <el-input v-model="codeFormData.memberPhone" placeholder="请输入用户手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="领取时间:" prop="getDate">
                                <el-date-picker
                                    v-model="codeFormData.getDate"
                                    type="daterange"
                                    value-format="YYYY-MM-DD HH:mm:ss"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </BcTableQueryForm>
                </template>

                <!-- 操作按钮区 -->
                <template v-slot:action>
                    <el-button-group style="float: right1; margin: 0px 10px 0px 0px">
                        <el-button size="mini" type="primary" @click="exprotTable">导出</el-button>
                        <el-button size="mini" type="primary" @click="exportAllFlies(itemData)">导出全部</el-button>
                    </el-button-group>
                </template>
                <!-- checkbox选择列 -->
                <template v-slot:column-before>
                    <el-table-column fixed="left" type="selection" width="40"></el-table-column>
                </template>
            </BcTable>
        </ItemBox>
    </BcPageForm>
</template>

<script>
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";
    import { BcPageForm, ItemBox } from "@common/finsuit-components/BcPageForm";

    import { ref, onMounted, reactive, getCurrentInstance, toRefs } from "vue";

    import createdTableConfig from "./modules/TableConfig-1";
    import createGetApi from "./modules/createGetApi";
    import actionEvent from "./modules/actionEvent";

    export default {
        components: { BcTable, BcTableQueryForm, BcPageForm, ItemBox },
        setup() {
            const instance = getCurrentInstance();
            const that = instance.appContext.config.globalProperties;
            onMounted(() => {
                instance.refs["BcTableCode"].emitGetApiData();
            });
            const { tableConfigGetInfo } = createdTableConfig();
            const { getInfoDetail, codeFormData, itemData } = createGetApi();
            const { selectionChange, exprotTable, exportAllFlies } = actionEvent();
            return {
                tableConfigGetInfo,
                codeFormData,
                itemData,
                getInfoDetail,
                selectionChange,
                exprotTable,
                exportAllFlies
            };
        }
    };
</script>
<style lang="less">
    @import "../../assets/elementcss.less";
    .top-info {
        font-size: 14px;
        color: #606266;
    }
</style>
