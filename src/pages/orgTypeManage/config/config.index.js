/*
 * @Author: your name
 * @Date: 2021-10-20 10:25:37
 * @LastEditTime: 2021-11-22 16:20:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \finsuit-admin-joypage3.0\src\pages\orgTypeManage\config\config.index.js
 */
/**
 * 项目配置文件
 */
const CONFIG = {
    //开发环境配置
    development: {
        // api host
        baseUrlHost: "/omp",
        // baseUrlHost: "https://app-test4.bicai365.com/omp",
        // baseUrlHost: "http://easy-mock.liuup.com/mock/5eb8fbc7339f163501d4ffe9/finsuit-admin-joypage",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/"
    },

    //测试环境配置
    productionTest: {
        // api host
        baseUrlHost: window.location.protocol + "//" + window.location.host + "/omp",
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/"
    },

    //生产环境配置
    production: {
        // api host
        baseUrlHost: window.location.protocol + "//" + window.location.host + "/finsuit",
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/"
    }
};
export default window.$config = CONFIG[process.env.VUE_APP_ENV];
