<!--固定收益组件-->
<template>
    <el-row style="margin-bottom: 20px">
        <el-button size="mini" type="primary" @click="addSevenBtn">新增</el-button>
        <el-button size="mini" type="primary" @click="leadingInBtn">导入</el-button>
        <el-button size="mini" type="primary" @click="leadingOutBtn">导出</el-button>
    </el-row>
    <el-table size="mini" border ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="日期" align="center"></el-table-column>
        <el-table-column label="业绩走势" align="center"></el-table-column>
        <el-table-column label="单位净值" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination style="width: 100%; text-align: end; margin-top: 12px" background :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :pager-count="7" :total="100">
        <!--  @size-change="handleSizeChange" 
        @current-change="currentChange"  -->
        <!-- :page-size="searchData.length"
        :current-page="searchData.currentPage" 
        :total="searchData.totalSize" -->
    </el-pagination>
</template>
<script setup></script>
