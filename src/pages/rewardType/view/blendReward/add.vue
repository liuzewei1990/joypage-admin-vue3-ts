<!--  -->
<template>
    <BcPageForm :title="pageTypes[pageType]" :model="form" :rules="formRule" ref="BcPageFormRefComponent">
        <!-- <ItemBox title="Form">
      <pre>{{form}}</pre>
    </ItemBox> -->

        <ItemBox title="奖励配置" style="margin-bottom: inherit; border-bottom: none"></ItemBox>
        <RewardConfigFormList v-model="form.configList"></RewardConfigFormList>

        <ItemBox title="奖励描述">
            <el-row>
                <el-form-item label="奖励名称" prop="rewardName">
                    <el-input v-model="form.rewardName" placeholder="请输入奖励名称" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="奖励描述" prop="rewardDescribe">
                    <el-input v-model="form.rewardDescribe" placeholder="请输入奖励描述" style="width: 200px"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="奖励说明" prop="rewardRule">
                    <el-input v-model="form.rewardRule" placeholder="请输入奖励说明" type="textarea" style="width: 300px"></el-input>
                </el-form-item>
            </el-row>
        </ItemBox>

        <ItemBox title="奖励适用范围">
            <RewardScopeForm v-model:rewardScope="form.rewardScope" v-model:rewardScopeId="form.rewardScopeId"></RewardScopeForm>
        </ItemBox>

        <el-row>
            <el-button size="mini" type="primary" @click="submit()">提交</el-button>
            <el-button size="mini" @click="goBack">返回</el-button>
        </el-row>
    </BcPageForm>
</template>

<script setup>
    import { BcPageForm, ItemBox } from "@common/finsuit-components/BcPageForm";
    import ChannelSelect from "@common/finsuit-modules/Form/ChannelSelect";
    import RewardScopeForm from "../../modules/RewardScopeForm";
    import RewardConfigFormList from "./modules/RewardConfigFormList.vue";

    import AddForm from "./compositionApi/AddForm";
    import SelectData from "./compositionApi/SelectData";
    import { onMounted, ref } from "vue";

    // form ref
    const BcPageFormRefComponent = ref(null);

    const { form, formRule, pageType, pageTypes, submit, goBack } = AddForm(BcPageFormRefComponent);
    const { appFlagSelect, deviceSelect, getOrgSelect, getPrdSelect } = SelectData();
</script>
<style lang="less" scoped></style>
