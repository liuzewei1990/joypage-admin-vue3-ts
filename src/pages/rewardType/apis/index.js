import http from "@common/finsuit-http/index.js";
import config from "../config/config.index.js";

/**
 * API统一管理规范
 * @param {Obj} params  请求体参数
 * @param {Obj} head    请求头参数
 * @returns Promise
 */

/* 获取加息奖励、混合奖励、随机奖励 */
export const getRewardList = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealReward/getWealInfo", params, head, false, false);
/* 删除奖励 */
export const delRewardById = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealReward/delRewardInfo", params, head, false, false);
/* 新增奖励 */
export const addReward = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealReward/addRewardInfo", params, head, false, false);
/* 修改奖励 */
export const updReward = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealReward/updRewardInfo", params, head, false, false);

/* 获取周期奖励表格 */
export const getLoopRewardList = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actrewardcycleconfig/getWealCycleInfo", params, head, false, false);
/* 删除周期奖励 */
export const delLoopReward = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actrewardcycleconfig/delActRewardCycleConfig", params, head, false, false);
/* 新增周期奖励 */
export const addLoopReward = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actrewardcycleconfig/addCycleRewardInfo", params, head, false, false);
/* 修改周期奖励 */
export const updLoopReward = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/actrewardcycleconfig/upActRewardCycleConfig", params, head, false, false);

/* 获取活动列表 */
export const getActivityList = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealReward/getActivity", params, head, false, false);
/* 获取任务列表 */
export const getTaskList = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealReward/getTask", params, head, false, false);
/* 获取卡券列表 */
export const getCouponList = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealReward/getCoupon", params, head, false, false);
/* 获取卡券列表 */
export const getWealBenefitByType = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/wealReward/getWealBenefitByType", params, head, false, false);
