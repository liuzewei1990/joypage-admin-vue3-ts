<!--  -->
<template>
    <BcPageForm :title="pageTypes[pageType]" :model="form" :rules="formRule" ref="BcPageFormRefComponent">
        <!-- {{form}} -->
        <ItemBox title="选择拼团产品">
            <!-- 公共业务组件 -->
            <PrdSelect title="选择拼团产品" v-model:orgId="form.orgId" v-model:prdIndexId="form.prdIndexId" :disabled="pageType == '2'"></PrdSelect>
        </ItemBox>

        <ItemBox title="人数设置">
            <el-row>
                <el-form-item label="拼团类型" prop="assembleType" style="margin-right: 30px">
                    <el-radio-group v-model="form.assembleType">
                        <el-radio :label="item.id" v-for="item in $json.assembleTypeArr" :key="item.id">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="拼团人数" prop="assembleTotalNumbers" :style="{ width: '200px' }">
                    <el-input v-model="form.assembleTotalNumbers" type="number" placeholder="输入人数">
                        <template #suffix>
                            <span>人</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="注水时间" prop="injectionWaterInterval" :style="{ width: '200px' }">
                    <el-input v-model="form.injectionWaterInterval" type="number" placeholder="输入注水时间">
                        <template #suffix>
                            <span>分钟</span>
                        </template>
                    </el-input>
                </el-form-item>
            </el-row>
        </ItemBox>

        <ItemBox title="拼团规则设置">
            <el-row>
                <el-form-item label="拼团金额" prop="targetAmount">
                    <el-input v-model="form.targetAmount" type="number" placeholder="输入金额">
                        <template #suffix>
                            <span>元</span>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="拼团状态" prop="status">
                    <BcSelect modelType="id" v-model="form.status" :list="$json.statusSelect"></BcSelect>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort" type="number" placeholder="" :style="{ width: '100px' }"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="拼团控制" prop="comtrol">
                    <BcSelect modelType="id" v-model="form.comtrol" :list="$json.personComtrolArr"></BcSelect>
                </el-form-item>
                <el-form-item label="活动可见入口" prop="entrance">
                    <BcSelect modelType="id" v-model="form.entrance" :list="$json.entranceArr" :style="{ width: '580px' }" multiple></BcSelect>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="拼团日期" prop="_date">
                    <el-date-picker
                        v-model="form._date"
                        type="datetimerange"
                        :disabled="pageType == '2'"
                        :disabledDate="disabledDate"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="拼团时间" prop="assembleMinutes">
                    <el-input v-model="form.assembleMinutes" type="number" placeholder="输入分钟">
                        <template #suffix>
                            <span>分钟</span>
                        </template>
                    </el-input>
                </el-form-item>
            </el-row>
        </ItemBox>

        <ItemBox title="奖励设置">
            <el-row>
                <el-form-item label="奖励类型" prop="rewardType">
                    <BcSelect modelType="id" v-model="form.rewardType" :list="$json.rewardType" @change="form._rewardTypeChange" :disabled="pageType == '2'" :style="{ width: '300px' }"></BcSelect>
                </el-form-item>
                <el-form-item label="选择奖励" prop="rewardId">
                    <BcSelect
                        modelType="id"
                        :autoGetApiData="!!form.rewardId"
                        v-model="form.rewardId"
                        @GetApiData="$json.getActPersonRewardInfoSelect($event, form.rewardType)"
                        :disabled="pageType == '2'"
                        :key="form.rewardType"
                        itemNameKey="REWARD_NAME"
                        itemValueKey="ID"></BcSelect>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="奖励标签" prop="rewardLabel">
                    <el-input v-model="form.rewardLabel" placeholder="输入奖励标签，多个标签使用英文逗号分隔" :style="{ width: '300px' }"></el-input>
                </el-form-item>
                <el-form-item label="奖励描述" prop="rewardDesc">
                    <el-input v-model="form.rewardDesc" placeholder="输入奖励描述" :style="{ width: '200px' }"></el-input>
                </el-form-item>
            </el-row>
        </ItemBox>

        <ItemBox title="产品cell特殊显示规则">
            <template #title>
                <el-checkbox v-model="form.isSpecialRuleShow" :true-label="1" :false-label="0">是否使用</el-checkbox>
                <el-tooltip class="item" effect="dark" content="勾选后可重新编辑产品前端信息的特殊显示规则，只对当前活动有效" placement="top-start">
                    <i class="el-icon-question" style="color: #555; margin-left: 10px"></i>
                </el-tooltip>
            </template>
            <EditPrdInfo v-show="form.isSpecialRuleShow" :prdIndexId="form.prdIndexId" v-model="form.specialRule"></EditPrdInfo>
        </ItemBox>

        <ItemBox title="详情页展示配置">
            <el-row>
                <el-form-item label="产品详情页标签" prop="prdDetailsLabel">
                    <el-input v-model="form.prdDetailsLabel" placeholder="多个标签，以英文逗号隔开" :style="{ width: '300px' }"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="拼团规则" prop="ruleUrl">
                    <BcUpLoadImg v-model="form.ruleUrl" :limit="1"></BcUpLoadImg>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="详细规则" prop="detailRule">
                    <BcEditor v-model="form.detailRule"></BcEditor>
                </el-form-item>
            </el-row>
        </ItemBox>

        <ItemBox title="存入结果页温馨提示">
            <el-form-item label="温馨提示" prop="warmPrompt">
                <el-input v-model="form.warmPrompt" placeholder="" :style="{ width: '200px' }"></el-input>
            </el-form-item>
        </ItemBox>

        <ItemBox title="发布设置">
            <!-- 公共业务组件 -->
            <ChannelSelect
                title="发布渠道设置"
                v-model:appFlag="form.appFlag"
                :appFlagSelect="$json.appFlagSelectMore"
                v-model:device="form.deviceType"
                v-model:visibleUser="form.visibleType"
                :visibleUserSelect="$json.visibleSelect"></ChannelSelect>
        </ItemBox>

        <el-row>
            <el-button size="mini" type="primary" @click="submit(BcPageFormRefComponent)">提交</el-button>
            <el-button size="mini" @click="goBack">返回</el-button>
        </el-row>
    </BcPageForm>
</template>

<script setup>
    import { BcPageForm, ItemBox } from "@common/finsuit-components/BcPageForm";
    import BcUpLoadImg from "@common/finsuit-components/BcUpLoadImg";
    import BcEditor from "@common/finsuit-components/BcEditor";
    import ChannelSelect from "@common/finsuit-modules/Form/ChannelSelect.vue";
    import PrdSelect from "@common/finsuit-modules/Form/PrdSelect.vue";
    import EditPrdInfo from "../../modules/EditPrdInfo.vue";
    import AddForm from "./compositionApi/AddForm";
    import SelectData from "./compositionApi/SelectData";
    import { ref } from "vue";

    const BcPageFormRefComponent = ref(null);

    const { form, formRule, pageType, pageTypes, submit, goBack, disabledDate } = AddForm();
    const { appFlagSelect, deviceSelect, getOrgSelect, getPrdSelect } = SelectData();
</script>
<style lang="less" scoped>
    .form-item {
        /deep/ .el-input__inner {
            padding-right: 150px;
        }
    }
</style>
