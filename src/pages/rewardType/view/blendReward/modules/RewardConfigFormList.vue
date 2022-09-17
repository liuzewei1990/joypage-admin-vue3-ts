<!--  -->
<template>
    <!-- {{formList}} -->
    <FormListBox v-for="(form, index) in formList" :key="index" :isShowTitle="index === 0">
        <FormListItem title="投资金额" width="120px" :required="true">
            <el-form-item :prop="`configList[${index}].investAmount`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <el-input type="number" v-model="form.investAmount" placeholder=""><template #append>元</template></el-input>
            </el-form-item>
        </FormListItem>
        <FormListItem title="持仓时间" width="100px" :required="true">
            <el-form-item :prop="`configList[${index}].holdDay`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <el-input type="number" v-model="form.holdDay" placeholder=""><template #append>天</template></el-input>
            </el-form-item>
        </FormListItem>
        <FormListItem title="奖励类型" width="100px" :required="true">
            <BcSelect size="mini" v-model="form.mixType" :list="$json.blendRewardSelect" @change="mixTypeChange(form)"></BcSelect>
        </FormListItem>
        <FormListItem title="奖励数值" width="250px" :required="true">
            <!-- 现金奖励类型的值 -->
            <el-form-item :prop="`configList[${index}].rewardAmount`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }" v-if="form.mixType == '1'">
                <el-input type="number" v-model="form.rewardAmount" placeholder="输入现金数值"><template #append>元</template></el-input>
            </el-form-item>
            <!-- 积分奖励类型的值 -->
            <el-form-item :prop="`configList[${index}].rewardIntegral`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }" v-if="form.mixType == '2'">
                <el-input type="number" v-model="form.rewardIntegral" placeholder="输入积分数值"><template #append>积分</template></el-input>
            </el-form-item>
            <!-- 加息奖励类型的值 -->
            <el-form-item :prop="`configList[${index}].rewardAmount`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }" v-if="form.mixType == '3'">
                <el-input type="number" v-model="form.rewardAmount" placeholder="输入加息数值"><template #append>%</template></el-input>
            </el-form-item>
            <!-- 权益奖励类型的值 -->
            <el-form-item :prop="`configList[${index}].benefitType`" :required="!!form.benefitType" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }" v-if="form.mixType == '4'">
                <BcSelect size="mini" v-model="form.benefitType" placeholder="选择权益类型" :list="$json.welfareTypeSelect" @change="benefitTypeChange(form)"></BcSelect>
            </el-form-item>
            <el-form-item :prop="`configList[${index}].benefitId`" :required="!!form.benefitId" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }" v-if="form.mixType == '4'">
                <BcSelect
                    size="mini"
                    v-model="form.benefitId"
                    placeholder="选择权益"
                    :autoGetApiData="!!form.benefitId"
                    @GetApiData="$json.getWealBenefitByType($event, form.benefitType)"
                    :disabled="!form.benefitType"
                    :key="form.benefitType"
                    itemValueKey="ID"
                    itemNameKey="NAME"></BcSelect>
            </el-form-item>
        </FormListItem>
        <!-- 最高奖励只有mixType==3（加息类型）的时候可用 -->
        <FormListItem title="最高奖励" width="100px" :required="form.mixType == '3'">
            <el-form-item v-if="form.mixType == '3'" :prop="`configList[${index}].rewardTopLimit`" :rules="{ required: form.mixType == '3', message: '内容不能为空', trigger: 'blur' }">
                <el-input type="number" v-model="form.rewardTopLimit" placeholder="" :disabled="form.mixType != '3'"><template #append>元</template></el-input>
            </el-form-item>
        </FormListItem>
        <FormListItem title="">
            <el-link href="javascript:void(0);" icon="el-icon-remove" v-if="formList.length > 1" @click="removeFormItem(index)">删除</el-link>
            <el-link href="javascript:void(0);" icon="el-icon-circle-plus" v-if="formList.length === index + 1" @click="addFormItem(formList.length + 1)">新增</el-link>
        </FormListItem>
    </FormListBox>
</template>

<script setup>
    import { getCurrentInstance, ref, toRaw, toRefs, watch, watchEffect } from "vue";
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

    // 奖励类型变化时 清空指定字段
    const mixTypeChange = (fromItem) => {
        fromItem.rewardAmount = "";
        fromItem.rewardIntegral = "";
        fromItem.rewardRate = "";
        fromItem.rewardTopLimit = "";
        fromItem.benefitType = "";
        fromItem.benefitId = "";
    };

    const benefitTypeChange = (fromItem) => {
        fromItem.benefitId = "";
    };

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
