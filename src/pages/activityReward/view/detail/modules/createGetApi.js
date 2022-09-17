import { getCurrentInstance, reactive, ref, toRaw } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    const addtype = that.$route.query.benefitType || "";
    const itemData = (that.$route.query.item && JSON.parse(decodeURIComponent(that.$route.query.item))) || {};

    console.log("itemData", itemData);
    // 新增修改表单
    const addFormData = reactive({
        // 渠道权益类型：1-激活码，2-链接，3-扫码
        benefitType: addtype,
        // 名称
        benefitName: itemData.benefitName || "",
        // 描述
        benefitDescribe: itemData.benefitDescribe || "",
        // 时间
        rdate: itemData.startDate ? [itemData.startDate, itemData.endDate] : [],
        // 数量限制
        limitNum: itemData.limitNum || "1",
        // 流程
        process: itemData.process || "",
        // 修改所用id
        id: itemData.id || "",
        // 链接/二维码 地址
        benefitUrl: addtype == "3" ? (itemData.benefitUrl ? [{ url: itemData.benefitUrl }] : []) : itemData.benefitUrl || ""
    });
    // 激活码查询条件
    const codeFormData = reactive({
        activityName: "",
        memberPhone: "",
        getDate: "",
        benefitConfigId: itemData.id || ""
    });
    // 获取激活码表格数据---激活码领用详情
    const getInfoDetail = async ({ query, callback }) => {
        let params = {
            currentPage: query.currentPage,
            pageSize: query.pageSize || 10
        };
        const copyCodeFormData = JSON.parse(JSON.stringify(codeFormData));
        copyCodeFormData.receiveStartTime = copyCodeFormData.getDate && copyCodeFormData.getDate[0];
        copyCodeFormData.receiveEndTime = copyCodeFormData.getDate && copyCodeFormData.getDate[1];
        delete copyCodeFormData.getDate;
        let data = await that.$apis.getInfoDetail({ ...copyCodeFormData, ...params });
        callback({ list: data.retList, total: data.totalCount });
    };
    //  激活码---连接--扫码--新增修改保存
    const detailSave = () => {
        instance.refs["detailForm"].$refs["elForm"].validate(async (va) => {
            if (!va) {
                return;
            }
            addFormData.startDate = addFormData.rdate[0];
            addFormData.endDate = addFormData.rdate[1];
            delete addFormData.rdate;
            addFormData.benefitType == "3" ? (addFormData.benefitUrl = addFormData.benefitUrl[0].url) : addFormData.benefitUrl;
            const apiType = itemData.id ? "changeActivitiesItem" : "AddActivitiesItem";
            let data = await that.$apis[apiType](addFormData);
            that.$message({ type: "success", message: "保存成功!" });
            that.$router.back();
        });
    };

    return { codeFormData, addFormData, itemData, getInfoDetail, detailSave };
}
