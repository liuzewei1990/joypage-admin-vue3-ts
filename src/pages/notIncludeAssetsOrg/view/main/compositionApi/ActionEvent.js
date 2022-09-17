import { getCurrentInstance, ref, reactive, toRefs } from "vue";
/**
 * 操作逻辑区Api
 */
export default function (formModel, BcTableRefComponent) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    // console.log('instance',instance)
    // console.log('formModel',formModel)
    // 批操作按钮

    // 新增按钮/修改
    const handleAdd = async (item) => {
        if (!item) {
            //新增按钮 id不存在
            console.log("新增按钮", item);
            formModel.title = "新增按钮";
            formModel.initFormData(); //调用formModel初始化值
        } else {
            //修改 id存在时
            console.log("修改", item);
            formModel.title = "修改";
            formModel.initFormData(item); //传item,回显
        }
        formModel.dialogVisible = true; //先赋值，再弹窗
    };

    //删除按钮
    const handleDelete = (itemId) => {
        _this
            .$confirm("是否确定删除", "提示", { type: "warning" })
            .then(() => {
                console.log("删除", itemId);
                let params = {
                    id: itemId //当前按钮id
                };
                let data = _this.$apis.buttonDelete(params).then((res) => {
                    if (res.success) {
                        _this.$msg.success("删除成功");
                        BcTableRefComponent.value.emitGetApiData(); // 调用列表数据
                    }
                });
            })
            .catch(() => {
                console.log(_this);
                _this.$message.info("已取消删除");
            });
    };

    return {
        handleAdd,
        handleDelete
    };
}
