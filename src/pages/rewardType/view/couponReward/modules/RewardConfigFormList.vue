<!--  -->
<template>
    <!-- {{formList}} -->
    <FormListBox v-for="(form, index) in formList" :key="index" :isShowTitle="index === 0">
        <FormListItem title="持仓时间" width="150px" :required="true">
            <el-form-item :prop="`configList[${index}].holdDay`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <el-input type="number" v-model="form.holdDay" placeholder=""><template #append>天</template></el-input>
            </el-form-item>
        </FormListItem>
        <FormListItem title="加息利率" width="150px" :required="true">
            <el-form-item :prop="`configList[${index}].rewardRate`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <el-input type="number" v-model="form.rewardRate" placeholder=""><template #append>%</template></el-input>
            </el-form-item>
        </FormListItem>
        <FormListItem title="最高奖励" width="150px" :required="true">
            <el-form-item :prop="`configList[${index}].rewardTopLimit`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <el-input type="number" v-model="form.rewardTopLimit" placeholder=""><template #append>元</template></el-input>
            </el-form-item>
        </FormListItem>
        <FormListItem title="">
            <el-link href="javascript:void(0);" icon="el-icon-remove" v-if="formList.length > 1" @click="removeFormItem(index)">删除</el-link>
            <el-link href="javascript:void(0);" icon="el-icon-circle-plus" v-if="formList.length === index + 1" @click="addFormItem(formList.length + 1)">新增</el-link>
        </FormListItem>
    </FormListBox>
</template>

<script setup>
    import { getCurrentInstance, ref, watch, watchEffect } from "vue";
    import { FormListBox, FormListItem } from "../../../components/FormListBox";
    const emit = defineEmits(["update:modelValue"]);
    const props = defineProps({
        modelValue: {
            type: Array,
            default: []
        }
    });
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 表单列表
    const formList = ref([]);

    // v-model进入
    watchEffect(() => {
        formList.value = props.modelValue;
    });

    // v-model回传
    watch(
        formList,
        (newVal) => {
            emit("update:modelValue", newVal);
        },
        { deep: true }
    );

    // 新增
    const addFormItem = (index = 1) => {
        // ...是让该对象失去代理，重新复制一份新的备份创建
        formList.value.push({ ...formList.value[formList.value.length - 1] });
    };

    // 删除
    const removeFormItem = async (index) => {
        let res = await _this.$confirm("确定删除吗？", "提示", { type: "warning" });
        formList.value.splice(index, 1);
    };
</script>
<style lang="less" scoped></style>
