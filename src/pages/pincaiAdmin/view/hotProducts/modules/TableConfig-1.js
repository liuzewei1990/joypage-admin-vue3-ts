import { getCurrentInstance, reactive, ref, h } from "vue";
import { HeaderImage } from "@common/finsuit-components/BcTable/columnContent";
export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    // 查看内容
    const checkContent = (scope) => {
        console.log(scope);
        that.$router.push({
            path: "/hotProducts/add",
            query: { item: decodeURIComponent(JSON.stringify(scope.row)) }
        });
    };
    // 下架删除
    const deteleContent = async (scope) => {
        const params = [scope.row.id];
        that.$confirm("是否删除?", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(async () => {
                await that.$apis.deleteHotProducts(params);
                that.$message({ type: "success", message: "删除成功!" });
                instance.refs["BcTableProduct"].emitGetApiData();
            })
            .catch(() => {});
    };
    const tableConfig = {
        columnJson: [
            {
                prop: "financialName",
                label: "产品名称"
            },
            {
                prop: "financialIcon",
                label: "icon",
                render: (scope) => {
                    return h(HeaderImage, { src: scope.row.financialIcon }, {});
                }
            },
            {
                prop: "financialInfo",
                label: "产品内容"
            },
            {
                prop: "financialType",
                label: "类型"
            },
            {
                prop: "sort",
                label: "排序"
            },
            {
                prop: "visibleType",
                label: "可见用户",
                render: (sc) => {
                    return that.$utils.findSelectTextArr(sc.row.visibleType, that.$json.activitiesSeeUsers).join("、");
                }
            },
            {
                prop: "financialOrg",
                label: "所属机构"
            },
            {
                prop: "appFlag",
                label: "渠道",
                render: (sc) => {
                    return that.$utils.findSelectTextArr(sc.row.appFlag, that.$json.activitiesChannel).join("、");
                }
            },
            {
                prop: "deviceType",
                label: "设备",
                render: (sc) => {
                    return that.$utils.findSelectTextArr(sc.row.deviceType, that.$json.activitiesSheBei).join("、");
                }
            },
            {
                prop: "superviseId",
                label: "监管沙盒"
            }
        ],
        actionJson: {
            label: "操作",
            btns: [
                { text: "修改", click: checkContent },
                { text: "删除", click: deteleContent }
            ]
        }
    };
    return { tableConfig };
}
