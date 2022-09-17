import { reactive, ref, onMounted, getCurrentInstance } from "vue";

export default function (formDataApi) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    const addFormData = reactive({
        ruleForm: "",
        title: "新增",
        centerDialogVisible: false,
        formData: {
            // id:'',
            // daysYear: '',
            // company: '',
            // orderNum: ''
        },
        initFormData: function (rowData = {}, ruleForm) {
            //console.log("rowData",rowData)
            //console.log("新增修改js接收数据",ruleForm)
            addFormData.ruleForm = ruleForm || "";
            addFormData.formData.id = rowData.id || "";
            addFormData.formData.daysYear = parseFloat(rowData.daysYear) || "";
            addFormData.formData.company = rowData.company || "";
            addFormData.formData.orderNum = rowData.orderNum || "";
        }
    });

    addFormData.initFormData(); //初始化数组

    const validateDaysYear = (rule, value, callback) => {
        if (value == "") {
            callback(new Error("请输入期限"));
        } else if (isNaN(value)) {
            callback(new Error("请输入正确的期限"));
        } else if (!/^\d+$/.test(value)) {
            callback(new Error("请输入正确的期限，只可为正整数"));
        } else if (value < 1) {
            callback(new Error("期限应大于0"));
        } else {
            callback();
        }
    };

    const validateOrderNum = (rule, value, callback) => {
        if (value == "") {
            callback(new Error("请输入排序值"));
        } else if (isNaN(value)) {
            callback(new Error("请输入正确的排序值"));
        } else if (!/^\d+$/.test(value)) {
            callback(new Error("请输入正确的排序值，只可为正整数"));
        } else if (value < 1) {
            callback(new Error("排序值应大于0"));
        } else {
            callback();
        }
    };

    const rules = {
        daysYear: [{ required: true, validator: validateDaysYear, trigger: "change" }],
        company: [{ required: true, message: "请选择单位", trigger: "change" }],
        orderNum: [{ required: true, validator: validateOrderNum, trigger: "change" }]
    };

    //新增和修改
    const submit = () => {
        // console.log("新增修改addFormData.ruleForm",addFormData.ruleForm)
        // instance.refs["ruleForm"].validate(valid => {
        addFormData.ruleForm.validate((valid) => {
            if (valid) {
                console.log("submit success");
                submitApi();
            } else {
                return false;
            }
        });
    };

    //新增修改接口
    const submitApi = async () => {
        console.log("addFormData.formData", addFormData.formData);
        await _this.$apis.timeLimitSave(addFormData.formData).then((res) => {
            if (res.success == true) {
                if (addFormData.title == "新增") {
                    _this.$msg.success("添加成功");
                } else if (addFormData.title == "修改") {
                    _this.$msg.success("修改成功");
                }
                addFormData.centerDialogVisible = false;
                // formDataApi()
                location.reload();
            }
        });
    };

    return {
        addFormData,
        rules,
        submit
    };
}
