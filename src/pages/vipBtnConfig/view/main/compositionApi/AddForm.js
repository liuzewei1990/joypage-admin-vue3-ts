import { getCurrentInstance, reactive, ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

export default function (getSelectTMPage, refAdd) {
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
            (formModel.formData.id = rowData.id || ""),
                (formModel.formData.partitionName = rowData.partitionName || ""), //分区名称
                (formModel.formData.partitionId = rowData.partitionId || ""), //分区id
                (formModel.formData.buttonName = rowData.buttonName || ""), //按钮名称
                (formModel.formData.iconUrl = rowData.iconUrl ? [{ url: rowData.iconUrl }] : []), //iconUrl
                (formModel.formData.subtitleType = rowData.subtitleType ? rowData.subtitleType + "" : ""), //副标题类型
                (formModel.formData.subtitleText = rowData.subtitleText || ""), //副标题
                (formModel.formData.contentType = rowData.contentType ? rowData.contentType + "" : ""), //跳转类型 1链接2活动3会员积分商城4卡券页5平台权益页6红包页7排行榜8知识9会员中心10活动投资记录
                (formModel.formData.content = rowData.contentType == 2 ? parseInt(rowData.content) : rowData.content || ""), //跳转内容
                (formModel.formData.porderNum = rowData.porderNum || ""), //分区排序
                (formModel.formData.orderNum = rowData.orderNum || ""), //按钮排序
                (formModel.formData.isRealName = rowData.isRealName == 0 ? 0 : 1), //是否实名认证 1是 0否
                (formModel.formData.realNameTipText = rowData.realNameTipText || ""), //实名提示文案
                (formModel.formData.appFlags = rowData.appFlags ? rowData.appFlags.split(",") : []), //生效渠道 多个以逗号分 //split将字符串转为数组展示
                (formModel.formData.isEnable = rowData.isEnable == 0 ? 0 : 1); //是否启用 1是 0否
            formModel.formData.advPlatform = rowData.advPlatform ? rowData.advPlatform : ""; //设备
            // console.log("rowData121212121",formModel.formData)
        }
    });

    formModel.initFormData(); //初始值调用一下

    // 校验规则
    const formRule = {
        buttonName: [
            { required: true, message: "请输入按钮名称", trigger: "blur" },
            {
                min: 2,
                max: 8,
                message: "长度在 2 到 8 个字符",
                trigger: "blur"
            }
        ],
        iconUrl: [{ required: true, message: "请添加图片", trigger: "change" }],
        contentType: [{ required: true, message: "请选择跳转类型", trigger: "change" }],
        content: [{ required: true, message: "请选择跳转内容", trigger: "change" }],
        orderNum: [
            { required: true, message: "请输入排序", trigger: "blur" },
            { type: "number", message: "排序必须为数字值" }
        ],
        isRealName: [{ required: true, message: "请选择", trigger: "change" }],
        appFlags: [{ required: true, message: "请选择", trigger: "change" }],
        isEnable: [{ required: true, message: "请选择", trigger: "change" }],
        subtitleText: [
            { required: false, message: "请输入副标题文案", trigger: "blur" },
            {
                min: 2,
                max: 10,
                message: "长度在 2 到 10 个字符",
                trigger: "blur"
            }
        ]
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
            id: formModel.formData.id,
            partitionName: formModel.formData.partitionName,
            partitionId: formModel.formData.partitionId,
            buttonName: formModel.formData.buttonName,
            iconUrl: formModel.formData.iconUrl[0].url,
            subtitleType: formModel.formData.subtitleType,
            subtitleText: formModel.formData.subtitleText,
            contentType: formModel.formData.contentType,
            content: formModel.formData.content,
            porderNum: formModel.formData.porderNum,
            orderNum: formModel.formData.orderNum,
            isRealName: formModel.formData.isRealName,
            realNameTipText: formModel.formData.realNameTipText,
            appFlags: formModel.formData.appFlags.join(), //多选，转字符串提交
            isEnable: formModel.formData.isEnable,
            advPlatform: formModel.formData.advPlatform
        };
        console.log("保存入参", params);
        if (formModel.title == "新增分区") {
            let data = await _this.$apis.partitionSave(params).then((res) => {
                if (res.success) {
                    _this.$msg.success("添加成功");
                    getSelectTMPage(); //刷新列表
                    // location.reload();  //刷新页面
                }
            });
        } else if (formModel.title == "新增按钮") {
            let data = await _this.$apis.buttonSave(params).then((res) => {
                if (res.success) {
                    _this.$msg.success("添加成功");
                    getSelectTMPage(); //刷新列表
                    // location.reload();  //刷新页面
                }
            });
        } else if (formModel.title == "修改") {
            let data = await _this.$apis.buttonSave(params).then((res) => {
                if (res.success) {
                    _this.$msg.success("修改成功");
                    getSelectTMPage(); //刷新列表
                    // location.reload();  //刷新页面
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
