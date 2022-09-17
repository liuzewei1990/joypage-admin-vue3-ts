<template>
    <el-button class="addBtn" size="small" @click="tableObject.createRow" :type="tableObject.formModelOne.controlButton ? 'primary' : 'info'">新增</el-button>

    <el-form ref="refOne" :model="tableObject.formModelOne.form.tableData" :rules="tableObject.rulesOne" size="mini">
        <el-table :data="tableObject.formModelOne.form.tableData" border element-loading-text="loading..." size="small">
            <el-table-column prop="orgTypeName" label="设置一级机构类型名称" align="center">
                <template v-slot="scope">
                    <el-form-item :prop="`${scope.$index}.orgTypeName`" :rules="tableObject.rulesOne.orgTypeName">
                        <!-- <el-form-item :prop="`${scope.$index}.orgTypeName`" :rules="{required: true, message: '请填写一级机构', trigger: 'blur'}"> -->
                        <input type="text" v-model="scope.row.orgTypeName" :disabled="scope.row.isEdit" />
                    </el-form-item>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <div v-if="scope.row.status == 0">
                        <el-button v-if="scope.row.isEdit" size="mini" type="text" @click="tableObject.handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button v-else size="mini" type="text" @click="tableObject.submitOne(scope.row, refOne)">保存</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
</template>
<script setup>
    import { ref } from "vue";

    const refOne = ref(null);

    const prop = defineProps({
        tableObject: {
            type: Object
        },
        formOneData: {
            type: Object
        }
    });

    console.log("父传子js", prop.tableObject);
    console.log("父传子data", prop.formOneData);
</script>
<style lang="less" scoped>
    .addBtn {
        margin-bottom: 10px;
    }
    /deep/ .el-form-item__error {
        left: 30%;
    }
</style>
