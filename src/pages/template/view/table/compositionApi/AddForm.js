import { getCurrentInstance, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default function (BcPageFormRefComponent) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();
    const route = useRoute();

    // 初始表单
    const form = reactive({
        id: "",
        // 机构 异步
        orgId: "",
        // 产品 异步
        prdIndexId: "",

        flag: ["PC", "BC"],
        device: "IOS",

        _orgIdChange() {
            form.prdIndexId = [];
        }
    });

    // 校验规则
    const formRule = {
        prdIndexId: [{ required: true, message: "请选择产品", trigger: "change" }]
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
            // ...这里转换接口字段
        };
        let data = await _this.$apis.invest.addActInvest(params);

        _this.$msg.success("添加成功");
        router.back();
    };

    return { form, formRule, submit, goBack };
}
