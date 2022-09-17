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

//一级机构类型 -- 请求机构类型的树形结构
export const getOrgTypeList = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "cOrgType/selectType?status=3", params, head, false, true);
//请求机构名称
//查询银行名称
// export const getOrgSelect = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/bankBackStageManage/queryOrgNameByBankType", params, head, false, true);
// //查询电子银行名称（直销银行名称）
export const getOrgSelect = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/bankBackStageManage/queryDirectBankNameByBankType", params, head, false, true);

//不计入总资产机构管理列表
// 表格数据
export const getSelectCPrdIndexInfo = (params = "", head = {}) =>
    http.omp.postParse(config.baseUrlHost, "/cNotIncludedInAssetOrg/selectCPrdIndexInfo", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
//新增or修改按钮保存
export const updateSave = (params = "", head = {}) => http.omp.postParse(config.baseUrlHost, "/cNotIncludedInAssetOrg/save", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
// //删除按钮
export const buttonDelete = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/cNotIncludedInAssetOrg/delete", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
