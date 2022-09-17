<!--  -->
<template>
    <BcPageForm title="新增" :model="form" :rules="formRule" ref="BcPageFormRefComponent">
        <ItemBox title="Form">
            <pre>{{ form }}</pre>
        </ItemBox>

        <ItemBox title="使用产品设置业务组件">
            <PrdSelect v-model:orgId="form.orgId" v-model:prdIndexId="form.prdIndexId"></PrdSelect>
        </ItemBox>

        <ItemBox title="活动信息">
            <el-row>
                <el-form-item label="活动名称" prop="">
                    <el-input v-model="form.name" placeholder="演示布局"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" prop="">
                    <el-input v-model="form.name" placeholder="演示布局"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="换行" prop="">
                    <el-input v-model="form.name" placeholder="演示布局"></el-input>
                </el-form-item>
            </el-row>
        </ItemBox>

        <!-- 自定义发布设置 -->
        <ItemBox title="发布设置">
            <el-form-item label="设备" prop="">
                <BcSelect modelType="id" v-model="form.device" placeholder="选择设备" :list="deviceSelect" filterable></BcSelect>
            </el-form-item>
        </ItemBox>

        <ItemBox title="使用发布设置业务组件">
            <!-- 使用发布设置业务组件 多重model绑定双向数据流 目前支持三种 渠道:appFlag、设备:device、可见用户:visibleUser， 支持自定义select json 支持移出select 支持插槽位 -->
            <!-- <ChannelSelect v-model:appFlag="form.flag" v-model:device="form.device" :visibleUser="false"></ChannelSelect> -->
        </ItemBox>

        <el-row>
            <el-button size="mini" type="primary" @click="submit()">提交</el-button>
            <el-button size="mini" @click="goBack">返回</el-button>
        </el-row>
    </BcPageForm>
</template>

<script setup>
    import { BcPageForm, ItemBox } from "@common/finsuit-components/BcPageForm";
    import PrdSelect from "@common/finsuit-modules/Form/PrdSelect";

    import AddForm from "./compositionApi/AddForm";
    import SelectData from "./compositionApi/SelectData";
    import { onMounted, ref } from "vue";

    // form ref
    const BcPageFormRefComponent = ref(null);

    const { form, formRule, submit, goBack } = AddForm(BcPageFormRefComponent);
    const { appFlagSelect, deviceSelect, getOrgSelect, getPrdSelect } = SelectData();
</script>
<style lang="less" scoped></style>
