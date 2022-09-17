import http from "@common/finsuit-http/index.js";
import config from "../config/config.index.js";
import * as sxl_interceptors from "@common/finsuit-http/common.interceptors";
/**
 * API统一管理规范
 * @param {Obj} params  请求体参数
 * @param {Obj} head    请求头参数
 * @returns Promise
 */
/**
 * get/post的6个参数为
 * @param {*} baseURL 基础url
 * @param {*} url path路径
 * @param {*} data 请求体数据
 * @param {*} headers 请求头
 * @param {*} isLoading 是否需要loading
 * @param {*} isGetCode 是否需要code   //用 true 的时候 可以加.then(sxl_interceptors.sxl_interceptors)
 */

/* 接口描述 */
// export const demo = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/fuisuitSys/v3.0/main", params, head, false, false);

//会员页按钮配置列表
// 表格数据
export const selectTMPage = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/tMemberPagePartition/selectTMPage", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
//跳转类型，副标题类型下拉框
export const selectType = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/tMemberPagePartition/typeQuery", params, head, false, true);
//跳转类型为活动时候，请求活动类型的内容
export const getContentByContentType = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/advert/getContentByContentType", params, head, false, true);

//新增分区初始值分区查询
export const partitionSelect = (params = "", head = {}) => http.omp.get(config.baseUrlHost, "/tMemberPagePartition/select", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
//新增分区保存
export const partitionSave = (params = "", head = {}) => http.omp.postParse(config.baseUrlHost, "/tMemberPagePartition/save", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
//新增or修改按钮保存
export const buttonSave = (params = "", head = {}) => http.omp.postParse(config.baseUrlHost, "/tMemberPageButton/save", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
//上移
export const moveUp = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/tMemberPagePartition/moveUp", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
//下移
export const moveDown = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/tMemberPagePartition/moveDown", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
//删除按钮
export const buttonDelete = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/tMemberPageButton/delete", params, head, false, true).then(sxl_interceptors.sxl_interceptors);

//计算器
//期限管理列表
export const timeLimitList = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/tRevenueCalculator/select", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};
//新增or修改期限配置
export const timeLimitSave = (params = {}, head = {}) => {
    return http.omp.postParse(config.baseUrlHost, "/tRevenueCalculator/seve", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};
//删除期限配置
export const timeLimitDelete = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/tRevenueCalculator/delete", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};
//公式管理
export const formulaList = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/tRevenueCalculator/selectRate", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};
//修改公式管理
export const formulaUpdate = (params = {}, head = {}) => {
    return http.omp.postParse(config.baseUrlHost, "/tRevenueCalculator/update", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};

// 上传图片
// export const forUpload = (params = {}, head = {}) => http.omp.postFrom(config.baseUrlHost, `/finsuitFileUpload/forUpload`, params, head, false, true);

//mock数据
// export const selectTMPage = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/finsuit/list", params, head, false, true).then(sxl_interceptors);
// export const selectType = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/finsuit/select", params, head, false, true);
// export const getContentByContentType = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/finsuit/selectType", params, head, false, true);
