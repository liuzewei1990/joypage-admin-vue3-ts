<!--  -->
<template>
    <BcPageForm :model="form" :rules="formRule" :title="pageTypes[pageType]" ref="BcPageFormRefComponent">
        <div class="container">
            <div class="title">选择产品：</div>
            <div class="box">
                <el-row>
                    <el-form-item label="选择产品" prop="prdIndexId" :show-message="false"></el-form-item>
                    <el-form-item label="" prop="orgId">
                        <BcSelect
                            modelType="id"
                            :autoGetApiData="form.orgId != ''"
                            v-model="form.orgId"
                            @GetApiData="getOrgSelect"
                            placeholder="选择机构"
                            @change="form._orgIdChange"
                            clearable
                            filterable></BcSelect>
                    </el-form-item>
                    <el-form-item label="" prop="prdIndexId">
                        <BcSelect
                            modelType="id"
                            :autoGetApiData="form.prdIndexId.length > 0"
                            v-model="form.prdIndexId"
                            @GetApiData="getPrdSelect($event, form.orgId)"
                            placeholder="选择产品,支持多选"
                            style="width: 300px"
                            :disabled="form.orgId == ''"
                            :key="form.orgId"
                            clearable
                            filterable
                            multiple></BcSelect>
                    </el-form-item>
                </el-row>
            </div>
        </div>

        <div class="container">
            <div class="title">
                奖励设置：
                <el-checkbox v-model="rewardRadio">添加奖励</el-checkbox>
            </div>
            <div class="box" v-show="rewardRadio">
                <el-row>
                    <el-form-item label="新手奖励" prop="noviceRewardType">
                        <BcSelect modelType="id" v-model="form.noviceRewardType" :list="rewardType" placeholder="选择奖励类型" @change="form._noviceRewardTypeChange" clearable></BcSelect>
                    </el-form-item>
                    <el-form-item prop="noviceRewardId">
                        <!-- autoGetApiData  true：自动触发GetApiData事件请求数据回显操作 false：手动请求 一般回显时设置为true -->
                        <BcSelect
                            modelType="id"
                            :autoGetApiData="form.noviceRewardId != ''"
                            v-model="form.noviceRewardId"
                            @GetApiData="getRewardInfoSelect($event, form.noviceRewardType)"
                            placeholder="选择奖励"
                            :disabled="form.noviceRewardType == ''"
                            :key="form.noviceRewardType"
                            itemNameKey="REWARD_NAME"
                            itemValueKey="ID"
                            clearable></BcSelect>
                    </el-form-item>
                    <el-form-item prop="noviceRewardTime">
                        <el-input v-model="form.noviceRewardTime" placeholder="奖励次数" disabled><template #suffix>奖励次数（次）</template></el-input>
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item label="首购奖励" prop="firstRewardType">
                        <BcSelect modelType="id" v-model="form.firstRewardType" :list="rewardType" placeholder="选择奖励类型" @change="form._firstRewardTypeChange" clearable></BcSelect>
                    </el-form-item>
                    <el-form-item prop="firstRewardId">
                        <!-- autoGetApiData  true：自动触发GetApiData事件请求数据回显操作 false：手动请求 一般回显时设置为true -->
                        <BcSelect
                            modelType="id"
                            :autoGetApiData="form.firstRewardId != ''"
                            v-model="form.firstRewardId"
                            @GetApiData="getRewardInfoSelect($event, form.firstRewardType)"
                            placeholder="选择奖励"
                            :disabled="form.firstRewardType == ''"
                            :key="form.firstRewardType"
                            itemNameKey="REWARD_NAME"
                            itemValueKey="ID"
                            clearable></BcSelect>
                    </el-form-item>
                    <el-form-item prop="firstRewardTime">
                        <el-input v-model="form.firstRewardTime" placeholder="奖励次数" disabled><template #suffix>奖励次数（次）</template></el-input>
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item label="通用奖励" prop="generalRewardType">
                        <BcSelect modelType="id" v-model="form.generalRewardType" :list="rewardType" placeholder="选择奖励类型" @change="form._generalRewardTypeChange" clearable></BcSelect>
                    </el-form-item>
                    <el-form-item prop="generalRewardId">
                        <!-- autoGetApiData  true：自动触发GetApiData事件请求数据回显操作 false：手动请求 一般回显时设置为true -->
                        <BcSelect
                            modelType="id"
                            :autoGetApiData="form.generalRewardId != ''"
                            v-model="form.generalRewardId"
                            @GetApiData="getRewardInfoSelect($event, form.generalRewardType)"
                            placeholder="选择奖励"
                            :disabled="form.generalRewardType == ''"
                            :key="form.generalRewardType"
                            itemNameKey="REWARD_NAME"
                            itemValueKey="ID"
                            clearable></BcSelect>
                    </el-form-item>
                    <el-form-item prop="generalRewardTime">
                        <el-input v-model="form.generalRewardTime" placeholder="奖励次数" :disabled="form.generalRewardType == ''"><template #suffix>奖励次数（次）</template></el-input>
                    </el-form-item>
                </el-row>
            </div>
        </div>

        <div class="container">
            <div class="title">产品设置：</div>
            <div class="box">
                <el-row>
                    <el-row>
                        <el-form-item label="奖励标签" prop="noviceRewardId">
                            <el-input v-model="form.rewardDesc" placeholder="多个标签使用逗号隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="详细规则" prop="detailRule">
                            <BcSelect
                                modelType="id"
                                :autoGetApiData="form.detailRule != ''"
                                v-model="form.detailRule"
                                @GetApiData="getActivityRuleListNoPage"
                                placeholder="请选择"
                                clearable
                                itemNameKey="ruleName"
                                itemValueKey="id"></BcSelect>
                        </el-form-item>
                        <el-form-item label="活动可见入口" prop="entrance">
                            <BcSelect modelType="id" v-model="form.entrance" :list="entranceSelect" placeholder="请选择" clearable multiple :style="{ width: '580px' }"></BcSelect>
                        </el-form-item>
                    </el-row>

                    <el-row>
                        <el-form-item label="拼团状态" prop="status">
                            <BcSelect modelType="id" v-model="form.status" :list="statusSelect" placeholder="请选择"></BcSelect>
                        </el-form-item>
                        <el-form-item label="生效日期" prop="dateTimes">
                            <el-date-picker
                                v-model="form.dateTimes"
                                :disabledDate="disabledDate"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                format="YYYY-MM-DD HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="排序" prop="sort">
                            <el-input v-model="form.sort" type="number" placeholder="" :style="{ width: '100px' }"></el-input>
                        </el-form-item>
                    </el-row>
                </el-row>
            </div>
        </div>

        <div class="container">
            <div class="title">发布设置：</div>
            <div class="box">
                <el-row>
                    <el-form-item label="发布渠道" prop="appFlag">
                        <BcSelect modelType="id" v-model="form.appFlag" :list="appFlagSelect" placeholder="请选择" multiple></BcSelect>
                    </el-form-item>
                    <el-form-item label="发布设备" prop="deviceType">
                        <BcSelect modelType="id" v-model="form.deviceType" :list="deviceSelect" placeholder="请选择"></BcSelect>
                    </el-form-item>
                    <el-form-item label="可见用户" prop="visibleType">
                        <BcSelect modelType="id" v-model="form.visibleType" :list="visibleSelect" placeholder="请选择"></BcSelect>
                    </el-form-item>
                </el-row>
            </div>
        </div>

        <el-row>
            <el-button size="mini" type="primary" @click="submit(BcPageFormRefComponent)">提交</el-button>
            <!-- <el-button size="mini">重置</el-button> -->
            <el-button size="mini" @click="goBack">返回</el-button>
        </el-row>
    </BcPageForm>
</template>

<script>
    import BcPageForm from "@common/finsuit-components/BcPageForm";
    import AddForm from "./compositionApi/AddForm";
    import SelectData from "./compositionApi/SelectData";
    import { ref } from "vue";
    export default {
        components: { BcPageForm },
        setup() {
            const BcPageFormRefComponent = ref(null);
            const { form, formRule, rewardRadio, pageType, pageTypes, submit, goBack, disabledDate } = AddForm();
            const { userSelect, appFlagSelect, rewardType, entranceSelect, statusSelect, deviceSelect, visibleSelect, getOrgSelect, getPrdSelect, getRewardInfoSelect, getActivityRuleListNoPage } =
                SelectData(form);

            return {
                BcPageFormRefComponent,
                form,
                formRule,
                rewardRadio,
                pageType,
                pageTypes,
                submit,
                goBack,
                disabledDate,
                userSelect,
                appFlagSelect,
                rewardType,
                entranceSelect,
                statusSelect,
                deviceSelect,
                visibleSelect,
                getOrgSelect,
                getPrdSelect,
                getRewardInfoSelect,
                getActivityRuleListNoPage
            };
        }
    };
</script>
<style lang="less" scoped>
    .container {
        padding: 0px 10px 0px;
        border: 1px solid #f2f2f2;
        margin: 10px 0;

        .title {
            line-height: 50px;
            font-size: 18px;
            color: #303133;
        }
    }
</style>
