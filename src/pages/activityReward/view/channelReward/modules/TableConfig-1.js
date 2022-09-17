import { getCurrentInstance, reactive, ref, h, toRefs } from "vue";
import { TextLink, HeaderImage } from "@common/finsuit-components/BcTable/columnContent";
export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    const addcode = ref(false);
    const addCodeformDialog = ref(false);
    // 激活码table单条数据
    let itemData = ref();
    // 券码表单
    const addCodeform = reactive({ name: "" });
    // 导入- --弹框
    const sendCode = (scope) => {
        itemData.value = scope.row;
        addcode.value = true;
    };
    // 查看内容
    const changeContent = (scope, type) => {
        const links = {
            BcTableCode: "/channelReward/detail-1",
            BcTableLink: "/channelReward/detail-2",
            BcTableScanCode: "/channelReward/detail-3"
        };
        that.$router.push({
            path: links[type],
            query: { benefitType: instance.attrs.modelValue, item: encodeURIComponent(JSON.stringify(scope.row)) }
        });
    };
    // 开启、关闭
    const openThis = async (scope, type) => {
        const params = {
            id: scope.row.id,
            status: scope.row.status == "1" ? "0" : "1",
            deleteFlag: "1"
        };
        await that.$apis.changeActivitiesItem(params);
        that.$message({ type: "success", message: "操作成功!" });
        instance.refs[type].emitGetApiData();
    };
    // 删除
    const deteleContent = async (scope, type) => {
        const params = {
            id: scope.row.id,
            status: scope.row.status,
            deleteFlag: "0"
        };
        that.$confirm("是否删除?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(async () => {
                await that.$apis.changeActivitiesItem(params);
                that.$message({ type: "success", message: "删除成功!" });
                instance.refs[type].emitGetApiData();
            })
            .catch(() => {});
    };
    // 删除单个券码
    const deteleSingleCode = (scope) => {
        that.$confirm("是否删除?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(async () => {
                await that.$apis.deleteCode({ id: scope.row.id });
                that.$message({ type: "success", message: "删除成功!" });
                instance.refs["addCode"].emitGetApiData();
            })
            .catch(() => {});
    };
    // 新增单个券码，
    const saveSingleCode = async (row) => {
        const params = {
            benefitConfigId: row.id,
            benefitCodeInfo: addCodeform.name
        };
        const data = await that.$apis.addSingleCode(params);
        addCodeformDialog.value = false;
        that.$message({ type: "success", message: "添加成功!" });
        instance.refs["addCode"].emitGetApiData();
    };
    // 设置开启按钮样式
    const setOpenBtnStyle = {
        color: "#409eff",
        cursor: "pointer"
    };
    const onclickTextLink = (scope) => {
        that.$router.push({
            path: "/channelReward/detail-1-1",
            query: { item: encodeURIComponent(JSON.stringify(scope.row)) }
        });
    };
    // 激活码
    const tableConfigCode = {
        columnJson: [
            {
                prop: "id",
                label: "编号"
            },
            {
                prop: "benefitName",
                label: "激活码名称"
            },
            {
                prop: "totalNum",
                label: "发放总数"
            },
            {
                prop: "receiveNum",
                label: "领用总数",
                render(sc) {
                    return h(TextLink, { onclick: () => onclickTextLink(sc) }, () => sc.row.receiveNum);
                }
            }
        ],
        actionJson: {
            label: "操作",
            btns: [
                (scope) => {
                    return h("div", { onclick: () => openThis(scope, "BcTableCode"), style: setOpenBtnStyle }, scope.row.status == "1" ? "关闭" : "开启");
                },
                { text: "修改", click: (scope) => changeContent(scope, "BcTableCode") },
                { text: "删除", click: (scope) => deteleContent(scope, "BcTableCode") },
                { text: "导入", click: (scope) => sendCode(scope, "BcTableCode") }
            ]
        }
    };
    // 链接
    const tableConfigLink = reactive({
        columnJson: [
            {
                prop: "id",
                label: "编号"
            },
            {
                prop: "benefitName",
                label: "福利名称"
            },
            {
                prop: "benefitUrl",
                label: "链接地址"
            }
        ],
        actionJson: {
            label: "操作",
            btns: [
                (scope) => {
                    return h("div", { onclick: () => openThis(scope, "BcTableLink"), style: setOpenBtnStyle }, scope.row.status == "1" ? "关闭" : "开启");
                },
                { text: "修改", click: (scope) => changeContent(scope, "BcTableLink") },
                { text: "删除", click: (scope) => deteleContent(scope, "BcTableLink") }
            ]
        }
    });
    // 扫码
    const tableConfigScanCode = reactive({
        columnJson: [
            {
                prop: "id",
                label: "编号"
            },
            {
                prop: "benefitName",
                label: "福利名称"
            },
            {
                prop: "benefitUrl",
                label: "二维码图片",
                render(scope) {
                    return h(HeaderImage, { src: that.$config.aliyuncHost + scope.row.benefitUrl });
                }
            }
        ],
        actionJson: {
            label: "操作",
            btns: [
                (scope) => {
                    return h("div", { onclick: () => openThis(scope, "BcTableScanCode"), style: setOpenBtnStyle }, scope.row.status == "1" ? "关闭" : "开启");
                },
                { text: "修改", click: (scope) => changeContent(scope, "BcTableScanCode") },
                { text: "删除", click: (scope) => deteleContent(scope, "BcTableScanCode") }
            ]
        }
    });
    // 券码table
    const addCodeTableConfig = reactive({
        isShowGrid: false,
        columnJson: [
            {
                width: "100px",
                label: "编号",
                prop: "id"
            },
            {
                prop: "benefitCodeInfo",
                label: "券码信息"
            }
        ],
        actionJson: {
            label: "操作",
            btns: [{ text: "删除", click: deteleSingleCode }],
            width: "100px"
        }
    });
    return { tableConfigCode, addCodeTableConfig, tableConfigLink, tableConfigScanCode, addcode, addCodeformDialog, itemData, addCodeform, saveSingleCode };
}
