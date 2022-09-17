import http from "@common/finsuit-http/index.js";
import config from "../config/config.index.js";

/**
 * API统一管理规范
 * @param {Obj} params  请求体参数
 * @param {Obj} head    请求头参数
 * @returns Promise
 */

/**
 * 公共接口
 */

export const getPrdInfoByIdForTeamMng = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actTeam/getPrdInfoByIdForTeamMng", params, head, false, false);

/**
 * 优选
 */

/* 列表 */
export const getTableList = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actInvestMngOmp/getActInvestInfo", params, head, false, false);
/* 新增 */
export const addActInvest = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actInvestMngOmp/addActInvest", params, head, false, false);
/* 删除 */
export const delActInvest = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actInvestMngOmp/delActInvest", params, head, false, false);
/* 修改 */
export const updActInvest = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actInvestMngOmp/updActInvest", params, head, false, false);

/* 银行下拉 */
export const getOrgSelect = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealCoupon/getOrgList", params, head, false, false);
/* 产品下拉 */
export const getPrdSelect = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealCoupon/getPrdListByOrgId", params, head, false, false);
/* 奖励信息下拉 */
export const getRewardInfoSelect = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actInvestMngOmp/getRewardInfoList", params, head, false, false);
/* 获取活动规则 */
export const getActivityRuleListNoPage = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/activityRule/getActivityRuleListNoPage", params, head, false, false);

/**
 * 拼团
 */

/* 列表 */
export const getActTeam = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actTeam/getActTeamInfo", params, head, false, false);
/* 新增 */
export const addActTeam = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actTeam/addActTeam", params, head, false, false);
/* 删除 */
export const delActTeam = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actTeam/delActTeam", params, head, false, false);
/* 修改 */
export const updActTeam = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actTeam/updActTeam", params, head, false, false);

/* 奖励信息下拉 */
export const getActTeamRewardInfoSelect = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actTeam/getRewardInfoList", params, head, false, false);

/**
 * 拼人数
 */

/* 列表 */
export const getActPerson = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actAssemblePerson/getAssemblePersonList", params, head, false, false);
/* 获取拼人数详情 */
export const getActPersonById = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actAssemblePerson/getAssemblePersonById", params, head, false, false);
/* 新增 */
export const addActPerson = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actAssemblePerson/addAssemblePerson", params, head, false, false);
/* 删除 */
export const delActPerson = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actAssemblePerson/delAssemblePerson", params, head, false, false);
/* 修改 */
export const updActPerson = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actAssemblePerson/updateAssemblePerson", params, head, false, false);

/* 奖励信息下拉 */
export const getActPersonRewardInfoSelect = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actAssemblePerson/getRewardInfoList", params, head, false, false);
