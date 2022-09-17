/**
 * 项目配置文件
 */

if (!window.$config) {
    console.error("注意：若使用全局api，需要向window注入window.$config配置信息，包含baseUrlHost与baseUrlPath");
}
const PageConfig = window.$config || {};

/**
 * 项目配置文件
 */

const CONFIG = {
    //开发环境配置
    development: {
        // api host
        baseUrlHost: PageConfig.baseUrlHost,
        // api path
        baseUrlPath: PageConfig.baseUrlPath,
        // 阿里云静态文件地址
        aliyuncHost: PageConfig.aliyuncHost,
        // 产品详情页
        h5DetailPath: "/products/"
    },

    //测试环境配置
    productionTest: {
        // api host
        baseUrlHost: PageConfig.baseUrlHost,
        // api path
        baseUrlPath: PageConfig.baseUrlPath,
        // 阿里云静态文件地址
        aliyuncHost: PageConfig.aliyuncHost,
        // 产品详情页
        h5DetailPath: "/products/"
    },

    //生产环境配置
    production: {
        // api host
        baseUrlHost: PageConfig.baseUrlHost,
        // api path
        baseUrlPath: PageConfig.baseUrlPath,
        // 阿里云静态文件地址
        aliyuncHost: PageConfig.aliyuncHost,
        // 产品详情页
        h5DetailPath: "/products/"
    }
};

export default CONFIG[process.env.VUE_APP_ENV];
