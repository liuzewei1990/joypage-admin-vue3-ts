<template>
    <el-form ref="refSecond" :model="formSedData" :rules="formSedRule">
        <el-form-item label="一级机构类型" prop="upId">
            <BcSelect
                v-model="formSedData.upId"
                itemValueKey="value"
                itemNameKey="label"
                @GetApiData="getOrgSelect"
                :autoGetApiData="formSedData.upId != ''"
                filterable
                clearable
                placeholder="请选择一级机构类型">
            </BcSelect>
        </el-form-item>

        <el-form-item label="二级机构类型名称" prop="orgTypeName">
            <el-input v-model="formSedData.orgTypeName" placeholder="请填写二级机构类型名称"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="orderNo">
            <el-input v-model="formSedData.orderNo" placeholder="请填写排序"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="mark">
            <el-input v-model="formSedData.remarks" placeholder="请填写备注"></el-input>
        </el-form-item>
    </el-form>
</template>
<script setup>
    import { ref } from "vue";
    import BcSelect from "@common/finsuit-components/BcSelect";
    import SelectData from "../compositionApi/SelectData";
    // import AddSedForm from "../compositionApi/AddSedForm"

    const refSecond = ref(null);
    defineExpose({ refSecond }); //表单验证的时候需要把ref值暴露出去，父组件才能拿到子组件ref的值  addSecond.value.refSecond

    // const {
    //     formModelSed,
    //     rules,
    // } = AddSedForm() //此处不能执行AddSedForm(),父组件传数据给子组件，子组件可以接收到数据，
    //但是AddSedForm函数中formModelSed数据中的addSedFormData会再次渲染，会覆盖掉父组件传来的数据，
    //然后页面中formModelSed.addSedFormData 会为空，
    //结论：父子组件中引进来的formModelSed.initFormData里的代码不是在一个作用域,子组件弹窗形式，要保证操作同一个js

    const { getOrgSelect } = SelectData();

    // 接收父组件传来的值
    const prop = defineProps({
        formSedData: {
            type: Object,
            default: {}
        },
        formSedRule: {
            type: Object,
            default: {}
        }
    });
    console.log("父->子", prop.formSedData);
</script>
