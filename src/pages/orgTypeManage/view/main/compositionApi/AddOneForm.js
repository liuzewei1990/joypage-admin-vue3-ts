/*新增修改一级机构**/
import { getCurrentInstance, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { orgTypeSave, orgTypeDelete, oneDetailListApi } from "../../../apis/index";

export default function (getTableData) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    const formModelOne = reactive({
        dialogVisibleOne: false,
        title: "设置一级机构类型",
        controlButton: true,
        form: {
            tableData: []
        },

        newFormItem: function (row = []) {
            formModelOne.form.tableData = row;
            //    console.log("接收",formModelOne.form.tableData )
        }
    });

    const rulesOne = {
        orgTypeName: [{ required: true, message: "请填写一级机构", trigger: "change" }]
    };

    // form 新增行默认数据
    const newFormItem = () => {
        return {
            count: "",
            id: "",
            level: "",
            orderNo: "",
            orgTypeName: "",
            remarks: "",
            upId: "",
            status: 0
        };
    };

    // 初始化table数据,进去页面需要先加载
    const initForm = () => {
        formModelOne.form.tableData.push(newFormItem());
    };

    //设置一级机构类型
    const handleEditOne = () => {
        // formModelOne.newFormItem(tableData.FormData)  //给AddOneLevel传递数据，不能用方法传参这种方式传递，
        //因为tableData.FormData数组被tableData引用了，修改tableData后tableData.FormData 也会跟着改变
        //两个js 操作一个数组，会导致父组件和子组件列表都会增加，所以需要传递接口最新数据，或者进行深拷贝传递
        // console.log(formModelOne)
        formModelOne.controlButton = true;
        oneDetailListApi().then((res) => {
            // console.log("传给一级机构",res)
            res.success.forEach((item) => {
                item.isEdit = true;
            });
            formModelOne.newFormItem(res.success);
        });

        formModelOne.dialogVisibleOne = true;
    };

    // 点击新增添加一行
    const createRow = () => {
        if (formModelOne.controlButton) {
            formModelOne.form.tableData.push(newFormItem());
            // console.log("点击新增添加一行",formModelOne.form.tableData)
            formModelOne.controlButton = false;
        }
    };

    //删除
    const handleDelete = (index, row) => {
        let params = {
            id: row.id
        };
        orgTypeDelete(params)
            .then((res) => {
                // console.log('删除',res)

                if (res.success) {
                    _this.$msg.success("删除成功");
                    //table删除
                    formModelOne.form.tableData.splice(index, 1);
                } else {
                    _this.$msg.error("删除失败,请重新操作");
                }
            })
            .catch((error) => {
                console.info(error);
            });
    };

    //保存
    const submitOne = (row, refOne) => {
        // console.log("保存row",row)
        refOne.validate((valid) => {
            if (valid) {
                console.log("submit success");
                let params = {
                    id: "", //产品id
                    upId: "", //二级机构类型名称
                    orgTypeName: row.orgTypeName, //一级机构类型名称
                    orderNo: "", //排序
                    remarks: "", //备注
                    level: 1 //级别
                    // status:"",//是否启用
                };
                // console.log("一级就保存",params)
                orgTypeSave(params).then((res) => {
                    // console.log(res)
                    if (res.success) {
                        _this.$msg.success("添加成功");
                        formModelOne.dialogVisibleOne = false;
                        formModelOne.controlButton = true;
                        //强制页面刷新
                        getTableData();
                        // location.reload()
                    }
                });
            } else {
                return false;
            }
        });
    };
    return {
        formModelOne,
        handleEditOne,
        rulesOne,
        createRow,
        initForm,
        handleDelete,
        submitOne
    };
}
