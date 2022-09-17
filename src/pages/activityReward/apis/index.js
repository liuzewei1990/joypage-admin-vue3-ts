import http from "@common/finsuit-http/index.js";
import config from "../config/config.index.js";

// 上传图片
// export const forUpload = (params = {}, head = {}) => http.omp.postFrom("http://localhost:8080/omp", `/finsuitFileUpload/forUpload`, params, head, false, true);

// 导出
export const exprotFiles = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "benefit/exportBenefitCodeReceiveList", params, head, false, true);

// // 获取： 激活码类--链接类---扫码类--table数据
export const getActivitiesTable = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/benefit/getBenefitInfo", params, head, false, false);

// //新增： 激活码类--链接类---扫码类
export const AddActivitiesItem = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/benefit/addBenefitInfo", params, head, false, false);

// //开启/删除/修改： 激活码类--链接类---扫码类
export const changeActivitiesItem = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/benefit/updBenefitInfo", params, head, false, false);

// 批量删除
export const deleteAll = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/benefit/delBenefitInfoByList", params, head, false, false);

// -领用详情
export const getInfoDetail = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/benefit/getReceiveBenefitCodeInfo", params, head, false, false);

// 活动---获取券码table
export const getjihuomaCode = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/benefit/getBenefitCodeInfo", params, head, false, false);
// 活动--删除： 券码列表--券码
export const deleteCode = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/benefit/delBenefitCodeInfo", params, head, false, false);
// 活动--新增： 单个券码--
export const addSingleCode = (params = {}, head = {}) => http.act.post(config.baseUrlHost, "/benefit/addBenefitCodeInfo", params, head, false, false);
