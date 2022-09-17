import { getCurrentInstance, reactive, ref, watch, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";

export default function (BcPageFormRefComponent) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();
    const route = useRoute();

    const pageTypes = {
        1: "新增周期奖励",
        2: "修改",
        3: "复制"
    };

    const pageType = route.query.pageType || "1";

    /* ******数据流通过route进来****** */
    let routeForm = route.query.row || "{}";
    routeForm = JSON.parse(decodeURIComponent(routeForm));
    // 初始表单
    const form = reactive({
        id: routeForm.id,

        // 奖励名称
        rewardName: routeForm.rewardName || "",
        // 奖励描述
        rewardDescribe: routeForm.rewardDescribe || "",
        // 奖励规则
        rewardRule: routeForm.rewardRule || "",

        // 奖励范围 1-活动，2-任务
        rewardScope: String(routeForm.rewardScope || "1"),
        // 奖励范围ID
        activityId: routeForm.activityId || "",

        /*****************奖励配置***********************/
        // 加息利率
        rewardRate: routeForm.rewardRate || "",
        // 利率期限
        rateTimeLimit: routeForm.rateTimeLimit || "",
        // 付息周期
        rateCycle: routeForm.rateCycle || "",
        // 最高奖励
        rewardTopLimit: routeForm.rewardTopLimit || "",
        // 加息时间
        holdDay: routeForm.holdDay || ""
    });

    // 校验规则
    const formRule = {
        rewardName: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        rewardDescribe: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        rewardRule: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        activityId: [{ required: true, message: "内容不能为空", trigger: "change" }],
        rewardRate: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        rateTimeLimit: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        rateCycle: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        rewardTopLimit: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        holdDay: [{ required: true, message: "内容不能为空", trigger: "blur" }]
    };

    // 提交按钮
    const submit = async () => {
        // 由于是个ref 需要通过value读取
        BcPageFormRefComponent.value["elForm"].validate((success) => {
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

        if (pageType == "1") {
            let data = await _this.$apis.addLoopReward(params);
            _this.$msg.success("添加成功");
        } else if (pageType == "2") {
            let data = await _this.$apis.updLoopReward(params);
            _this.$msg.success("修改成功");
        } else if (pageType == "3") {
            // let data = await _this.$apis.addReward(params)
            // _this.$msg.success("添加成功")
        }

        router.back();
    };

    return { form, formRule, pageType, pageTypes, submit, goBack };
}
