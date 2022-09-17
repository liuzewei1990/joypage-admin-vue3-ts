import http from "@common/finsuit-http/index.js";
import config from "../config/config.index.js";
import * as common_interceptors from "@common/finsuit-http/common.interceptors";

/**
 * API统一管理规范
 * @param {Obj} params  请求体参数
 * @param {Obj} head    请求头参数
 * @returns Promise
 */

// 理财子新增
export const save = (params = {}, head = {}) => http.omp.postParse(config.baseUrlHost, "/financeChildController/save", params, head, false, true).then(common_interceptors.sxl_interceptors);
// 查询列表
export const query = (params = {}, head = {}) => http.omp.postParse(config.baseUrlHost, "/financeChildController/select", params, head, false, true).then(common_interceptors.sxl_interceptors);
// 通过产品id查询产品所有信息
export const queryById = (params = {}, head = {}) => http.omp.post(config.baseUrlHost, "/financeChildController/selectOne", params, head, false, true).then(common_interceptors.sxl_interceptors);
// 删除产品
export const del = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/financeChildController/delete", params, head, false, true).then(common_interceptors.sxl_interceptors);
// 上下架
export const enabled = (params = {}, head = {}) => http.omp.post(config.baseUrlHost, "/financeChildController/enabled", params, head, false, true).then(common_interceptors.sxl_interceptors);
// 查询产品曲线图列表
export const selectPrdGraphInfo = (params = {}, head = {}) =>
    http.omp.postParse(config.baseUrlHost, "/financeChildController/selectPrdGraphInfo", params, head, false, true).then(common_interceptors.sxl_interceptors);
// 新增理财子产品曲线图单条数据
export const saveRateCurveGraph = (params = {}, head = {}) =>
    http.omp.postParse(config.baseUrlHost, "/financeChildController/saveRateCurveGraph", params, head, false, true).then(common_interceptors.sxl_interceptors);
// 删除曲线图单个数据
export const deletPrdGraphInfo = (params = {}, head = {}) =>
    http.omp.post(config.baseUrlHost, "/financeChildController/deletPrdGraphInfo", params, head, false, true).then(common_interceptors.sxl_interceptors);
// 导入
export const importRateCurveGraph = (params = {}, head = {}) =>
    http.omp.get(config.baseUrlHost, "/financeChildController/importRateCurveGraph", params, head, false, true).then(common_interceptors.sxl_interceptors);
// 导出
export const exportRateCurveGraph = (params = {}, head = {}) =>
    http.omp.get(config.baseUrlHost, "/financeChildController/exportRateCurveGraph", params, head, false, true).then(common_interceptors.sxl_interceptors);

// 币种信息
export const getCurrencyAndOrg = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/currency/getCurrencyAndOrg", params, head, false, false);
