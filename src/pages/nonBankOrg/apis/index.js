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
export const demo = (params = {}, head = {}) => {
    return http.omp.get(config.baseUrlHost, "/fuisuitSys/v3.0/main", params, head, false, false);
};
/**非银机构新增和修改*/
export const nonOrgSave = (params = {}, head = {}) => {
    return http.omp.postParse(config.baseUrlHost, "/cPrdNonBank/save", params, head, false, true);
};
/**非银机构列表*/
export const selectCPrdIndexInfo = (params = {}, head = {}) => {
    return http.omp.postParse(config.baseUrlHost, "/cPrdNonBank/selectCPrdIndexInfo", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};
/**非银机构下拉框*/
export const getOrgSelectApi = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/nonBankInstitutions/selectNonBank", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};
/**非银机构修改展示*/
export const checkNonPrdApi = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/cPrdNonBank/senonSilverProducts", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};
/**非银机构删除*/
export const deleteApi = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/cPrdNonBank/delete", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};
