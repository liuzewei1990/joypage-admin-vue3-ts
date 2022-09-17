import { getCurrentInstance, reactive, ref, toRaw } from "vue";
import * as MsgBox from "@pcAdmin/components/MsgBox";

export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    let selectItems = [];
    // 当selection发生变化时
    const selectionChange = (val) => {
        console.log(val);
        selectItems = val.map((item) => item);
    };

    // 校验用户是否已勾选
    const checkSelectionList = async () => {
        if (selectItems.length === 0) {
            _this.$msg.error("请先勾选要设置的数据");
            throw new Error("未选择");
        }
    };

    // 重新审核
    const reshenhe = async () => {
        await checkSelectionList();
        const modelValue = ref(1);
        await MsgBox.ConfirmRadios("审核设置", {
            modelValue,
            radios: [
                { label: "通过", value: 1, tip: "通过后所有人可见" },
                { label: "不通过", value: 2, tip: "不通过仅发帖人可见" }
            ]
        });
        _this.$msg.success("修改成功");
        instance.refs["BcTable"].emitGetApiData();
    };

    // 上架
    const up = async () => {
        await checkSelectionList();
        await MsgBox.AlertText("提示", "此操作将所选项全部设置为【上架】状态，确定吗？");
        _this.$msg.success("修改成功");
        instance.refs["BcTable"].emitGetApiData();
    };

    // 下架
    const down = async () => {
        await checkSelectionList();
        await MsgBox.AlertText("提示", "此操作将所选项全部设置为【下架】状态，确定吗？");
        _this.$msg.success("修改成功");
        instance.refs["BcTable"].emitGetApiData();
    };

    // 评论设置
    const pinglun = async () => {
        await checkSelectionList();
        const modelValue = ref(1);
        await MsgBox.ConfirmRadios("评论设置", {
            modelValue,
            radios: [
                { label: "可评论", value: 1, tip: "该帖可进行评论" },
                { label: "禁止评论", value: 2, tip: "该帖不能进行评论" }
            ]
        });
        _this.$msg.success("修改成功");
        instance.refs["BcTable"].emitGetApiData();
    };

    // 转发设置
    const zhuanfa = async () => {
        await checkSelectionList();
        const modelValue = ref(1);
        await MsgBox.ConfirmRadios("转发设置", {
            modelValue,
            radios: [
                { label: "可转发", value: 1, tip: "该帖可进行站内转发" },
                { label: "禁止转发", value: 2, tip: "该帖不能进行站内转发" }
            ]
        });
        _this.$msg.success("修改成功");
        instance.refs["BcTable"].emitGetApiData();
    };

    // 分享设置
    const fenxiang = async () => {
        await checkSelectionList();
        const modelValue = ref(1);
        await MsgBox.ConfirmRadios("分享设置", {
            modelValue,
            radios: [
                { label: "可分享", value: 1, tip: "该帖可进行站外分享" },
                { label: "禁止分享", value: 2, tip: "该帖不能进行站外分享" }
            ]
        });
        _this.$msg.success("修改成功");
        instance.refs["BcTable"].emitGetApiData();
    };

    // 评论是否展示
    const pinglun_show = async () => {
        await checkSelectionList();
        const modelValue = ref(1);
        await MsgBox.ConfirmRadios("评论是否展示", {
            modelValue,
            radios: [
                { label: "展示", value: 1, tip: "该帖所有评论内容在前端展示" },
                { label: "不展示", value: 2, tip: "该帖所有评论内容不在前端展示" }
            ]
        });
        _this.$msg.success("修改成功");
        instance.refs["BcTable"].emitGetApiData();
    };

    // 官方推荐
    const tuijian = async () => {
        await checkSelectionList();
        await MsgBox.AlertText("提示", "此操作将所选项全部设置为【官方推荐】状态，设置后，可在官方推荐帖中查看，确定吗？");
        _this.$msg.success("设置成功");
        instance.refs["BcTable"].emitGetApiData();
    };

    // 官方推荐
    const quxiaotuijian = async () => {
        await checkSelectionList();
        await MsgBox.AlertText("提示", "此操作将所选项全部设置为【取消官方推荐】状态，取消后，可在已审核的帖子中查看，确定吗？");
        _this.$msg.success("设置成功");
        instance.refs["BcTable"].emitGetApiData();
    };

    return { selectionChange, reshenhe, pinglun, up, down, zhuanfa, fenxiang, pinglun_show, tuijian, quxiaotuijian, selectItems };
}
