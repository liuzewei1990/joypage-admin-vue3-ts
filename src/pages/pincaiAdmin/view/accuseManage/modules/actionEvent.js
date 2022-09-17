import { getCurrentInstance, reactive, ref } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    const addAccuseType = () => {
        const parms = {
            confirmButtonText: "保存",
            cancelButtonText: "取消",
            inputPattern: /\S/,
            inputErrorMessage: "不能为空"
        };
        that.$prompt("请输入投诉类型", "提示", parms)
            .then(({ value }) => {
                that.$message({
                    type: "success",
                    message: `保存成功${value}`
                });
                instance.refs["BcTable"].emitGetApiData();
            })
            .catch((error) => {});
    };
    return { addAccuseType };
}
