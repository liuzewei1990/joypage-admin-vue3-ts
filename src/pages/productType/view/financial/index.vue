<!--  -->
<template>
    <!-- isFill：true为固定布局 false为流体布局 -->
    <!-- tableConfig.columnJson：列的配置，详细见demo -->
    <!-- @GetApiData：表格列表请求数据事件，该事件触发条件有：刷新、页码变化、页面大小变化，指定页码变化 回调参数：$event.calback 和 $event.query 详细见demo-->
    <BcTable ref="BcTableRefComponent" :isFill="true" :tableConfig="tableConfig" @GetApiData="GetapiData">
        <!-- 插槽：查询条件区 -->
        <template #search>
            <!-- BcTableQueryForm继承el-form组件，封装内容：提供了以下两个插槽位，和集成了查询按钮和高级查询popup，提供两个事件：查询按钮事件：@queryBtn 和 重置按钮事件：@resetBtn-->
            <BcTableQueryForm :inline="true" label-position="left" label-width="80px" size="mini" ref="BcTableQueryRefComponent" :model="queryForm" @queryBtn="clickQueryBtn" @resetBtn="clickResetBtn">
                <!-- 默认插槽：简单查询条件  -->
                <!-- 1、由于CommonTable设置了最小宽度1136px，一般来说为了不让搜索区域换行，默认插槽渲染个数为3个正常的输入框，或者4个尺寸小点的输入框即可。 -->
                <!-- 2、如果超出个数可以通过more插槽进入高级搜索中查询，将常用的搜索条件置于默认插槽中。 -->
                <template #default>
                    <el-form-item label="产品名称" prop="prdName">
                        <el-input placeholder="" v-model="queryForm.prdName" style="width: 120px"></el-input>
                    </el-form-item>

                    <el-form-item label="产品类型" prop="prdType">
                        <BcSelect modelType="id" v-model="queryForm.prdType" :list="prdTypeList" @change="clickQueryBtn" clearable style="width: 120px"></BcSelect>
                    </el-form-item>

                    <el-form-item label="所属机构" prop="orgId">
                        <BcSelect
                            modelType="id"
                            v-model="queryForm.orgId"
                            placeholder="请选择所属机构"
                            @change="clickQueryBtn"
                            @GetApiData="getOrgSelect"
                            clearable
                            filterable
                            style="width: 120px"></BcSelect>
                    </el-form-item>

                    <el-form-item label="风险等级" prop="riskLevel">
                        <BcSelect modelType="id" v-model="queryForm.riskLevel" :list="riskLevelList" @change="clickQueryBtn" clearable style="width: 100px"></BcSelect>
                    </el-form-item>
                </template>
            </BcTableQueryForm>
        </template>

        <!-- 插槽：操作区 -->
        <template v-slot:action>
            <!-- 一般用于常用操作 或者 tabs按钮 -->
            <el-button size="mini" type="primary" @click="$router.push('/financial/add')">新增产品</el-button>
        </template>
    </BcTable>

    <el-dialog custom-class="my-dialog" v-model="rateCurveGraphDialog.show" title="编辑利率曲线图" width="60%" destroy-on-close :close-on-click-modal="false">
        <RateTable :rateCurveGraphType="rateCurveGraphDialog.rateCurveGraphType" :prdIndexId="rateCurveGraphDialog.prdIndexId"></RateTable>
    </el-dialog>
</template>

<script setup>
    import { getCurrentInstance, h, onActivated, onMounted, reactive, ref, resolveComponent } from "vue";
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";

    import createTableConfig from "./compositionApi/TableConfig";
    import createActionEvent from "./compositionApi/ActionEvent";
    import createCheckForm from "./compositionApi/CheckForm";
    import { default as SelectData, rateCurveGraphTypeList, riskLevelList, rateUnitList, isSupervisionList, nationalTypeList, bankDockTypeList, prdTypeList } from "./compositionApi/SelectData";

    import RateTable from "./modules/RateTable.vue";

    const { getOrgSelect } = SelectData();

    const instance = getCurrentInstance();
    // BcTable的模版引用
    const BcTableRefComponent = ref(null);
    // BcTableQueryForm的模版引用
    const BcTableQueryRefComponent = ref(null);

    // 查询逻辑区Api
    const { queryForm, GetapiData, clickQueryBtn, clickResetBtn } = createCheckForm(BcTableRefComponent);

    // 操作区Api
    const { test } = createActionEvent();

    // 表格配置区Api
    const { tableConfig, rateCurveGraphDialog } = createTableConfig(BcTableRefComponent);

    // 手动触发表格GetapiData事件，首次加载表格数据
    onMounted(() => {
        BcTableRefComponent.value.emitGetApiData(); // 正确的写法
        // instance.refs["BcTableRefComponent"].emitGetApiData() 错误的写法
    });
</script>

<style lang="less">
    .my-dialog .el-dialog__body {
        padding: inherit !important;
    }
</style>
