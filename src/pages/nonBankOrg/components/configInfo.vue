<!--配置信息组件-->
<template>
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
</template>
<script>
    import { toRefs, reactive } from "vue";
    export default {
        components: {},
        props: {
            addFormData: {
                type: Object,
                default: {}
            },
            SelectData: {
                type: Function
            }
        },
        setup(props, context) {
            console.log("父传子", props);

            const formData = reactive({
                addFormData: props.addFormData, //表单数据
                judgeList: props.SelectData().judgeList, //下拉框数据
                regAttrList: props.SelectData().regAttrList, //下拉框数据
                areaList: props.SelectData().areaList, //下拉框数据
                currencyList: props.SelectData().currencyList, //下拉框数据
                dockingList: props.SelectData().dockingList //下拉框数据
            });

            return {
                ...toRefs(formData)
            };
        }
    };
</script>
