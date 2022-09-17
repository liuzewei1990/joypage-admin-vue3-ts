import { reactive, ref, onMounted, getCurrentInstance } from "vue";
export default function (form) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    const addFormData = reactive({
        formData: {
            id: "",
            annualDays: "", //年天数
            monthDays: "", //月天数
            interestRate: "" //利率
        }
    });

    const state = reactive({
        annualDayState: true,
        monthDayState: true,
        interestRateState: true
    });

    const validatorDay = (rule, value, callback) => {
        if (isNaN(value)) {
            callback(new Error("请输入正确的天数"));
        } else {
            callback();
        }
    };

    const validatorInterestRate = (rule, value, callback) => {
        if (value == "") {
            callback(new Error("请输入基准利率"));
        } else if (isNaN(value)) {
            callback(new Error("请输入正确的基准利率"));
        } else if (value < 0) {
            callback(new Error("基准利率应大于0"));
        } else {
            callback();
        }
    };

    const rules = {
        annualDays: [{ required: false, validator: validatorDay, trigger: "change" }],
        monthDays: [{ required: false, validator: validatorDay, trigger: "change" }],
        interestRate: [{ required: true, validator: validatorInterestRate, trigger: "change" }]
    };

    //公式管理数据
    const formulaDataApi = () => {
        _this.$apis.formulaList().then((res) => {
            //    console.log('公式管理',res.success)
            if (res.success) {
                addFormData.formData = res.success;
            }
        });
    };

    //公式管理修改
    const formulaUpdateApi = () => {
        // console.log(addFormData.formData)
        _this.$apis.formulaUpdate(addFormData.formData).then((res) => {
            // console.log('修改公式管理',res)
            if (res.success) {
                _this.$msg.success("修改成功");
                formulaDataApi();
                state.annualDayState = true;
                state.monthDayState = true;
                state.interestRateState = true;
            }
        });
    };
    //修改
    const submit = () => {
        form.value.validate((valid) => {
            if (valid) {
                console.log("submit success");
                formulaUpdateApi();
            } else {
                return false;
            }
        });
    };

    const modifyBtn = (param) => {
        if (param === "annualDays") {
            state.annualDayState = false;
        } else if (param === "monthDays") {
            state.monthDayState = false;
        } else if (param === "interestRate") {
            state.interestRateState = false;
        }
    };
    return {
        addFormData,
        state,
        rules,
        formulaDataApi,
        modifyBtn,
        submit
    };
}
