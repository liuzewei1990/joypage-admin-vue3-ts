import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

export default function (addFormData, uintList, ruleForm) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    const limitTable = reactive({
        tableData: []
    });

    const formDataApi = () => {
        _this.$apis.timeLimitList().then((res) => {
            res.success.forEach((item) => {
                uintList.forEach((its) => {
                    if (item.company == its.id) item["name"] = its.name;
                });
            });
            // console.log("列表展示数据",res.success)
            limitTable.tableData = res.success;
        });
    };

    const handleEdit = (index, row) => {
        if (row) {
            addFormData.title = "修改";
        }
        addFormData.centerDialogVisible = true;
        //传数据
        addFormData.initFormData(row, ruleForm);
    };

    const handleDelete = (index, row) => {
        _this
            .$confirm("确定要删除此条内容？", "提示", { type: "warning" })
            .then(() => {
                deleteRow(row.id);
            })
            .catch(() => {
                _this.$message({ type: "info", message: "已取消删除" });
            });
    };

    //删除接口
    const deleteRow = (id) => {
        _this.$apis.timeLimitDelete({ id: id }).then((res) => {
            if (res.success) {
                formDataApi();
            }
        });
    };
    return {
        limitTable,
        formDataApi,
        handleEdit,
        handleDelete
    };
}
