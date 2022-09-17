<!--  -->
<template>
    <!-- {{formList}} -->
    <FormListBox v-for="(form, index) in formList" :key="index" :isShowTitle="index === 0">
        <FormListItem title="奖品名称" width="150px" :required="true">
            <el-form-item :prop="`configList[${index}].title`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <el-input type="text" v-model="form.title" placeholder=""></el-input>
            </el-form-item>
        </FormListItem>
        <FormListItem title="奖品图片" width="100px" :required="true">
            <el-form-item :prop="`configList[${index}].picture`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }" style="width: auto">
                <BcUpLoadImg v-model="form.picture"></BcUpLoadImg>
            </el-form-item>
        </FormListItem>
        <FormListItem title="奖品类型" width="100px" :required="true">
            <el-form-item :prop="`configList[${index}].randomType`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <BcSelect v-model="form.randomType" :list="$json.randomRewardSelect" @change="randomTypeChange(form)"></BcSelect>
            </el-form-item>
        </FormListItem>
        <FormListItem title="奖品数值" width="150px" :required="true">
            <!-- 奖励类型值:现金 -->
            <el-form-item v-if="form.randomType == '1'" :prop="`configList[${index}].rewardAmount`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <el-input type="number" v-model="form.rewardAmount" placeholder="输入现金数值"><template #append>元</template></el-input>
            </el-form-item>
            <!-- 奖励类型值:积分 -->
            <el-form-item v-if="form.randomType == '2'" :prop="`configList[${index}].rewardIntegral`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <el-input type="number" v-model="form.rewardIntegral" placeholder="输入积分数值"><template #append>积分</template></el-input>
            </el-form-item>
            <!-- 奖励类型值:卡券 -->
            <el-form-item v-if="form.randomType == '3'" :prop="`configList[${index}].couponId`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                <BcSelect v-model="form.couponId" placeholder="选择卡券" :autoGetApiData="true" @GetApiData="$json.getCouponSelect"></BcSelect>
            </el-form-item>
            <!-- 奖励类型值:实物 为空 -->
            <el-form-item v-if="form.randomType == '4'">
                <el-input type="number" placeholder="实物中奖率为0" disabled></el-input>
            </el-form-item>
        </FormListItem>
        <FormListItem title="中奖概率" width="80px" :required="true">
            <el-tooltip class="item" effect="dark" content="实物中将概率为0" :disabled="form.randomType != '4'" placement="top">
                <el-form-item :prop="`configList[${index}].probability`" :rules="{ required: true, message: '内容不能为空', trigger: 'blur' }">
                    <el-input type="number" v-model="form.probability" placeholder="" :disabled="form.randomType == '4'"><template #append>%</template></el-input>
                </el-form-item>
            </el-tooltip>
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
    import BcUpLoadImg from "@common/finsuit-components/BcUpLoadImg";

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

    // 奖品类型变化时
    const randomTypeChange = (form) => {
        form.rewardAmount = "";
        form.rewardIntegral = "";
        form.couponId = "";
        form.probability = "0";
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
