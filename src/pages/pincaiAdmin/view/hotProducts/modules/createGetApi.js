import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    // 获取表格数据
    const getHotProducts = async ({ query, callback }) => {
        const params = {
            currentPage: query.currentPage,
            pageSize: query.pageSize
        };
        let data = await that.$apis.getHotProducts(params);
        callback({ list: data.retList, total: data.totalPage });
    };
    const sureSetMoreData = () => {};

    // 新增产品保存
    const saveActivities = (form, hotproRulesRef) => {
        // instance.refs["hotproRules"].$refs["elForm"]
        hotproRulesRef.elForm.validate(async (valid) => {
            if (!valid) {
                return;
            }
            form.appFlag = form.appFlag.join(",");
            form.financialIcon = form.financialIcon[0].url;
            let data = await that.$apis.addHotProducts(form);
            console.log(form, "保存成功");
            that.$router.back();
        });
    };
    return { getHotProducts, sureSetMoreData, saveActivities };
}
