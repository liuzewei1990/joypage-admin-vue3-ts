/**
 * 项目配置文件
 */
const CONFIG = {
    //开发环境配置
    development: {
        // api host
        baseUrlHost: "/omp",
        // baseUrlHost: "https://app-test1.bicai365.com/omp",
        // baseUrlHost: " http://easy-mock.liuup.com/mock/613b15c33613fa05c7da77af/vipBtnConfig",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/"
    },

    //测试环境配置
    productionTest: {
        // api host
        // baseUrlHost: (window.location.protocol + '//' + window.location.host) + (window.location.host.indexOf('app-test') != -1 ? "/omp" : '/finsuit'),
        baseUrlHost: window.location.protocol + "//" + window.location.host + "/omp", //单独走测试环境
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/"
    },

    //生产环境配置
    production: {
        // api host
        // baseUrlHost: (window.location.protocol + '//' + window.location.host) + (window.location.host.indexOf('app-test') != -1 ? "/omp" : '/finsuit'),
        baseUrlHost: window.location.protocol + "//" + window.location.host + "/finsuit", //走生产和灰度环境
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/"
        // aliyuncHost: window.location.host.indexOf('finsuitomp') != -1 ? "https://finsuit.oss-cn-beijing.aliyuncs.com/" : "https://finsuit-test.oss-cn-beijing.aliyuncs.com/"
    }
};
export default window.$config = CONFIG[process.env.VUE_APP_ENV];
