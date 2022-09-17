import { getCurrentInstance, reactive, ref, toRaw, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default function (BcPageFormRefComponent) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();
    const route = useRoute();
    const pageTypes = {
        1: "新增理财子",
        2: "修改产品"
    };

    const pageType = route.query.pageType || "1";

    /* ******数据流通过route进来****** */
    let routeForm = route.query.row || "{}";
    routeForm = JSON.parse(decodeURIComponent(routeForm));

    // 初始表单
    const form = reactive({
        id: routeForm.prdIndexId || "",

        // 产品名称------------------------------------------------------
        prdName: routeForm.prdName || "",
        // 产品类型
        typeId: _this.$utils.isEmpty(routeForm.typeId) ? "1" : String(routeForm.typeId),
        // 产品类型别名
        categoryAlias: routeForm.categoryAlias || "",
        // 风险等级
        riskLevel: _this.$utils.isEmpty(routeForm.riskLevel) ? "2" : String(routeForm.riskLevel),

        // 所属机构-------------------------------------------------------
        orgId: _this.$utils.isEmpty(routeForm.orgId) ? "" : Number(routeForm.orgId),
        // 所属机构别名
        orgAlias: routeForm.orgAlias || "",

        // 期限时长--------------------------------------------------------
        lengthTime: routeForm.lengthTime || "",
        // 期限单位
        rateUnit: _this.$utils.isEmpty(routeForm.rateUnit) ? "1" : String(routeForm.rateUnit),
        // 期限别名
        periodAlias: routeForm.periodAlias || "",
        // 期限文案
        periodText: routeForm.periodText || "",

        // 起购金额（最小）--------------------------------------------------
        minAmount: routeForm.minAmount || "",
        // 起购金额（最大）
        maxAmount: routeForm.maxAmount || "",
        // 递增金额
        increAmount: routeForm.increAmount || "",

        // 收益率-----------------------------------------------------------
        rate: routeForm.rate || "",
        // 收益率别名
        rateAlias: routeForm.rateAlias || "",
        // 收益率文案
        rateText: routeForm.rateText || "",
        // 收益率文案备注详情
        rateTextRemarks: routeForm.rateTextRemarks || "",

        // 详细规则---------------------------------------------------------
        describeRichTxt: routeForm.describeRichTxt || "",
        // 支取规则
        dealRuleRichTxt: routeForm.dealRuleRichTxt || "",
        // 支取规则-别名
        dealRuleAlias: routeForm.dealRuleAlias || "",
        // 计息规则
        rateRuleRichTxt: routeForm.rateRuleRichTxt || "",
        // 计息规则-别名
        rateRuleAlias: routeForm.rateRuleAlias || "",

        // 是否实名认证-----------------------------------------------------
        isRzFlag: _this.$utils.isEmpty(routeForm.isRzFlag) ? "1" : String(routeForm.isRzFlag),
        // 是否同步上架
        upSyncFlag: _this.$utils.isEmpty(routeForm.upSyncFlag) ? "1" : String(routeForm.upSyncFlag),
        // 是否同步下架
        downSyncFlag: _this.$utils.isEmpty(routeForm.downSyncFlag) ? "1" : String(routeForm.downSyncFlag),
        // 是否推荐
        isRecommend: _this.$utils.isEmpty(routeForm.isRecommend) ? "1" : String(routeForm.isRecommend),
        // 是否畅销
        isBestSell: _this.$utils.isEmpty(routeForm.isBestSell) ? "1" : String(routeForm.isBestSell),
        // 是否首页排行榜
        isHomepageRank: _this.$utils.isEmpty(routeForm.isHomepageRank) ? "1" : String(routeForm.isHomepageRank),
        // 是否同步数据产品
        isRealtimeDataPrd: _this.$utils.isEmpty(routeForm.isRealtimeDataPrd) ? "1" : String(routeForm.isRealtimeDataPrd),
        // 是否由openAPI同步产品, 0：否, 1：是
        isSyncFlag: _this.$utils.isEmpty(routeForm.isSyncFlag) ? "1" : String(routeForm.isSyncFlag),
        // 同一产品标识
        identicalPrdTag: routeForm.identicalPrdTag || "",
        // 版本标识
        ctVer: routeForm.ctVer || "",
        // 是否跳转到产品详情页 1是0否
        isPrdinfoJump: _this.$utils.isEmpty(routeForm.isPrdinfoJump) ? "1" : String(routeForm.isPrdinfoJump),
        // 跳转的URL,小程序为过渡页H5
        jumpLinkUrl: routeForm.jumpLinkUrl || "",
        // 安全购买的跳转URL
        buyButtonUrl: routeForm.buyButtonUrl || "http://",
        // 监管属性
        isSupervision: _this.$utils.isEmpty(routeForm.isSupervision) ? "0" : String(routeForm.isSupervision),
        // 产品区域
        nationalType: _this.$utils.isEmpty(routeForm.nationalType) ? "1" : String(routeForm.nationalType),
        // 币种
        currency: _this.$utils.isEmpty(routeForm.currency) ? "1" : String(routeForm.currency),
        // 机构对接方式
        bankDockType: _this.$utils.isEmpty(routeForm.bankDockType) ? "0" : String(routeForm.bankDockType),
        // 新手专享推荐理由
        noviceRecommendReason: routeForm.noviceRecommendReason || "",
        // 拼团推荐理由
        collageRecommendReason: routeForm.collageRecommendReason || "",
        // 产品推荐理由
        prdRecommendReason: routeForm.prdRecommendReason || "",
        // 自定义斜标签
        customLabel: routeForm.customLabel || "",

        aaaaa: routeForm.aaaaa || "",

        // 曲线图类型1七日年化2固定收益 int
        rateCurveGraphType: routeForm.rateCurveGraphType || "1",

        // 曲线图数据  七日年化
        sevenDayList: [],
        // 曲线图数据 固定收益
        fixedList: []
    });

    // 校验规则
    const formRule = {
        prdName: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        lengthTime: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        minAmount: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        maxAmount: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        rate: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        rateText: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        jumpLinkUrl: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        buyButtonUrl: [{ required: true, message: "该内容不能为空", trigger: "blur" }],

        typeId: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        riskLevel: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        orgId: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        isSupervision: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        nationalType: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        currency: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        bankDockType: [{ required: true, message: "该内容不能为空", trigger: "change" }],

        _amount: [{ type: "array", required: true, message: "该内容不能为空", trigger: "change" }]
    };

    // 提交按钮
    const submit = async () => {
        // 由于是个ref 需要通过value读取
        BcPageFormRefComponent.value["elForm"].validate((success) => {
            if (success) {
                console.log("form:", form);
                postApi();
            } else {
                return false;
            }
        });
    };

    // 返回按钮
    const goBack = () => {
        router.back();
    };

    // 提交到后台
    const postApi = async () => {
        const params = {
            ...toRaw(form)
        };
        let data = await _this.$apis.save(params);
        if (data.success === true) {
            _this.$msg.success("操作成功");
            router.back();
        } else {
            _this.$msg.error("添加失败");
        }
    };

    return { form, formRule, pageTypes, pageType, submit, goBack };
}
