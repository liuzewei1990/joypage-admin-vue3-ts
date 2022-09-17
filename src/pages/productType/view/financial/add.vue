<!--  -->
<template>
    <BcPageForm :title="pageTypes[pageType]" :model="form" :rules="formRule" ref="BcPageFormRefComponent">
        <!-- <ItemBox title="Form">
      <pre>{{form}}</pre>
    </ItemBox> -->

        <ItemBox title="◆产品配置">
            <!-- 产品名称和类型 -->
            <el-row>
                <el-form-item label="产品名称" prop="prdName">
                    <el-input v-model="form.prdName" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item label="产品类型" prop="typeId">
                    <BcSelect modelType="id" v-model="form.typeId" placeholder="选择设备" :list="prdTypeList" filterable></BcSelect>
                </el-form-item>
                <el-form-item label="产品类型别名" prop="">
                    <el-input v-model="form.categoryAlias" placeholder="请输入产品类型别名"></el-input>
                </el-form-item>
                <el-form-item label="风险等级" prop="riskLevel">
                    <BcSelect modelType="id" v-model="form.riskLevel" placeholder="请选择" :list="riskLevelList" filterable style="width: 100px"></BcSelect>
                </el-form-item>
            </el-row>
        </ItemBox>

        <!-- 机构信息配置 -->
        <ItemBox title="◆机构配置">
            <el-row>
                <el-form-item label="所属机构" prop="orgId">
                    <BcSelect modelType="id" v-model="form.orgId" :autoGetApiData="form.orgId != ''" placeholder="请选择所属机构" @GetApiData="getOrgSelect" filterable></BcSelect>
                </el-form-item>
                <el-form-item label="所属机构别名" prop="">
                    <el-input v-model="form.orgAlias" placeholder="请输入机构别名"></el-input>
                </el-form-item>
            </el-row>
        </ItemBox>

        <!-- 期限信息 -->
        <ItemBox title="◆期限配置">
            <el-row>
                <el-form-item label="期限" prop="lengthTime">
                    <el-input v-model="form.lengthTime" type="number" placeholder="请输入期限" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item label="" prop="rateUnit">
                    <BcSelect modelType="id" v-model="form.rateUnit" placeholder="请选择" :list="rateUnitList" style="width: 60px"></BcSelect>
                </el-form-item>
                <el-form-item label="期限别名" prop="">
                    <el-input v-model="form.periodAlias" placeholder="请输入期限别名"></el-input>
                </el-form-item>
                <el-form-item label="期限文案" prop="">
                    <el-input v-model="form.periodText" placeholder="请输入期限文案"></el-input>
                </el-form-item>
            </el-row>
        </ItemBox>

        <!-- 起购金额 -->
        <ItemBox title="◆金额配置">
            <el-row>
                <el-form-item label="起购金额（最小）" prop="minAmount">
                    <el-input v-model="form.minAmount" type="number" placeholder="请输入金额" style="width: 120px"
                        ><template #suffix><span>元</span></template></el-input
                    >
                </el-form-item>
                <el-form-item label="起购金额（最大）" prop="maxAmount">
                    <el-input v-model="form.maxAmount" type="number" placeholder="请输入金额" style="width: 120px"
                        ><template #suffix><span>元</span></template></el-input
                    >
                </el-form-item>
                <el-form-item label="递增金额" prop="">
                    <el-input v-model="form.increAmount" type="number" placeholder="请输入金额" style="width: 120px"
                        ><template #suffix><span>元</span></template></el-input
                    >
                </el-form-item>
            </el-row>
        </ItemBox>

        <!-- 收益率信息配置 -->
        <ItemBox title="◆收益率配置">
            <el-row>
                <el-form-item label="收益率 (%)" prop="rate">
                    <el-input v-model="form.rate" placeholder="请输入" type="number" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item label="收益率别名" prop="">
                    <el-input v-model="form.rateAlias" placeholder="请输入收益率别名"></el-input>
                </el-form-item>
                <el-form-item label="收益率文案" prop="rateText">
                    <el-input v-model="form.rateText" placeholder="请输入收益率文案"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="收益率文案备注详情" prop="">
                    <el-input v-model="form.rateTextRemarks" placeholder="请输入收益率文案" type="textarea" style="width: 650px"></el-input>
                </el-form-item>
            </el-row>
        </ItemBox>

        <!-- 详细规则 -->
        <ItemBox title="◆详细规则">
            <BcEditor style="height: 400px" v-model="form.describeRichTxt"></BcEditor>
        </ItemBox>

        <!-- 支取规则 -->
        <ItemBox title="◆支取规则">
            <BcEditor style="height: 400px" v-model="form.dealRuleRichTxt"></BcEditor>
        </ItemBox>

        <!-- 计息规则 -->
        <ItemBox title="◆计息规则">
            <BcEditor style="height: 400px" v-model="form.rateRuleRichTxt"></BcEditor>
        </ItemBox>

        <!-- 发布配置 -->
        <ItemBox title="◆发布配置">
            <el-row>
                <el-form-item label="是否实名认证" prop="assembleType" style="margin-right: 50px">
                    <el-radio-group class="my-radio" v-model="form.isRzFlag">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否同步上架" prop="assembleType" style="margin-right: 50px">
                    <el-radio-group class="my-radio" v-model="form.upSyncFlag">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否同步下架" prop="assembleType" style="margin-right: 50px">
                    <el-radio-group class="my-radio" v-model="form.downSyncFlag">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否推荐" prop="assembleType" style="margin-right: 50px">
                    <el-radio-group class="my-radio" v-model="form.isRecommend">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否畅销" prop="assembleType" style="margin-right: 50px">
                    <el-radio-group class="my-radio" v-model="form.isBestSell">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否首页排行" prop="assembleType" style="margin-right: 50px">
                    <el-radio-group class="my-radio" v-model="form.isHomepageRank">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否实时数据同步产品" prop="assembleType" style="margin-right: 50px">
                    <el-radio-group class="my-radio" v-model="form.isRealtimeDataPrd">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="openAPI同步产品" prop="assembleType" style="margin-right: 50px">
                    <el-radio-group class="my-radio" v-model="form.isSyncFlag">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="同一产品标识" prop="">
                    <el-input v-model="form.identicalPrdTag" placeholder="请输入同一产品标识" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="版本标识" prop="">
                    <el-input v-model="form.ctVer" placeholder="请输入版本标识" style="width: 200px"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="是否跳产品详情页" prop="">
                    <el-radio-group class="my-radio" v-model="form.isPrdinfoJump">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                    <!-- <BcSelect modelType="id" placeholder="请选择所属机构" :list="deviceSelect" filterable style="width:80px;"></BcSelect> -->
                </el-form-item>
                <el-form-item label="未跳转到详情的URL" prop="jumpLinkUrl" v-if="form.isPrdinfoJump == '0'">
                    <el-input v-model="form.jumpLinkUrl" placeholder="请输入链接" style="width: 500px"></el-input>
                </el-form-item>
                <el-form-item label="安全购买跳转的URL" prop="buyButtonUrl" v-else>
                    <el-input v-model="form.buyButtonUrl" placeholder="请输入链接" style="width: 500px"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="监管属性" prop="isSupervision">
                    <BcSelect modelType="id" v-model="form.isSupervision" placeholder="请选择所属机构" :list="isSupervisionList" filterable style="width: 180px"></BcSelect>
                </el-form-item>
                <el-form-item label="产品区域" prop="nationalType">
                    <BcSelect modelType="id" v-model="form.nationalType" placeholder="请选择所属机构" :list="nationalTypeList" filterable style="width: 120px"></BcSelect>
                </el-form-item>
                <el-form-item label="币种" prop="currency">
                    <BcSelect
                        modelType="id"
                        v-model="form.currency"
                        :key="form.nationalType"
                        :autoGetApiData="form.currency != ''"
                        placeholder="请选择币种"
                        itemNameKey="currencyName"
                        itemValueKey="currencyCode"
                        @GetApiData="getCurrencyAndOrg($event, form.nationalType)"
                        filterable
                        style="width: 120px"></BcSelect>
                </el-form-item>
                <el-form-item label="机构对接方式" prop="bankDockType">
                    <BcSelect modelType="id" v-model="form.bankDockType" placeholder="请选择所属机构" :list="bankDockTypeList" filterable style="width: 150px"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="新手专享推荐理由" prop="">
                    <el-input v-model="form.noviceRecommendReason" placeholder="请输入推荐理由" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="拼团推荐理由" prop="">
                    <el-input v-model="form.collageRecommendReason" placeholder="请输入推荐理由" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="产品推荐理由" prop="">
                    <el-input v-model="form.prdRecommendReason" placeholder="请输入推荐理由" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="自定义斜标签（自定义角标）" prop="">
                    <el-input v-model="form.customLabel" placeholder="请输入推荐理由" style="width: 200px"></el-input>
                </el-form-item>
            </el-row>
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
    import BcEditor from "@common/finsuit-components/BcEditor";
    import ChannelSelect from "@common/finsuit-modules/Form/ChannelSelect";
    import BcNumRange from "@common/finsuit-components/BcNumRange";

    import AddForm from "./compositionApi/AddForm";
    import { default as SelectData, rateCurveGraphTypeList, riskLevelList, rateUnitList, isSupervisionList, nationalTypeList, bankDockTypeList, prdTypeList } from "./compositionApi/SelectData";
    import { onMounted, ref } from "vue";

    // form ref
    const BcPageFormRefComponent = ref(null);

    const { form, formRule, pageTypes, pageType, submit, goBack } = AddForm(BcPageFormRefComponent);
    const { getOrgSelect, getCurrencyAndOrg } = SelectData();
</script>
<style lang="less" scoped>
    /deep/ .my-radio .el-radio {
        margin-right: 10px;
    }
    /deep/ .my-radio .el-radio__label {
        padding-left: 5px;
    }
</style>
