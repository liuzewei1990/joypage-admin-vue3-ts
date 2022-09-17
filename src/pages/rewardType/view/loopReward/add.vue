<!--  -->
<template>
    <BcPageForm :title="pageTypes[pageType]" :model="form" :rules="formRule" ref="BcPageFormRefComponent">
        <!-- <ItemBox title="Form">
      <pre>{{form}}</pre>
    </ItemBox> -->

        <ItemBox title="奖励配置">
            <el-row>
                <el-form-item label="加息利率" prop="rewardRate">
                    <el-input type="number" v-model="form.rewardRate" placeholder="" style="width: 150px"><template #append>%</template></el-input>
                </el-form-item>
                <el-form-item label="利率期限" prop="rateTimeLimit">
                    <el-input type="number" v-model="form.rateTimeLimit" placeholder="" style="width: 150px"><template #append>天</template></el-input>
                </el-form-item>
                <el-form-item label="付息周期" prop="rateCycle">
                    <el-input type="number" v-model="form.rateCycle" placeholder="" style="width: 150px"><template #append>天</template></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="加息时间" prop="holdDay">
                    <el-input type="number" v-model="form.holdDay" placeholder="" style="width: 150px"><template #append>天</template></el-input>
                </el-form-item>
                <el-form-item label="最高奖励" prop="rewardTopLimit">
                    <el-input type="number" v-model="form.rewardTopLimit" placeholder=""><template #append>元/每期</template></el-input>
                </el-form-item>
            </el-row>
        </ItemBox>

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
            <RewardScopeForm v-model:rewardScope="form.rewardScope" rewardScopeProp="rewardScope" v-model:rewardScopeId="form.activityId" rewardScopeIdProp="activityId"></RewardScopeForm>
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

    import AddForm from "./compositionApi/AddForm";
    import SelectData from "./compositionApi/SelectData";
    import { onMounted, ref } from "vue";

    // form ref
    const BcPageFormRefComponent = ref(null);

    const { form, formRule, pageType, pageTypes, submit, goBack } = AddForm(BcPageFormRefComponent);
    const { appFlagSelect, deviceSelect, getOrgSelect, getPrdSelect } = SelectData();
</script>
<style lang="less" scoped></style>
