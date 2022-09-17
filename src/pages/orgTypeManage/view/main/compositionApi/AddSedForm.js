/*新增修改二级机构*/
import { getCurrentInstance, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { orgTypeSave } from "../../../apis/index";

export default function (addSecond, getTableData) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    const formModelSed = reactive({
        dialogVisibleSed: false,
        title: "新增二级机构类型",
        addSedFormData: {
            // id:'',//产品id
            // upId:'',//一级机构类型id //当新增修改二级机构时，传给后端upId是一级机构类型id, orgTypeName是二级机构类型名称
            // orgTypeName:'',//二级机构类型名称
            // orderNo:'',//排序
            // remarks:'',//备注
            // level: 2,//级别
            // status:""//是否启用 去掉了
        },
        initFormData: function (row = {}) {
            //    console.log("传过来的data",row)
            formModelSed.addSedFormData.id = row.id || "";
            formModelSed.addSedFormData.upId = row.upId ? row.upId + "" : "";
            formModelSed.addSedFormData.orgTypeName = row.orgTypeName || "";
            formModelSed.addSedFormData.orderNo = row.orderNo || "";
            formModelSed.addSedFormData.remarks = row.remarks || "";
            formModelSed.addSedFormData.level = row.level || 2;
            //    formModelSed.addSedFormData.status = row.status || ''
            //    console.log('formModelSed',formModelSed)
        }
    });

    // formModelSed.initFormData()

    const validateNumber = (rule, value, callback) => {
        if (value == "") {
            callback(new Error("请输入"));
        } else if (isNaN(value)) {
            callback(new Error("请输入正确的数值"));
        } else if (value < 1) {
            callback(new Error("输入值应大于0"));
        } else {
            callback();
        }
    };

    const validateOrgTypeName = (rule, value, callback) => {
        let regexp = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
        if (value == "") {
            callback(new Error("请填写二级机构类型名称"));
        } else if (regexp.test(value)) {
            callback(new Error("输入值不能有特殊符号"));
        } else {
            callback();
        }
    };

    const rulesSed = {
        upId: [{ required: true, message: "请选择一级机构", trigger: "change" }],
        // orgTypeName:[
        //     { required: true, message: '请填写二级机构类型名称', trigger: 'change' },
        //     { min: 2, max: 20, message: '长度在 2 到 20个字符'}
        // ],
        orgTypeName: [
            { required: true, validator: validateOrgTypeName, trigger: "change" },
            { min: 2, max: 20, message: "长度在 2 到 20个字符" }
        ],
        orderNo: [{ required: true, validator: validateNumber, trigger: "change" }],
        remarks: [{ required: false, min: 0, max: 20, message: "长度在 0 到 100个字符" }]
    };

    //编辑
    const handleEditSed = (index, row) => {
        // console.log("编辑row",row)
        if (row) {
            formModelSed.title = "修改二级机构类型";
            formModelSed.initFormData(row);
        } else {
            formModelSed.title = "新增二级机构类型";
            formModelSed.initFormData();
        }
        formModelSed.dialogVisibleSed = true;
        //给弹窗传数据
        // formModelSed.initFormData(row)
    };

    const submitSed = () => {
        addSecond.value.refSecond.validate((valid) => {
            if (valid) {
                console.log("submit success");
                orgTypeSave(formModelSed.addSedFormData).then((res) => {
                    // console.log(res)
                    if (res.success) {
                        _this.$msg.success("添加成功");
                        formModelSed.dialogVisibleSed = false;
                        // 渲染列表
                        getTableData();
                        // location.reload() //改完结构不用刷新页面
                    }
                });
            } else {
                return false;
            }
        });
    };

    return {
        handleEditSed,
        formModelSed,
        rulesSed,
        submitSed
    };
}
