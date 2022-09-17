import { getCurrentInstance, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default function () {
    const that = getCurrentInstance().appContext.config.globalProperties;

    const route = useRoute();

    const FormQuery = (route.query.item && JSON.parse(decodeURIComponent(route.query.item))) || "";
    console.log(FormQuery);
    const saveForm = reactive({
        // '监管沙盒
        superviseId: FormQuery.superviseId || "",
        // 渠道
        appFlag: (FormQuery.appFlag && FormQuery.appFlag.split(/,|，/)) || ["PMP", "YIYE", "PC", "BC"],
        // 所属机构
        financialOrg: FormQuery.financialOrg || "1",
        // 类型
        financialType: FormQuery.financialType || "1",
        // 类型-->（产品内容）
        financialInfo: FormQuery.financialInfo || "1",

        // 排序
        sort: FormQuery.sort || "",
        // icon
        financialIcon: FormQuery.financialIcon && FormQuery.financialIcon.includes(".") ? [{ url: FormQuery.financialIcon }] : [{ url: "/ACT/a092a505-52d6-42d6-838b-1ec0a82f5bab.jpg" }],
        // 别名 名称
        financialName: FormQuery.financialName || "",
        // 设备类型
        deviceType: FormQuery.deviceType || "TY",
        // 小程序id
        pmpId: FormQuery.pmpId || "",
        // 小程序跳转类型
        pmpType: FormQuery.pmpType || "",
        // 可见用户
        visibleType: FormQuery.visibleType || 2
    });
    return {
        saveForm
    };
}
