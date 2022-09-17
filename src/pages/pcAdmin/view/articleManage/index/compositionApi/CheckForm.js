import { getCurrentInstance, reactive, ref, toRaw } from "vue";

export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 查询条件
    const queryForm = reactive({
        // 发帖人识贝ID
        userId: "",
        // 原帖ID
        oId: "",
        // 帖子类型
        oType: "",

        // 帖子状态
        oStatus: "",
        // 关联产品
        prd: "",
        // @人
        target: "",
        // 审核状态
        sStatus: "",
        // 发布时间
        cTime: [],
        // 评论数量
        pNum: [],
        // 转发数量
        zNum: [],
        // 点赞数量
        dNum: [],
        // 阅读数量
        yNum: [],
        // 被转发贴ID
        ooId: ""
    });

    // 查询产品select
    const getSelectPrd = ($event) => {
        _this.$msg.fail("调接口查询");
        const { query, callback } = $event;
        const params = {};
    };

    // 查询用户select
    const getSelectUser = ($event) => {
        _this.$msg.fail("调接口查询");
        const { query, callback } = $event;
        const params = {};
    };

    // 查询按钮
    const clickQueryBtn = () => {
        instance.refs["BcTable"].startQueryBtn();
    };

    // 重置按钮
    const clickResetBtn = () => {
        instance.refs["BcTable"].resetQueryBtn();
    };

    // 日期快捷查询
    const shortcuts = [
        {
            text: "最近一周",
            value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
            }
        },
        {
            text: "最近一个月",
            value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
            }
        },
        {
            text: "最近三个月",
            value: () => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
            }
        }
    ];

    // 获取表格数据
    const GetapiData = async ($event) => {
        try {
            let { query, callback } = $event;
            console.log("查询条件：", toRaw(queryForm));
            const params = { ...query, ...queryForm };
            const data = await _this.$apis.getTableData(params);
            console.log("接口结果：", data);
            callback({ list: data.retList, total: data.totalCount });
        } catch (error) {
            _this.$msg.error("获取数据异常");
        }
    };

    return {
        queryForm,
        GetapiData,
        clickQueryBtn,
        clickResetBtn,
        shortcuts,
        getSelectPrd,
        getSelectUser
    };
}
