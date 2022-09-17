<template>
    <CommonTable>
        <template #search>
            <el-button size="mini" type="primary" @click="handleEdit">新增期限</el-button>
        </template>

        <!--主体-->
        <el-table size="mini" :data="limitTable.tableData" style="width: 100%" stripe :border="true" element-loading-text="loading...">
            <el-table-column label="期限" align="center" prop="daysYear"></el-table-column>
            <el-table-column label="单位" align="center" prop="name"></el-table-column>
            <el-table-column label="排序" align="center" prop="orderNum"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <!-- <template #footer>
            <el-pagination style="float:right;margin-top:2px;" 
                background 
                :page-sizes="[10, 20, 30, 40]" 
                :page-size="searchData.length"
                @size-change="handleSizeChange" 
                @current-change="currentChange" 
                layout="total, sizes, prev, pager, next, jumper" 
                :pager-count="7" 
                :current-page="searchData.currentPage" 
                :total="searchData.totalCount"
                >
            </el-pagination>
        </template> -->
    </CommonTable>

    <el-dialog v-model="addFormData.centerDialogVisible" :title="addFormData.title" width="30%" destroy-on-close center>
        <el-form ref="ruleForm" :model="addFormData.formData" :rules="rules">
            <el-form-item label="期限" prop="daysYear">
                <el-input v-model="addFormData.formData.daysYear" placeholder="请输入期限"></el-input>
            </el-form-item>

            <el-form-item label="单位" prop="company">
                <BcSelect v-model="addFormData.formData.company" :list="uintList" placeholder="请选择单位"></BcSelect>
            </el-form-item>

            <el-form-item label="排序" prop="orderNum">
                <el-input v-model="addFormData.formData.orderNum" placeholder="请输入排序值"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addFormData.centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
    import { ref } from "vue";
    import CommonTable from "@common/finsuit-components/CommonTable";
    import tableConfig from "./../compositionApi/TableConfig";
    import addForm from "./../compositionApi/AddForm";
    import selectData from "./../compositionApi/SelectData";
    export default {
        components: { CommonTable },
        props: {
            tabType: {
                type: String,
                default: ""
            }
        },
        setup() {
            const { uintList } = selectData();
            const ruleForm = ref(null);

            const { addFormData, rules, submit } = addForm(formDataApi);

            const { limitTable, formDataApi, handleEdit, handleDelete } = tableConfig(addFormData, uintList, ruleForm);

            formDataApi();

            return {
                ruleForm,
                uintList,
                addFormData,
                rules,
                submit,

                limitTable,
                formDataApi,
                handleEdit,
                handleDelete
            };
        }
    };
</script>

<style lang="less" scoped>
    /deep/ .content-search {
        padding-bottom: 20px;
    }
</style>
