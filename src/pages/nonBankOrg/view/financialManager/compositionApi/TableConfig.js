import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { selectCPrdIndexInfo } from "../../../apis/index";
export default function (timeLimitUnitList, riskRatingList, areaList, queryForm) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();

    //头部搜索
    const searchData = reactive({
        prdName: "", //产品名称
        prdType: "", //产品类型
        orgId: "", //所属非银机构
        riskLevel: "", //风险等级
        currentPage: 1, //查询当前页
        length: 10, //
        totalSize: 0
    });

    //列表
    const tableData = reactive({
        FormData: [
            {
                id: "", //产品id
                prdName: "", //产品名称
                typeId: "", //产品类型
                orgId: "", //所属非银机构
                period: "", //期限
                periodUnit: "", //期限单位 ???
                rateUnit: "",
                rate: "", //收益率
                minAmount: "", //起购金额（最小/元）
                riskLevel: "", //风险等级
                nationalType: "" //产品区域
            }
        ]
    });

    //列表数据
    const getTableData = (tapSign) => {
        let params = {
            prdName: searchData.prdName, //产品名称
            prdType: searchData.prdType, //产品类型
            orgId: searchData.orgId, //所属非银机构
            riskLevel: searchData.riskLevel, //风险等级
            currentPage: tapSign ? 1 : searchData.currentPage, //查询当前页
            length: tapSign ? 10 : searchData.length
        };
        console.log("查询参数", params);

        selectCPrdIndexInfo(params).then((res) => {
            console.log("列表数据", res);
            res.retList.forEach((item) => {
                timeLimitUnitList.forEach((its) => {
                    if (item.rateUnit == its.id) item["rateUnitName"] = its.name;
                });
                riskRatingList.forEach((its) => {
                    if (item.riskLevel == its.id) item["riskLevelName"] = its.name;
                });
                areaList.forEach((its) => {
                    if (item.nationalType == its.id) item["nationalName"] = its.name;
                });
            });

            tableData.FormData = res.retList;
            // console.log('新造列表数据',res.retList)
            // searchData.currentPage = res.currentPage
            // searchData.length = res.totalCount
            searchData.totalSize = res.totalCount;
        });
    };

    //查询
    const queryBtn = () => {
        console.log("查询");
        getTableData();
    };

    //重置
    const resetBtn = (queryForm) => {
        console.log("重置", queryForm);
        // instance.refs.queryForm.resetFields()
        queryForm.resetFields();
        getTableData(1);
    };

    //编辑
    const handleEdit = (index, row) => {
        // console.log("row",row)
        router.push({ path: "/financialAdd", query: { id: row ? row.id : "" } });
    };

    //删除
    const handleDelete = (index, row) => {
        console.log("删除行", index, row);

        _this
            .$confirm("是否确定删除", "提示", { type: "warning" })
            .then(() => {
                _this.$apis.deleteApi({ id: row.id }).then((res) => {
                    console.log("删除", res);
                    if (res.success) {
                        _this.$msg.success("删除成功");
                        getTableData();
                    }
                });
            })
            .catch(() => {
                _this.$message.info("已取消删除");
            });
    };

    const handleSizeChange = (pageSize) => {
        console.log("pageSize", pageSize);
        if (pageSize) {
            searchData.length = pageSize;
        }
        getTableData();
    };

    const currentChange = (pageNum) => {
        console.log("pageNum", pageNum);
        if (pageNum) {
            searchData.currentPage = pageNum;
        }
        getTableData();
    };

    return {
        searchData,
        tableData,
        queryBtn,
        resetBtn,
        handleEdit,
        handleDelete,
        handleSizeChange,
        currentChange,
        getTableData
    };
}
