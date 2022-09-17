import { getCurrentInstance, reactive, ref, watch, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";

export default function (BcPageFormRefComponent) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();
    const route = useRoute();

    const pageTypes = {
        1: "新增随机奖励",
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
        // 奖励类型 3:随机奖励
        rewardType: routeForm.rewardType || "3",

        // 奖励名称
        rewardName: routeForm.rewardName || "",
        // 奖励描述
        rewardDescribe: routeForm.rewardDescribe || "",
        // 奖励规则
        rewardRule: routeForm.rewardRule || "",

        // 奖励范围 1-活动，2-任务
        rewardScope: String(routeForm.rewardScope || "1"),
        // 奖励范围ID
        rewardScopeId: routeForm.rewardScopeId || "",

        // 奖励配置
        // configList: [{ holdDay: 1, rewardRate: 2, rewardTopLimit: 3 }],
        // configList: [],
        configList: (routeForm.configList || [{}]).map((item) => ({
            // 奖励名称
            title: item.title || "",
            // 奖励图片
            picture: item.picture ? [{ url: item.picture }] : [],
            // 奖品类型
            randomType: String(item.randomType || "1"),
            // 奖励类型值:现金
            rewardAmount: item.rewardAmount || "",
            // 奖励类型值:积分
            rewardIntegral: item.rewardIntegral || "",
            // 奖励类型值:卡券
            couponId: item.couponId || "",
            // 中将概率
            probability: item.probability || "0"
        }))
    });

    // 校验规则
    const formRule = {
        rewardName: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        rewardScopeId: [{ required: true, message: "内容不能为空", trigger: "change" }],
        rewardDescribe: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        rewardRule: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        configList: [{ type: "array", required: true, message: "内容不能为空", trigger: "change" }]
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
        params.configList = params.configList.map((item) => {
            // 拷贝 解除引用
            let newItem = { ...item };
            newItem.picture = newItem.picture[0].url;
            return newItem;
        });

        if (pageType == "1") {
            let data = await _this.$apis.addReward(params);
            _this.$msg.success("添加成功");
        } else if (pageType == "2") {
            let data = await _this.$apis.updReward(params);
            _this.$msg.success("修改成功");
        } else if (pageType == "3") {
            // let data = await _this.$apis.addReward(params)
            // _this.$msg.success("添加成功")
        }

        router.back();
    };

    return { form, formRule, pageType, pageTypes, submit, goBack };
}
