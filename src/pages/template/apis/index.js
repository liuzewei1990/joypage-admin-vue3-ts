import http from "@common/finsuit-http/index.js";
import config from "../config/config.index.js";

/**
 * API统一管理规范
 * @param {Obj} params  请求体参数
 * @param {Obj} head    请求头参数
 * @returns Promise
 */

/* 接口描述 */
export const demo = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/fuisuitSys/v3.0/main", params, head, false, false);

export const getContentByContentType = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/homePageConfig/getContentByContentType", params, head, false, true);

export const selectOrgData = (params = "", head = {}) => http.omp.post(config.baseUrlHost, "/recommendProducts/selectOrgData", params, head, false, true);

export const getInvestmentDataList = (params = "", head = {}) => http.omp.postParse(config.baseUrlHost, "/cInclusiveAdvInvestment/select", params, head, false, true);
// 上传图片
export const forUpload = (params = {}, head = {}) => http.omp.postFrom(config.baseUrlHost, `/finsuitFileUpload/forUpload`, params, head, false, true);

/* 银行下拉 */
export const getOrgSelect = (params = {}, head = {}) => http.omp.postParse(config.baseUrlHost, "/wealCoupon/getOrgList", params, head, false, false);
/* 产品下拉 */
export const getPrdSelect = (params = {}, head = {}) => http.omp.postParse(config.baseUrlHost, "/wealCoupon/getPrdListByOrgId", params, head, false, false);
