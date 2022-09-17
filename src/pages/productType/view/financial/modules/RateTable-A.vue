<!--  -->
<template>
    <BcTable ref="BcTableRefComponent" class="my-table" height="300px" :tableConfig="tableConfig" @GetApiData="GetapiData">
        <!-- 插槽：操作区 -->
        <template v-slot:action>
            <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                <el-upload
                    style="float: left; margin: 0px 0px 0px 0px"
                    :show-file-list="false"
                    name="importFile"
                    :action="`${$config.baseUrlHost}/financeChildController/importRateCurveGraph?rateCurveGraphType=${attrs.rateCurveGraphType}&prdIndexId=${attrs.prdIndexId}`"
                    :on-error="onError"
                    :on-success="onSuccess">
                    <el-button size="mini" type="primary">导入</el-button>
                </el-upload>
                <el-button size="mini" style="" type="primary" @click="exportRateCurveGraph">导出</el-button>
            </el-button-group>
        </template>

        <el-table-column align="center" prop="dataDate" label="日期" width="150px">
            <template #default="scope">
                <el-date-picker class="my-input-date" v-model="scope.row.dataDate" size="mini" v-if="scope.row.type === 'input'" type="date" placeholder="请选择日期" />
                <span v-else>{{ scope.row.dataDate }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="sevenDayAnnualizedRate" label="七日年化">
            <template #default="scope">
                <el-input class="my-input" size="mini" v-if="scope.row.type === 'input'" v-model="scope.row.sevenDayAnnualizedRate" placeholder="请输入七日年化"></el-input>
                <span v-else>{{ scope.row.sevenDayAnnualizedRate }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="tenThousandEarnings" label="万分收益">
            <template #default="scope">
                <el-input class="my-input" size="mini" v-if="scope.row.type === 'input'" v-model="scope.row.tenThousandEarnings" placeholder="请输入万分收益"></el-input>
                <span v-else>{{ scope.row.tenThousandEarnings }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100px">
            <template #default="scope">
                <el-link href="javascript:void(0);" icon="el-icon-circle-plus" v-if="scope.$index === 0" @click="addCheck(scope)">新增</el-link>
                <el-link href="javascript:void(0);" icon="el-icon-remove" v-else @click="delPost(scope.row)">删除</el-link>
            </template>
        </el-table-column>
    </BcTable>
</template>

<script setup>
    import { ref, reactive, getCurrentInstance, useAttrs, useSlots, onMounted, toRaw } from "vue";
    import BcTable from "@common/finsuit-components/BcTable";
    import useComposition from "./RateTable.js";

    const emits = defineEmits([]);
    const props = defineProps({});
    const slots = useSlots();
    const attrs = useAttrs();
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const BcTableRefComponent = ref(null);
    const { GetapiData, tableConfig, addPost, delPost, exportRateCurveGraph, onSuccess, onError } = useComposition(attrs, BcTableRefComponent);

    // 新增校验
    const addCheck = (scope) => {
        let { row } = scope;
        if (row.dataDate == "" || row.sevenDayAnnualizedRate == "" || row.tenThousandEarnings == "") {
            _this.$messageBox.confirm("请输入正确得曲线图数据！", "提示", {
                confirmButtonText: "好的",
                cancelButtonText: "关闭",
                type: "warning"
            });
            return;
        }
        addPost(row);
    };

    // 手动触发表格GetapiData事件，首次加载表格数据
    onMounted(() => {
        BcTableRefComponent.value.emitGetApiData();
    });
</script>
<style lang="less" scoped>
    /deep/ .my-table .content-main {
        padding: 0px 5px;
    }
    /deep/ .my-table .content-action {
        padding: 10px 5px;
    }

    /deep/ .my-input-date .el-input__inner {
        border: none;
        width: 130px;
    }

    /deep/ .my-input .el-input__inner {
        border: none;
        text-align: center;
    }
</style>
