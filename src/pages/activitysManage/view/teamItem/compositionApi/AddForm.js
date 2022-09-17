import { getCurrentInstance, reactive, toRaw, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();
    const route = useRoute();

    const pageTypes = {
        1: "创建拼团",
        2: "修改",
        3: "复制"
    };

    const pageType = route.query.pageType || "1";

    /* ******数据流通过route进来****** */
    let routeForm = route.query.row || "{}";
    routeForm = JSON.parse(decodeURIComponent(routeForm));

    /* *******初始后台表单**************** */
    const form = reactive({
        id: routeForm.id || "",

        /* **********************产品信息*************************** */
        // 机构id
        orgId: routeForm.orgId || "",
        // 产品id
        prdIndexId: Number(routeForm.prdIndexId) || "",

        /* **********************拼团信息*************************** */
        // 拼团金额
        teamTotalAmount: routeForm.teamTotalAmount || "",
        // 金额是否显示
        isAmountShow: routeForm.isAmountShow === undefined ? 1 : Number(routeForm.isAmountShow),
        // 排序
        sort: routeForm.sort || 1,
        // 拼团控制
        comtrol: routeForm.comtrol || "",
        // 活动入口 多选 需转换数据[]
        entrance: routeForm.entrance ? routeForm.entrance.split(/,|，/) : [],
        // entrance: undefined,
        // 团状态
        status: routeForm.status || "1",
        // 拼团开始日期
        assembleStartTime: routeForm.assembleStartTime,
        // 拼团结束日期
        assembleEndTime: routeForm.assembleEndTime,
        // 拼团时间段
        timeQuantum: routeForm.timeQuantum ? routeForm.timeQuantum.split(/,|，/) : ["1", "2", "3", "4"],

        /* ***********************拼团奖励************************** */
        // 奖励类型
        rewardType: routeForm.rewardType || "",
        // 奖励id
        rewardId: routeForm.rewardId || "",
        // 奖励标签
        rewardLabel: routeForm.rewardLabel || "",
        // 奖励描述
        rewardDesc: routeForm.rewardDesc || "",

        /* ***********************产品头部特殊显示规则************************** */
        // 是否显示特殊显示规则 0-否 1-启用
        isSpecialRuleShow: Number(routeForm.isSpecialRuleShow) || 0,
        // 特殊规则json串
        // specialRule: JSON.parse((routeForm.specialRule || "{}")),
        specialRule: _this.$utils.jsonParse(routeForm.specialRule),

        /* ***********************拼团规则模块配置************************** */
        // 产品详情页标签
        prdDetailsLabel: routeForm.prdDetailsLabel || "",
        // 拼团规则
        // ruleUrl: [{ url: "/ACT/2f329ac6-8947-44dd-b346-c9822770182f.png" }],
        ruleUrl: routeForm.ruleUrl ? [{ url: routeForm.ruleUrl }] : [],
        // 详细规则 富文本
        detailRule: routeForm.detailRule || "",

        /* ***********************存入结果页温馨提示************************** */
        // 存入结果页温馨提示
        warmPrompt: routeForm.warmPrompt || "",

        /* *************************发布渠道************************ */
        // 渠道 多选 需转换[]
        appFlag: routeForm.appFlag ? routeForm.appFlag.split(/,|，/) : ["BC", "PC", "PMP", "YIYE"],
        // 设备
        deviceType: routeForm.deviceType || "TY",
        // 可见用户
        visibleType: routeForm.visibleType || "3",

        // 初始值必须为空[] 否则不会校验
        _date: routeForm.assembleStartTime ? [routeForm.assembleStartTime, routeForm.assembleEndTime] : [],

        _rewardTypeChange() {
            form.rewardId = "";
        }
    });

    console.log("form：", form);

    // 日期控件 禁用时间段
    const disabledDate = (time = "") => {
        // 大于当前时间的日期
        return new Date(time).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
    };

    // 校验规则
    const formRule = {
        prdIndexId: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        teamTotalAmount: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        sort: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        comtrol: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        _date: [{ type: "array", required: true, message: "该内容不能为空", trigger: "change" }],
        status: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        rewardType: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        rewardId: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        rewardLabel: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        rewardDesc: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        appFlag: [{ required: true, message: "该内容不能为空", trigger: "change" }],
        prdDetailsLabel: [{ required: true, message: "该内容不能为空", trigger: "blur" }],
        ruleUrl: [{ type: "array", required: true, message: "请上传图片", trigger: "change" }],
        detailRule: [{ required: true, message: "该内容不能为空", trigger: "blur" }]
    };

    // 提交按钮
    const submit = async (BcPageFormRefComponent) => {
        BcPageFormRefComponent.elForm.validate((success) => {
            if (success) {
                postApi();
            } else {
                _this.$msg.error("请检查表单必填项");
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
            // ...这里转换接口字段
            ...toRaw(form)
        };

        // 转换数据
        params.appFlag = params.appFlag.join();
        params.entrance = params.entrance.join();
        params.timeQuantum = params.timeQuantum.join();
        params.assembleStartTime = params._date[0];
        params.assembleEndTime = params._date[1];
        params.ruleUrl = params.ruleUrl[0] && params.ruleUrl[0].url;
        params.specialRule = JSON.stringify(params.specialRule);

        delete params._date;

        console.log("form:", params);

        if (pageType == "1") {
            let data = await _this.$apis.addActTeam(params);
            _this.$msg.success("添加成功");
        } else if (pageType == "2") {
            let data = await _this.$apis.updActTeam(params);
            _this.$msg.success("修改成功");
        } else if (pageType == "3") {
            let data = await _this.$apis.addActTeam(params);
            _this.$msg.success("添加成功");
        }

        router.back();
    };

    return { form, formRule, pageType, pageTypes, submit, goBack, disabledDate };
}
