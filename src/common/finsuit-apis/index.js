import http from "@common/finsuit-http/index.js";
// import * as interRes from "./interceptorsResponse.js"
import config from "@common/finsuit-config/config.index.js";

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

/**
 * 公共接口
 *
 */

// 跳转类型
export const getJumpType = (params = {}, head = {}) => http.omp.postParse(config.baseUrlHost, "/recommendProducts/getAvailableUser", params, head, false, true);
/* 银行下拉 */
export const getOrgSelect = (params = {}, head = {}) => http.omp.postParse(config.baseUrlHost, "/wealCoupon/getOrgList", params, head, false, false);
/* 产品下拉 */
export const getPrdSelect = (params = {}, head = {}) => http.omp.postParse(config.baseUrlHost, "/wealCoupon/getPrdListByOrgId", params, head, false, false);
