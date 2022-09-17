<template>
    <CommonTable :isgFull="false">
        <!-- 新增按钮区域 -->
        <template #action>
            <el-button size="mini" type="primary" @click="handleEditSed">新增二级机构类型</el-button>
            <el-button size="mini" type="primary" @click="handleEditOne">设置一级机构类型</el-button>
        </template>
        <!-- 主体 -->
        <el-table size="mini" :data="tableData.FormData" style="width: 100%" stripe :border="true" element-loading-text="loading...">
            <el-table-column label="二级机构类型名称" align="center" prop="orgTypeName"></el-table-column>
            <el-table-column label="一级机构类型" align="center" prop="orgOneTypeName"></el-table-column>
            <el-table-column label="当前机构数量" align="center" prop="count"></el-table-column>
            <el-table-column label="排序" align="center" prop="orderNo"></el-table-column>
            <el-table-column label="备注" align="center" prop="remarks"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button size="mini" type="text" @click="handleEditSed(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </CommonTable>

    <!-- 新增修改二级机构名称弹窗 -->
    <el-dialog v-model="formModelSed.dialogVisibleSed" :title="formModelSed.title" width="35%" center destroy-on-close>
        <AddSecondLevel ref="addSecond" :formSedData="formModelSed.addSedFormData" :formSedRule="rulesSed"></AddSecondLevel>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="formModelSed.dialogVisibleSed = false" size="mini">取消</el-button>
                <el-button type="primary" @click="submitSed" size="mini">确定</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 设置一级级机构名称弹窗 -->
    <el-dialog v-model="formModelOne.dialogVisibleOne" title="设置一级机构类型" width="60%" center destroy-on-close>
        <AddOneLevel ref="addOne" :tableObject="oneOrgTableData" :formOneData="tableData.FormData"></AddOneLevel>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="formModelOne.dialogVisibleOne = false" size="mini">关闭</el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 删除弹窗 -->
    <el-dialog v-model="tableData.deleteDialogVisible" title="提示" width="30%" center>
        <p v-if="tableData.currentRow.count > 0">提示当前共有{{ tableData.currentRow.count }}家机构为此类型，暂不能删除此类型，可前往直销银行管理中进行调整</p>
        <p v-else style="text-align: center">确定删除此类型吗</p>
        <template #footer>
            <span class="dialog-footer">
                <el-button v-if="tableData.currentRow.count > 0" @click="tableData.deleteDialogVisible = false" size="mini">知道了</el-button>
                <div v-else>
                    <el-button @click="tableData.deleteDialogVisible = false" size="mini">取消</el-button>
                    <el-button type="primary" @click="deleteConfirm" size="mini">确定</el-button>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
    import { ref, toRefs, reactive, getCurrentInstance, onMounted } from "vue";
    import BcSelect from "@common/finsuit-components/BcSelect";
    import CommonTable from "@common/finsuit-components/CommonTable";
    import AddOneLevel from "./modules/AddOneLevel.vue";
    import AddSecondLevel from "./modules/AddSecondLevel.vue";
    import SelectData from "./compositionApi/SelectData";
    import tableConfig from "./compositionApi/TableConfig";
    import AddOneForm from "./compositionApi/AddOneForm";
    import AddSedForm from "./compositionApi/AddSedForm";

    const addSecond = ref(null);
    const addOne = ref(null);
    //列表数据
    const {
        tableData,
        // handleEditSed,
        handleDelete,
        deleteConfirm,
        // handleEditOne,
        getTableData
    } = tableConfig();
    // const {
    //    formModelOne,

    // } = AddOneForm(tableData) //因为AddOneForm js需要传给一级机构组件，所以不能进行解构传值，解构传值会造成函数执行两次，产生两个作用域
    const oneOrgTableData = AddOneForm(getTableData);

    const { formModelOne, handleEditOne } = oneOrgTableData;

    const { handleEditSed, formModelSed, rulesSed, submitSed } = AddSedForm(addSecond, getTableData);

    // 渲染列表数据
    getTableData();
</script>
