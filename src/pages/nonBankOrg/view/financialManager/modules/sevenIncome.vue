<!--七日年化收益-->
<template>
    <el-row style="margin-bottom: 20px">
        <el-button size="mini" type="primary" @click="addSevenBtn">新增</el-button>
        <el-button size="mini" type="primary" @click="leadingInBtn">导入</el-button>
        <el-button size="mini" type="primary" @click="leadingOutBtn">导出</el-button>
    </el-row>

    <el-table size="mini" border :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="date" label="日期" align="center">
            <template v-slot="scope">
                <el-form-item>
                    <input type="text" v-model="scope.row.date" />
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="seven" label="七日年化" align="center">
            <template v-slot="scope">
                <el-form-item>
                    <input type="text" v-model="scope.row.seven" />
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="income" label="万份收益" align="center">
            <template v-slot="scope">
                <el-form-item>
                    <input type="text" v-model="scope.row.income" />
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
        style="width: 100%; text-align: end; margin-top: 12px"
        background
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        :pager-count="7"
        :total="100">
        <!--   
        @current-change="currentChange"  -->
        <!-- :page-size="searchData.length"
        :current-page="searchData.currentPage" 
        :total="searchData.totalSize" -->
    </el-pagination>
</template>
<script>
    import { reactive, getCurrentInstance, ref, toRefs } from "vue";

    export default {
        components: {},
        props: {},
        setup() {
            //新增一行的默认空数据
            const initData = () => {
                return {
                    date: "",
                    seven: "",
                    income: ""
                };
            };
            //表单数据
            const state = reactive({
                tableData: [
                    {
                        date: "2023-10",
                        seven: "20%",
                        income: "1000"
                    },
                    {
                        date: "2023-10",
                        seven: "20%",
                        income: "1000"
                    }
                ]
            });

            // 新增按钮
            const addSevenBtn = () => {
                state.tableData.push(initData());
            };

            //导入
            const leadingInBtn = () => {};

            //导出
            const leadingOutBtn = () => {};

            //多选
            const handleSelectionChange = () => {};

            //页面改变
            const handleSizeChange = () => {};

            return {
                ...toRefs(state),
                addSevenBtn,
                leadingInBtn,
                leadingOutBtn,
                handleSelectionChange,
                handleSizeChange
            };
        }
    };
</script>
