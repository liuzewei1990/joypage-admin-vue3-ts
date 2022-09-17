<template>
    <CommonTable :isFull="false">
        <!--顶部搜索 -->
        <template #search>
            <!-- <pre>{{searchData}}</pre> -->
            <el-form ref="queryForm" :model="searchData" :inline="true" size="small">
                <el-form-item label="产品名称" prop="prdName">
                    <el-input v-model="searchData.prdName" placeholder="请输入产品名称"></el-input>
                </el-form-item>

                <el-form-item label="产品类型" prop="prdType">
                    <BcSelect v-model="searchData.prdType" :list="proTypeList" placeholder="请选择产品类型" clearable></BcSelect>
                </el-form-item>

                <el-form-item label="所属非银机构" prop="orgId">
                    <BcSelect itemValueKey="orgId" itemNameKey="orgName" v-model="searchData.orgId" @GetApiData="getOrgSelect" filterable clearable placeholder="请选择所属非银机构"> </BcSelect>
                </el-form-item>

                <el-form-item label="风险等级" prop="riskLevel">
                    <BcSelect v-model="searchData.riskLevel" :list="riskRatingList" placeholder="请选择风险等级" clearable></BcSelect>
                </el-form-item>

                <div style="float: right">
                    <el-button size="mini" type="primary" @click="queryBtn">查询</el-button>
                    <el-button size="mini" type="default" @click="resetBtn(queryForm)">重置</el-button>
                </div>
            </el-form>
        </template>

        <!--新增产品-->
        <template #action>
            <el-button size="mini" type="primary" @click="handleEdit">新增产品</el-button>
        </template>

        <!--主体-->
        <el-table size="mini" :data="tableData.FormData" style="width: 100%" stripe :border="true" element-loading-text="loading...">
            <el-table-column label="产品id" align="center" prop="id"></el-table-column>
            <el-table-column label="产品名称" align="center" prop="prdName"></el-table-column>
            <el-table-column label="产品类型" align="center" prop="typeName"></el-table-column>
            <el-table-column label="所属非银机构" align="center" prop="orgName"></el-table-column>
            <el-table-column label="期限" align="center" prop="period"></el-table-column>
            <el-table-column label="期限单位" align="center" prop="rateUnitName"></el-table-column>
            <el-table-column label="收益率（%）" align="center" prop="rate"></el-table-column>
            <el-table-column label="起购金额（最小/元）" align="center" prop="minAmount"></el-table-column>
            <el-table-column label="风险等级" align="center" prop="riskLevelName"></el-table-column>
            <el-table-column label="产品区域" align="center" prop="nationalName"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <template #footer>
            <el-pagination
                style="float: right; margin-top: 2px"
                background
                :page-sizes="[10, 20, 30, 40]"
                :page-size="searchData.length"
                @size-change="handleSizeChange"
                @current-change="currentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :pager-count="7"
                :current-page="searchData.currentPage"
                :total="searchData.totalSize">
            </el-pagination>
        </template>
    </CommonTable>
</template>
<script setup>
    import { ref, toRefs, reactive, getCurrentInstance, onMounted } from "vue";
    import BcSelect from "@common/finsuit-components/BcSelect";
    import CommonTable from "@common/finsuit-components/CommonTable";
    import SelectData from "./compositionApi/SelectData";
    import tableConfig from "./compositionApi/TableConfig";

    const queryForm = ref(null);

    //下拉框数据
    const { proTypeList, riskRatingList, getOrgSelect, timeLimitUnitList, areaList } = SelectData();
    //列表数据
    const { searchData, tableData, queryBtn, resetBtn, handleEdit, handleDelete, handleSizeChange, currentChange, getTableData } = tableConfig(timeLimitUnitList, riskRatingList, areaList);

    getTableData();
</script>
<style lang="less" scoped>
    /deep/ .el-form-item__content {
        width: 180px;
    }
</style>
