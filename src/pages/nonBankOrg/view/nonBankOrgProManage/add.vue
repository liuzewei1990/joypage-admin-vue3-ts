<!---->
<template>
    <BcPageForm :title="otherData.pageTitle" :model="addFormData.formData" :rules="rules" ref="addForm">
        <!-- <ItemBox title="Form">
            <pre>{{addFormData.formData}}</pre>
       </ItemBox> -->

        <ItemBox title="新增非银产品信息">
            <el-row>
                <el-form-item label="产品名称" prop="prdName">
                    <el-input v-model="addFormData.formData.prdName" class="width-300" placeholder="请输入产品名称"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="产品类型" prop="typeId">
                    <BcSelect v-model="addFormData.formData.typeId" @change="prdTypeChange" :list="proTypeAddList" placeholder="请输入产品类型"></BcSelect>
                </el-form-item>
                <el-form-item label="产品类型别名" prop="categoryAlias" v-if="addFormData.formData.typeId == 9003" :required="otherData.isShowAlias ? true : false">
                    <el-input v-model="addFormData.formData.categoryAlias" placeholder="请输入产品类型别名"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="所属非银机构" prop="orgId">
                    <!-- autoGetApiData  true：自动触发GetApiData事件请求数据回显操作 false：手动请求 一般回显时设置为true -->
                    <!-- 此处用url传来的id做判断，因为addFormData.formData.orgId是异步回传数据，会有同步异步问题 -->
                    <BcSelect
                        itemValueKey="orgId"
                        itemNameKey="orgName"
                        v-model="addFormData.formData.orgId"
                        :autoGetApiData="id != ''"
                        @GetApiData="getOrgSelect"
                        filterable
                        placeholder="请选择所属非银机构">
                    </BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="收益率（%）" prop="rate">
                    <el-input v-model="addFormData.formData.rate" placeholder="请输入收益率"></el-input>
                </el-form-item>
                <el-form-item label="收益率别名">
                    <el-input v-model="addFormData.formData.rateAlias" placeholder="请输入收益率别名"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="收益率文案" prop="rateText">
                    <el-input v-model="addFormData.formData.rateText" placeholder="请输入收益率文案"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="期限" prop="period">
                    <el-input v-model="addFormData.formData.period" placeholder="请输入期限"></el-input>
                </el-form-item>
                <el-form-item class="unit" prop="rateUnit">
                    <BcSelect v-model="addFormData.formData.rateUnit" :list="timeLimitUnitList"></BcSelect>
                </el-form-item>
                <el-form-item label="期限别名" prop="periodAlias">
                    <el-input v-model="addFormData.formData.periodAlias" placeholder="请输入期限别名"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="期限文案" prop="periodText">
                    <el-input v-model="addFormData.formData.periodText" class="width-300" placeholder="请输入期限文案"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="起购金额（最小/元）" prop="minAmount">
                    <el-input v-model="addFormData.formData.minAmount" placeholder="起购金额（最小/元）"></el-input>
                </el-form-item>
                <el-form-item label="起购金额（最大/元）" prop="maxAmount">
                    <el-input v-model="addFormData.formData.maxAmount" placeholder="起购金额（最大/元）"></el-input>
                </el-form-item>
                <el-form-item label="递增金额（元）" prop="increAmount">
                    <el-input v-model="addFormData.formData.increAmount" placeholder="递增金额（元）"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="活动收益率（%）" prop="activityRate">
                    <el-input v-model="addFormData.formData.activityRate" placeholder="请输入活动收益率"></el-input>
                </el-form-item>
                <el-form-item label="活动收益率别名" prop="activityRateAlias">
                    <el-input v-model="addFormData.formData.activityRateAlias" placeholder="请输入活动收益率别名"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item class="width-600">
                    <el-input disabled placeholder="PS：此处活动收益率只作为页面展示文案，不参与实际利息计算，实际到账利息以金融机构为准"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="风险等级" prop="riskLevel">
                    <BcSelect v-model="addFormData.formData.riskLevel" :list="riskRatingList" placeholder="请选择风险等级"></BcSelect>
                </el-form-item>
            </el-row>
        </ItemBox>

        <ItemBox title="文本编辑">
            <el-row class="editor">
                <el-form-item label="产品描述" prop="describeRichTxt">
                    <BcEditor v-model="addFormData.formData.describeRichTxt"></BcEditor>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="支取规则别名" prop="dealRuleAlias">
                    <el-input v-model="addFormData.formData.dealRuleAlias" class="width-300"></el-input>
                </el-form-item>
            </el-row>

            <el-row class="editor">
                <el-form-item label="支取规则" prop="dealRuleRichTxt">
                    <BcEditor v-model="addFormData.formData.dealRuleRichTxt"></BcEditor>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="计息规则别名" prop="rateRule">
                    <el-input v-model="addFormData.formData.rateRule" class="width-300"></el-input>
                </el-form-item>
            </el-row>

            <el-row class="editor">
                <el-form-item label="计息规则" prop="rateRuleText">
                    <BcEditor v-model="addFormData.formData.rateRuleText"></BcEditor>
                </el-form-item>
            </el-row>
        </ItemBox>

        <ItemBox title="配置信息">
            <el-row>
                <el-form-item label="是否跳产品详情页" prop="isPrdinfoJump">
                    <BcSelect v-model="addFormData.formData.isPrdinfoJump" :list="judgeList"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="未跳转到详情的URL" prop="jumpLinkUrl">
                    <el-input v-model="addFormData.formData.jumpLinkUrl" class="width-600"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="安全购买跳转的URL" prop="buyButtonUrl">
                    <el-input v-model="addFormData.formData.buyButtonUrl" class="width-600"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="是否推荐" prop="isRecommend">
                    <BcSelect v-model="addFormData.formData.isRecommend" :list="judgeList"></BcSelect>
                </el-form-item>
                <el-form-item label="是否畅销" prop="isBestSell">
                    <BcSelect v-model="addFormData.formData.isBestSell" :list="judgeList"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="是否首页排行" prop="isHomepageRank">
                    <BcSelect v-model="addFormData.formData.isHomepageRank" :list="judgeList"></BcSelect>
                </el-form-item>
                <el-form-item label="是否实时数据同步产品" prop="isRealtimeDataPrd">
                    <BcSelect v-model="addFormData.formData.isRealtimeDataPrd" :list="judgeList"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="新手专享推荐理由" prop="noviceRecommendReason">
                    <el-input v-model="addFormData.formData.noviceRecommendReason" class="width-600"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="拼团推荐理由" prop="collageRecommendReason">
                    <el-input v-model="addFormData.formData.collageRecommendReason" class="width-600"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="产品推荐理由" prop="prdRecommendReason">
                    <el-input v-model="addFormData.formData.prdRecommendReason" class="width-600"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="同一产品标识" prop="identicalPrdDiffStageTag">
                    <el-input v-model="addFormData.formData.identicalPrdDiffStageTag"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="openAPI同步产品" prop="isSyncFlag">
                    <BcSelect v-model="addFormData.formData.isSyncFlag" :list="judgeList"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="版本标识" prop="ctVer">
                    <el-input v-model="addFormData.formData.ctVer"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="自定义斜标签（自定义角标）" prop="customLabel">
                    <el-input v-model="addFormData.formData.customLabel" placeholder="三个字符内"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="产品自定义标签" prop="defineLabelSuffix">
                    <el-input v-model="addFormData.formData.defineLabelSuffix" placeholder="多个标签英文逗号分割"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="活动标签" prop="defineLabel">
                    <el-input v-model="addFormData.formData.defineLabel" placeholder="首页榜单一个活动标签"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="是否实名认证" prop="isRzFlag">
                    <BcSelect v-model="addFormData.formData.isRzFlag" :list="judgeList"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="是否同步上架" prop="upSyncFlag">
                    <BcSelect v-model="addFormData.formData.upSyncFlag" :list="judgeList"></BcSelect>
                </el-form-item>
                <el-form-item label="是否同步下架" prop="downSyncFlag">
                    <BcSelect v-model="addFormData.formData.downSyncFlag" :list="judgeList"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="监管属性" prop="isSupervision">
                    <BcSelect v-model="addFormData.formData.isSupervision" :list="regAttrList" placeholder="请选择监管属性"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="产品区域" prop="nationalType">
                    <BcSelect v-model="addFormData.formData.nationalType" :list="areaList"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="币种" prop="currency">
                    <BcSelect v-model="addFormData.formData.currency" :list="currencyList"></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="银行产品ID" prop="bankNo">
                    <el-input v-model="addFormData.formData.bankNo" placeholder="请填写银行产品ID"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="机构对接方式" prop="bankDockType">
                    <BcSelect v-model="addFormData.formData.bankDockType" :list="dockingList"></BcSelect>
                </el-form-item>
            </el-row>
        </ItemBox>

        <el-row>
            <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
            <el-button size="mini" @click="goBack">返回</el-button>
        </el-row>
    </BcPageForm>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import BcSelect from "@common/finsuit-components/BcSelect";
    import BcEditor from "@common/finsuit-components/BcEditor";
    import { BcPageForm, ItemBox } from "@common/finsuit-components/BcPageForm";
    import AddForm from "./compositionApi/AddForm";
    import SelectData from "./compositionApi/SelectData";

    const addForm = ref(null);

    const route = useRoute();
    let id = route.query.id;
    // console.log('修改',id)

    //下拉框数据
    const { judgeList, proTypeAddList, riskRatingList, timeLimitUnitList, regAttrList, areaList, currencyList, dockingList, getOrgSelect } = SelectData();
    const { addFormData, otherData, prdTypeChange, rules, submitForm, checkDataApi, goBack } = AddForm(addForm);

    if (id) {
        checkDataApi();
    }
</script>
<style lang="less">
    .el-form-item--mini .el-form-item__label {
        width: 170px;
    }
    .el-form-item--mini .el-form-item__content {
        width: 200px;
    }
    .unit {
        width: 88px;
    }
    .width-300 {
        width: 300px;
    }
    .width-600 {
        width: 600px;
    }
    .editor .el-form-item--mini .el-form-item__content {
        width: auto;
    }
</style>
