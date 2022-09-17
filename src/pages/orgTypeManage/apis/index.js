/*
 * @Author: your name
 * @Date: 2021-10-20 10:25:37
 * @LastEditTime: 2021-11-01 14:35:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \finsuit-admin-joypage3.0\src\pages\orgTypeManage\apis\index.js
 */
import http from "@common/finsuit-http/index.js";
import config from "../config/config.index.js";
import * as sxl_interceptors from "@common/finsuit-http/common.interceptors";

/**
 * API统一管理规范
 * @param {Obj} params  请求体参数
 * @param {Obj} head    请求头参数
 * @returns Promise
 */

/* 接口描述 */
export const demo = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/fuisuitSys/v3.0/main", params, head, false, false);

//机构类型管理列表
export const detailListApi = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/cOrgType/selectTwoDatils", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
    // return http.omp.get(config.baseUrlHost, "/cOrgType/selectDatils", params, head, false, true).then(sxl_interceptors.sxl_interceptors)
};
//机构类型 一级机构类型
export const oneDetailListApi = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/cOrgType/selectOneDatils", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
    // return http.omp.get(config.baseUrlHost, "/cOrgType/selectDatils", params, head, false, true).then(sxl_interceptors.sxl_interceptors)
};
//机构类型下拉框
export const orgTypeSelect = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/cOrgType/selectType", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};

//机构类型新增和修改
export const orgTypeSave = (params = {}, head = {}) => {
    return http.omp.postParse(config.baseUrlHost, "/cOrgType/seve", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};

//机构删除
export const orgTypeDelete = (params = "", head = {}) => {
    return http.omp.get(config.baseUrlHost, "/cOrgType/delete", params, head, false, true).then(sxl_interceptors.sxl_interceptors);
};
