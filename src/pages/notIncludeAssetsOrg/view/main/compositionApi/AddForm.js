import { getCurrentInstance, reactive, ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

export default function (refAdd, BcTableRefComponent) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();
    const route = useRoute();

    // 表单初始值
    const formModel = reactive({
        dialogVisible: false, //是否显示弹窗
        title: "新增", //标题
        formData: {}, //新增字段的对象
        // 回显 ｜ 初始值
        initFormData(rowData = {}) {
            console.log("rowData", rowData);
            (formModel.formData.id = rowData.id || ""), //当前id
                (formModel.formData.orgId = rowData.orgId || ""), //机构id
                (formModel.formData.orgName = rowData.orgName || ""), //机构名称
                (formModel.formData.orgButtonAlias = rowData.orgButtonAlias || ""), //按钮别名
                (formModel.formData.assetLink = rowData.assetLink || ""), //资产链接
                (formModel.formData.state = rowData.state == 0 ? 0 : 1), //是否智能展示(0是，1否)
                (formModel.formData.orderyby = rowData.orderyby || ""), //排序号
                (formModel.formData.ctVer = rowData.ctVer || ""), //版本号
                (formModel.formData.enable = rowData.enable == 0 ? 0 : 1), //是否启用(0是，1否)
                (formModel.formData.appFlags = rowData.appFlags ? rowData.appFlags.split(",") : []); //生效渠道 多个以逗号分 //split将字符串转为数组展示
            console.log("rowData121212121", formModel.formData);
        }
    });

    formModel.initFormData(); //初始值调用一下

    // 校验规则
    const formRule = {
        orgId: [{ required: true, message: "请选择机构", trigger: "change" }],
        assetLink: [{ required: true, message: "请输入资产链接", trigger: "blur" }],
        state: [{ required: true, message: "请选择是否智能沾水", trigger: "change" }],
        orderyby: [
            { required: true, message: "请输入排序", trigger: "blur" }
            // { type:'number', message: '排序必须为数字值'}
        ],
        enable: [{ required: true, message: "请选择是否启用", trigger: "change" }],
        appFlags: [{ required: true, message: "请选择支持渠道", trigger: "change" }]
    };

    // 提交按钮
    const submit = async () => {
        console.log(instance);
        // instance.refs["refAdd"].$refs["elForm"].validate(success => { //之前ref的用法
        refAdd.value.elForm.validate((success) => {
            //3.0ref响应式用法  //需要把 子组件的ref 在setup 中 暴露出来
            if (success) {
                console.log("form:", formModel);
                postApi(); //调接口
            } else {
                return false;
            }
        });
    };

    // 提交到后台--调接口
    const postApi = async () => {
        const params = {
            id: formModel.formData.id, //当前id
            orgId: formModel.formData.orgId, //机构id
            orgName: formModel.formData.orgName, //机构id
            assetLink: formModel.formData.assetLink, //资产链接
            orgButtonAlias: formModel.formData.orgButtonAlias, //按钮别名
            state: formModel.formData.state, //是否智能展示(0是，1否)
            orderyby: formModel.formData.orderyby, //排序号
            ctVer: formModel.formData.ctVer, //版本号
            enable: formModel.formData.enable, //是否启用(0是，1否)
            appFlags: formModel.formData.appFlags.join() //多选，转字符串提交
        };
        console.log("保存入参", params);
        if (formModel.title == "新增按钮") {
            let data = await _this.$apis.updateSave(params).then((res) => {
                console.log("新增res", res);
                if (res.success == true) {
                    _this.$msg.success("添加成功");
                    BcTableRefComponent.value.emitGetApiData(); //刷新列表
                } else {
                    _this.$msg.error(res.success.description);
                }
            });
        } else if (formModel.title == "修改") {
            let data = await _this.$apis.updateSave(params).then((res) => {
                console.log("修改res", res);
                if (res.success) {
                    _this.$msg.success("修改成功");
                    BcTableRefComponent.value.emitGetApiData(); //刷新列表
                }
            });
        }
        //隐藏弹窗
        formModel.dialogVisible = false;
    };

    //点击阴影部分
    const handleClose = (done) => {
        _this
            .$confirm("确认关闭？")
            .then((_) => {
                done();
                //   location.reload();  //刷新页面
            })
            .catch((_) => {});
    };

    // //取消按钮
    // const cancleFrom = ()=>{
    //     location.reload();  //刷新页面
    // }

    return {
        formModel,
        formRule,
        submit,
        handleClose
        // cancleFrom,
    };
}
