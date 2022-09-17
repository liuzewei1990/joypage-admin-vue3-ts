import { getCurrentInstance, reactive, toRaw } from "vue";

export default function (form) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    //列表假数据
    // const tableList = [
    //     {
    //         partition: {name:"分区1",id: '1'},
    //         children:[
    //             {
    //                 buttonId:'',
    //                 name:'连连赚',
    //                 textType:'固定文案',
    //             },{
    //                 name:'拼团'
    //             },{
    //                 name:'投资有礼'
    //             },{
    //                 name:'每日签到'
    //             }
    //         ],
    //     },{
    //         partition: {name:"分区2",id: '2'},
    //         children:[
    //             {
    //             name:'会员积分'
    //             },{
    //             name:'平台权益'
    //             },{
    //             name:'红包'
    //             },{
    //             name:'卡券'
    //             },{
    //             name:'活动投资记录'
    //             }
    //         ],
    //     },{
    //         partition: {name:"分区3",id: '3'},
    //         children:[
    //             {
    //             name:'排行榜'
    //             },{
    //             name:'知识'
    //             },{
    //             name:'收益计算器'
    //             }
    //         ],
    //     },
    // ]

    //副标题文案类型
    // const textTypeSelect = [{
    //     id: "0",
    //     name: "固定文案"
    // }, {
    //     id: "1",
    //     name: "会员积分"
    // }, {
    //     id: "2",
    //     name: "卡券数量"
    // },{
    //     id: "3",
    //     name: "平台权益金额"
    // },{
    //     id: "4",
    //     name: "红包金额"
    // },{
    //     id: "5",
    //     name: "拼团活动"
    // },{
    //     id: "6",
    //     name: "投资有礼活动"
    // },{
    //     id: "7",
    //     name: "连连赚已邀人数"
    // },{
    //     id: "8",
    //     name: "每日签到"
    // }]
    // //跳转类型
    // const JumpTypeSelect = [{
    //     id: "1",
    //     name: "链接"
    // }, {
    //     id: "2",
    //     name: "活动"
    // },{
    //     id: "3",
    //     name: "会员积分商城"
    // },{
    //     id: "4",
    //     name: "卡券页"
    // },{
    //     id: "5",
    //     name: "平台权益页"
    // },{
    //     id: "6",
    //     name: "红包页"
    // },{
    //     id: "7",
    //     name: "排行榜"
    // },{
    //     id: "8",
    //     name: "知识"
    // },{
    //     id: "9",
    //     name: "会员中心"
    // },{
    //     id: "10",
    //     name: "活动投资记录"
    // }]
    // 是否实名/是否启用
    const isFlageSelect = [
        {
            id: 1,
            name: "是"
        },
        {
            id: 0,
            name: "否"
        }
    ];

    // 渠道select
    const appFlagSelect = [
        {
            id: "BC",
            name: "比财"
        },
        {
            id: "PC",
            name: "拼财"
        },
        {
            id: "PMP",
            name: "小程序"
        },
        {
            id: "YIYE",
            name: "异业"
        }
    ];

    // 设备select
    const deviceSelect = [
        {
            name: "苹果,安卓",
            id: "ios,android"
        },
        {
            name: "苹果",
            id: "ios"
        },
        {
            name: "安卓",
            id: "android"
        }
    ];

    // ......这里如果有本地json的话

    // ...

    // 副标题文案类型
    const getTextTypeSelect = async ($event) => {
        let { query, callback } = $event;
        let params = {};
        let data = await _this.$apis.selectType(params);
        // console.log('getTextTypeSelect',data)
        callback({ list: data.subtitleCopyTypeList });
    };

    // 跳转类型
    const getJumpTypeSelect = async ($event) => {
        let { query, callback } = $event;
        let params = {};
        let data = await _this.$apis.selectType(params);
        callback({ list: data.contentTypeList });
    };

    // 活动跳转类型，的内容
    const getActiveContentList = async ($event) => {
        let { query, callback } = $event;
        let params = {
            pageNum: 1,
            pageSize: 10,
            contentTypeId: "2",
            name: ""
        };
        let data = await _this.$apis.getContentByContentType(params).then((res) => {
            if (res.code == "0") {
                // console.log('getActiveContentList',res.data.data)
                callback({ list: res.data.data });
            }
        });
    };

    // ......这里如果有其他异步json的话

    // ...

    return {
        // textTypeSelect,JumpTypeSelect,
        appFlagSelect,
        deviceSelect,
        isFlageSelect,
        getTextTypeSelect,
        getJumpTypeSelect,
        getActiveContentList
    };
}
