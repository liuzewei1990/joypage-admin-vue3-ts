/**
 * 项目配置文件
 */
const CONFIG = {
    //开发环境配置
    development: {
        // api host
        // baseUrlHost: "http://192.168.11.172:8080/omp", 世帅本地
        baseUrlHost: "/omp", // 走跨域代理
        // baseUrlHost: "http://easy-mock.liuup.com/mock/5eb8fbc7339f163501d4ffe9/finsuit-admin-joypage",
        // baseUrlHost: "http://easy-mock.liuup.com/mock/612c423b3613fa05c7da776a/activityReward",

        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/"
    },

    //测试环境配置
    productionTest: {
        // api host
        baseUrlHost: window.location.protocol + "//" + window.location.host + (window.location.host.indexOf("finsuitomp") != -1 ? "/finsuit" : "/omp"),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/"
    },

    //生产环境配置
    production: {
        // api host
        baseUrlHost: window.location.protocol + "//" + window.location.host + (window.location.host.indexOf("finsuitomp") != -1 ? "/finsuit" : "/omp"),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/"
    }
};
export default window.$config = CONFIG[process.env.VUE_APP_ENV];
