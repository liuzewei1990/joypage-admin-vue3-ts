/*新增修改*/
import { getCurrentInstance, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { nonOrgSave } from "../../../apis/index";

export default function (addForm) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();
    const route = useRoute();
    let id = route.query.id;
    // console.log('修改',id)
    //form表单字段
    const addFormData = reactive({
        formData: {
            id: "", //产品id
            prdName: "", //*产品名称
            prdTypeId: "", //产品类型大类 不用传
            typeId: "", //*非银的产品类型小类 1投资连结保险 2基金 3 其他
            categoryAlias: "", //*产品类型别名
            orgId: "", //*所属非银机构

            rate: "", //*收益率
            rateAlias: "", //收益率别名
            rateText: "", //*收益率文案
            period: "", //*期限
            periodAlias: "", //期限别名
            periodText: "", //*期限文案
            rateUnit: "", //期限单位 ???
            minAmount: "", //*起购金额（最小/元）
            maxAmount: "", //*起购金额（最大/元）
            increAmount: "", //递增金额（元）
            activityRate: "", //活动收益率
            activityRateAlias: "", //活动收益率文案

            riskLevel: "", //*风险等级
            describeRichTxt: "", //*产品描述富文本
            dealRuleRichTxt: "", //*支取规则富文本
            dealRuleAlias: "", //支取规则别名
            rateRuleText: "", //*计息规则富文本
            rateRule: "", //计息规则别名

            isPrdinfoJump: "", //*是否跳产品详情页
            jumpLinkUrl: "", //未跳转到详情的URL
            buyButtonUrl: "", //安全购买跳转的URL
            isRecommend: "", //*是否推荐
            isBestSell: "", //*是否为畅销品
            isHomepageRank: "", //*是否首页排行

            isRealtimeDataPrd: "", //*是否实时数据同步产品
            noviceRecommendReason: "", //新手专享推荐理由
            collageRecommendReason: "", //拼团推荐理由
            prdRecommendReason: "", //产品推荐理由
            identicalPrdDiffStageTag: "", //同一产品标识
            isSyncFlag: "", //*openAPI同步产品
            ctVer: "", //版本标识

            customLabel: "", //自定义斜标签
            defineLabelSuffix: "", //产品自定义标签
            defineLabel: "", //活动标签
            isRzFlag: "", //*是否实名认证
            upSyncFlag: "", //*是否同步上架
            downSyncFlag: "", //*是否同步下架
            isSupervision: "", //*监管属性
            nationalType: "", //*产品区域
            currency: "CNY", //*币种
            bankNo: "", //银行产品ID 新增
            bankDockType: "" //*机构对接方式
        }
    });

    //页面其他字段
    const otherData = reactive({
        pageTitle: id ? "修改" : "新增",
        isShowAlias: false
    });

    //产品类型，选择其他时， 产品类型别名必填
    const prdTypeChange = (param) => {
        param == 2 ? (otherData.isShowAlias = true) : (otherData.isShowAlias = false);
    };

    const validateNumber = (rule, value, callback) => {
        if (value == "") {
            callback(new Error("请输入"));
        } else if (isNaN(value)) {
            callback(new Error("请输入正确的数值"));
        } else if (value < 0) {
            callback(new Error("输入值应大于0"));
        } else {
            callback();
        }
    };

    //表单验证规则
    const rules = {
        prdName: [
            { required: true, message: "请填写产品名称", trigger: "change" },
            { min: 2, max: 20, message: "长度在 2 到 20个字符" }
        ],
        typeId: [{ required: true, message: "请选择产品类型", trigger: "change" }],
        categoryAlias: [
            { required: true, message: "请填写产品类型别名", trigger: "change" },
            { min: 2, max: 20, message: "长度在 2 到 20个字符" }
        ],
        orgId: [{ required: true, message: "请选择非银机构", trigger: "change" }],
        rate: [
            { required: true, validator: validateNumber, trigger: "change" }
            // { type: 'number', message: '收益率为数字值'}
        ],
        rateText: [
            { required: true, message: "请输入收益率文案", trigger: "change" },
            { min: 2, max: 20, message: "长度在 2 到 20个字符" }
        ],
        period: [
            { required: true, validator: validateNumber, trigger: "change" }
            // { type: 'number', message: '期限为数字值'}
        ], //*期限
        periodText: [
            { required: true, message: "请输入期限文案", trigger: "change" },
            { min: 2, max: 20, message: "长度在 2 到 20个字符" }
        ], //*期限文案
        rateUnit: [{ required: true, message: "请选择期限单位", trigger: "change" }], //期限单位 ???
        minAmount: [
            { required: true, validator: validateNumber, trigger: "change" }
            // { type: 'number', message: '起购金额为数字值'}
        ],
        maxAmount: [
            { required: true, validator: validateNumber, trigger: "change" }
            // { type: 'number', message: '起购金额为数字值'}
        ],
        riskLevel: [{ required: true, message: "请选择风险等级", trigger: "change" }], //*风险等级
        describeRichTxt: [{ required: true, message: "请输入产品描述", trigger: "change" }], //*产品描述富文本
        dealRuleRichTxt: [{ required: true, message: "请输入支取规则", trigger: "change" }], //*支取规则富文本
        rateRuleText: [{ required: true, message: "请输入计息规则", trigger: "change" }], //*计息规则富文本

        isPrdinfoJump: [{ required: true, message: "请选择是否跳产品详情页", trigger: "change" }], //*是否跳产品详情页
        isRecommend: [{ required: true, message: "请选择是否推荐", trigger: "change" }], //*是否推荐
        isBestSell: [{ required: true, message: "请选择是否为畅销品", trigger: "change" }], //*是否为畅销品
        isHomepageRank: [{ required: true, message: "请选择是否首页排行", trigger: "change" }], //*是否首页排行

        isRealtimeDataPrd: [{ required: true, message: "请选择是否实时数据同步产品", trigger: "change" }], //*是否实时数据同步产品
        isSyncFlag: [{ required: true, message: "请选择openAPI同步产品", trigger: "change" }], //*openAPI同步产品
        isRzFlag: [{ required: true, message: "请选择是否实名认证", trigger: "change" }], //*是否实名认证
        upSyncFlag: [{ required: true, message: "请选择是否同步上架", trigger: "change" }], //*是否同步上架
        downSyncFlag: [{ required: true, message: "请选择是否同步下架", trigger: "change" }], //*是否同步下架
        isSupervision: [{ required: true, message: "请选择监管属性", trigger: "change" }], //*监管属性
        nationalType: [{ required: true, message: "请选择产品区域", trigger: "change" }], //*产品区域
        currency: [{ required: true, message: "请选择币种", trigger: "change" }], //*币种
        bankDockType: [{ required: true, message: "请选择机构对接方式", trigger: "change" }] //*机构对接方式
    };

    //提交
    const submitForm = () => {
        addForm.value.$refs["elForm"].validate((valid) => {
            if (valid) {
                console.log("submit success");
                console.log("提交数据", addFormData.formData);
                nonOrgSave(addFormData.formData).then((res) => {
                    console.log(res);
                    if (res.headerModel.code == 0) {
                        _this.$msg.success("添加成功");
                        goBack();
                    }
                });
            } else {
                return false;
            }
        });
    };

    //修改数据渲染
    const checkDataApi = () => {
        _this.$apis.checkNonPrdApi({ id: id }).then((res) => {
            console.log("修改展示数据", res);
            addFormData.formData = res.success;
            // addFormData.formData.id = res.success.id,//产品id
            // addFormData.formData.prdName = res.success.prdName,//*产品名称
            // addFormData.formData.prdTypeId = res.success.prdTypeId,//产品类型大类 不用传
            // addFormData.formData.typeId = res.success.typeId,//*非银的产品类型小类 1投资连结保险 2基金 3 其他
            // addFormData.formData.categoryAlias = res.success.categoryAlias,//*产品类型别名
            // addFormData.formData.orgId = res.success.orgId //*所属非银机构

            // addFormData.formData.rate = res.success.rate,//*收益率
            // addFormData.formData.rateAlias = res.success.rateAlias,//收益率别名
            // addFormData.formData.rateText = res.success.rateText,//*收益率文案
            // addFormData.formData.period = res.success.period,//*期限
            // addFormData.formData.periodAlias = res.success.periodAlias,//期限别名
            // addFormData.formData.periodText = res.success.periodText,//*期限文案
            // addFormData.formData.rateUnit = res.success.rateUnit,//期限单位 ???
            // addFormData.formData.minAmount = res.success.minAmount,//*起购金额（最小/元）
            // addFormData.formData.maxAmount = res.success.maxAmount,//*起购金额（最大/元）
            // addFormData.formData.increAmount = res.success.increAmount,//递增金额（元）
            // addFormData.formData.activityRate = res.success.activityRate,//活动收益率
            // addFormData.formData.activityRateAlias = res.success.activityRateAlias,//活动收益率文案

            // addFormData.formData.riskLevel = res.success.riskLevel,//*风险等级
            // addFormData.formData.describeRichTxt = res.success.describeRichTxt,//*产品描述富文本
            // addFormData.formData.dealRuleRichTxt = res.success.dealRuleRichTxt,//*支取规则富文本
            // addFormData.formData.dealRuleAlias = res.success.dealRuleAlias,//支取规则别名
            // addFormData.formData.rateRuleText = res.success.rateRuleText,//*计息规则富文本
            // addFormData.formData.rateRule = res.success.rateRule,//计息规则别名

            // addFormData.formData.isPrdinfoJump = res.success.isPrdinfoJump,//*是否跳产品详情页
            // addFormData.formData.jumpLinkUrl = res.success.jumpLinkUrl,//未跳转到详情的URL
            // addFormData.formData.buyButtonUrl = res.success.buyButtonUrl,//安全购买跳转的URL
            (addFormData.formData.isRecommend = parseFloat(res.success.isRecommend)), //*是否推荐
                // addFormData.formData.isBestSell = res.success.isBestSell,//*是否为畅销品
                // addFormData.formData.isHomepageRank = res.success.isHomepageRank,//*是否首页排行

                // addFormData.formData.isRealtimeDataPrd = res.success.isRealtimeDataPrd,//*是否实时数据同步产品
                // addFormData.formData.noviceRecommendReason = res.success.noviceRecommendReason,//新手专享推荐理由
                // addFormData.formData.collageRecommendReason = res.success.collageRecommendReason,//拼团推荐理由
                // addFormData.formData.prdRecommendReason = res.success.prdRecommendReason,//产品推荐理由
                // addFormData.formData.identicalPrdDiffStageTag = res.success.identicalPrdDiffStageTag,//同一产品标识
                // addFormData.formData.isSyncFlag = res.success.isSyncFlag,//*openAPI同步产品
                // addFormData.formData.ctVer = res.success.ctVer,//版本标识

                // addFormData.formData.customLabel = res.success.customLabel,//自定义斜标签
                // addFormData.formData.defineLabelSuffix = res.success.defineLabelSuffix,//产品自定义标签
                // addFormData.formData.defineLabel = res.success.defineLabel,//活动标签
                // addFormData.formData.isRzFlag = res.success.isRzFlag,//*是否实名认证
                (addFormData.formData.upSyncFlag = parseFloat(res.success.upSyncFlag)), //*是否同步上架
                (addFormData.formData.downSyncFlag = parseFloat(res.success.downSyncFlag)), //*是否同步下架
                // addFormData.formData.isSupervision = res.success.isSupervision,//*监管属性
                // addFormData.formData.nationalType = res.success.nationalType,//*产品区域
                // addFormData.formData.currency = res.success.currency,//*币种
                // addFormData.formData.bankNo = res.success.bankNo,//银行产品ID

                // addFormData.formData.bankDockType = res.success.bankDockType//*机构对接方式

                console.log("整合修改展示数据", res);
        });
    };

    //返回
    const goBack = () => {
        router.back();
    };

    return {
        addFormData,
        otherData,
        prdTypeChange,
        rules,
        submitForm,
        checkDataApi,
        goBack
    };
}
