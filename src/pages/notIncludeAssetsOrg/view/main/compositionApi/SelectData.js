import { getCurrentInstance, reactive, toRaw } from "vue";

export default function (form) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    //列表假数据
    // const tableList = [
    //     {
    //         id:'111',
    //         orgId:'123',
    //         orgName:'平安银行',
    //         levelOneOrgTypeName:'银行',
    //         assetLink:'www.baidu.com',
    //         state:'1',
    //         orderyby:'1',
    //         ctVer:'2',
    //         enable:'0',
    //         appFlags:'BC,PC',
    //         appFlagsNames:'',
    //     },{
    //         id:'',
    //         orgId:'',
    //         orgName:'',
    //         levelOneOrgTypeName:'非银机构',
    //         assetLink:'',
    //         state:'',
    //         orderyby:'',
    //         ctVer:'',
    //         enable:'',
    //         appFlags:'',
    //         appFlagsNames:'',
    //     },{
    //         id:'',
    //         orgId:'',
    //         orgName:'',
    //         levelOneOrgTypeName:'理财子',
    //         assetLink:'',
    //         state:'',
    //         orderyby:'',
    //         ctVer:'',
    //         enable:'',
    //         appFlags:'',
    //         appFlagsNames:'',
    //     },
    // ]

    // 是否智能展示/是否启用
    const isFlageSelect = [
        {
            id: 1,
            name: "否"
        },
        {
            id: 0,
            name: "是"
        }
    ];

    // 渠道select
    const appFlagSelect = [
        {
            id: "BC",
            name: "识贝比"
        },
        {
            id: "PC",
            name: "识贝拼"
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

    // 机构名称下拉数据
    const getOrgList = async ($event) => {
        let { query, callback } = $event;
        let params = {};
        let data = await _this.$apis.getOrgSelect(params);
        // console.log('getOrgSelect',data.data)
        callback({ list: data.data });
    };

    // 一级机构类型下啦数据
    const getOneOrgTypeList = async ($event) => {
        let { query, callback } = $event;
        let params = {};
        let data = await _this.$apis.getOrgTypeList(params);
        // console.log('dateList',data.datatypeParam.dateList)
        callback({ list: data.datatypeParam.dateList });
    };

    // // 活动跳转类型，的内容
    // const getActiveContentList = async ($event,) => {
    //     let { query, callback } = $event
    //     let params = {
    //         pageNum: 1,
    //         pageSize: 10,
    //         contentTypeId: '2',
    //         name:'',
    //     };
    //     let data = await _this.$apis.getContentByContentType(params).then(res=>{
    //         if(res.code == '0'){
    //             // console.log('getActiveContentList',res.data.data)
    //             callback({ list: res.data.data })
    //         }
    //     });
    // }

    // ......这里如果有其他异步json的话

    // ...

    return {
        // tableList,
        appFlagSelect,
        deviceSelect,
        isFlageSelect,
        getOrgList,
        getOneOrgTypeList
        // getActiveContentList
    };
}
