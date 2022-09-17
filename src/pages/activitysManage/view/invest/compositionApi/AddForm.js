import { getCurrentInstance, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();
    const route = useRoute();

    const pageTypes = {
        1: "新增优选",
        2: "修改",
        3: "复制"
    };

    let row = route.query.row;

    const pageType = route.query.pageType || "1";

    // 初始表单
    const form = reactive({
        id: "",
        // 机构 异步
        orgId: "",
        // 产品 多选
        prdIndexId: [],
        // 新手奖励
        noviceRewardType: "",
        noviceRewardId: "",
        noviceRewardTime: 1,
        // 首购奖励
        firstRewardType: "",
        firstRewardId: "",
        firstRewardTime: 1,
        // 通用奖励
        generalRewardType: "",
        generalRewardId: "",
        generalRewardTime: 1,
        // 标签文本
        rewardDesc: "",
        // 规则id
        detailRule: "",
        // 可见用户
        visibleType: 3,
        // 活动入口
        entrance: [],
        // 渠道
        appFlag: ["BC", "PC"],
        // 设备
        deviceType: "TY",
        // 生效日期
        dateTimes: [],
        startTime: "",
        endTime: "",
        // 开启状态
        status: 1,
        // 排序
        sort: "",
        prdId: [],
        _orgIdChange() {
            form.prdIndexId = [];
        },
        _noviceRewardTypeChange() {
            form.noviceRewardId = "";
        },
        _firstRewardTypeChange() {
            form.firstRewardId = "";
        },
        _generalRewardTypeChange() {
            form.generalRewardId = "";
        }
    });

    // 是否配置奖励
    const rewardRadio = ref(false);
    // 反选时清除奖励
    watch(rewardRadio, (newVal) => {
        if (newVal === false) {
            form.noviceRewardType = "";
            form.noviceRewardId = "";

            form.firstRewardType = "";
            form.firstRewardId = "";

            form.generalRewardType = "";
            form.generalRewardId = "";
        }
    });

    // 日期控件 禁用时间段
    const disabledDate = (time = "") => {
        // 大于当前时间的日期
        return new Date(time).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
    };

    // 如果是回显
    if (row) {
        row = JSON.parse(decodeURIComponent(row));

        console.log(row);
        form.id = row.id;
        form.orgId = row.orgId;
        form.prdIndexId = row.prdIndexId && row.prdIndexId.split(/,|，/).map((item) => Number(item));
        // 新手奖励
        form.noviceRewardType = row.noviceRewardType;
        form.noviceRewardId = row.noviceRewardId;
        form.noviceRewardTime = row.noviceRewardTime;
        // 首购奖励
        form.firstRewardType = row.firstRewardType;
        form.firstRewardId = row.firstRewardId;
        form.firstRewardTime = row.firstRewardTime;
        // 通用奖励
        form.generalRewardType = row.generalRewardType;
        form.generalRewardId = row.generalRewardId;
        form.generalRewardTime = row.generalRewardTime;

        form.rewardDesc = row.rewardDesc;
        form.detailRule = row.detailRule;
        form.entrance = row.entrance && row.entrance.split(/,|，/);
        form.status = row.status;
        form.sort = row.sort;
        form.dateTimes = [row.startTime, row.endTime];

        form.appFlag = row.appFlag && row.appFlag.split(/,|，/);
        form.deviceType = row.deviceType;
        form.visibleType = row.visibleType;

        rewardRadio.value = !!(form.noviceRewardId || form.firstRewardId || form.generalRewardId);
    }

    // 校验规则
    const formRule = {
        prdIndexId: [{ required: true, message: "请选择产品", trigger: "change" }],

        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        sort: [{ required: true, message: "该内容不能为空", trigger: "blur" }],

        appFlag: [{ required: true, message: "至少选择一个发布渠道", trigger: "change" }],
        deviceType: [{ required: true, message: "请选择发布设备", trigger: "change" }],
        visibleType: [{ required: true, message: "请选择可见用户", trigger: "change" }],

        dateTimes: [{ type: "array", required: true, message: "请选择日期", trigger: "change" }]
    };

    const submit = async (BcPageFormRefComponent) => {
        BcPageFormRefComponent.elForm.validate((success) => {
            if (success) {
                console.log("form:", form);
                postApi();
            } else {
                return false;
            }
        });
    };

    const postApi = async () => {
        const params = {
            id: form.id,
            orgId: form.orgId,
            prdIndexId: form.prdIndexId.join(),
            noviceRewardType: form.noviceRewardType,
            noviceRewardId: form.noviceRewardId,
            noviceRewardTime: form.noviceRewardTime,
            firstRewardType: form.firstRewardType,
            firstRewardId: form.firstRewardId,
            firstRewardTime: form.firstRewardTime,
            generalRewardType: form.generalRewardType,
            generalRewardId: form.generalRewardId,
            generalRewardTime: form.generalRewardTime,
            rewardDesc: form.rewardDesc,
            detailRule: form.detailRule,
            visibleType: form.visibleType,
            entrance: form.entrance.join(),
            appFlag: form.appFlag.join(),
            deviceType: form.deviceType,
            startTime: form.dateTimes[0],
            endTime: form.dateTimes[1],
            status: form.status,
            sort: form.sort
        };

        if (pageType == "1") {
            let data = await _this.$apis.addActInvest(params);
            _this.$msg.success("添加成功");
        } else if (pageType == "2") {
            let data = await _this.$apis.updActInvest(params);
            _this.$msg.success("修改成功");
        } else if (pageType == "3") {
            let data = await _this.$apis.addActInvest(params);
            _this.$msg.success("添加成功");
        }
        router.back();
    };

    const goBack = () => {
        router.back();
    };

    return { form, formRule, rewardRadio, pageType, pageTypes, submit, goBack, disabledDate };
}
