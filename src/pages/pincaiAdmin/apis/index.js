import http from "@common/finsuit-http/index.js";
import config from "../config/config.index.js";

// 通用成功
export const successful = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/successful", params, head, false, true);
// 上传图片
export const forUpload = (params = {}, head = {}) => http.blog.postFrom("http://localhost:8080/omp", `/finsuitFileUpload/forUpload`, params, head, false, true);

// 热销产品
export const getHotProducts = (params = {}, head = {}) => http.blog.post(config.baseUrlHost, "/blogfinancial/list", params, head, false, false);
// 热销产品新增保存
export const addHotProducts = (params = {}, head = {}) => http.blog.post(config.baseUrlHost, "/blogfinancial/save", params, head, false, false);
// 删除热销产品
export const deleteHotProducts = (params = {}, head = {}) => http.blog.post(config.baseUrlHost, "/blogfinancial/delete", params, head, false, false);

// 活动管理
export const getActivities = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/activityManage", params, head, false, true);
// 活动--位置管理
export const getActivitiesLocal = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/activityManage/location", params, head, false, true);

// export const getContentByContentType = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/homePageConfig/getContentByContentType", params, head, false, true);

// export const getContentByContentType = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/homePageConfig/getContentByContentType", params, head, false, true);

// 投诉类型
export const getComType = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/accuseManage/getContentByContentType", params, head, false, true);

// 投诉数据
export const getTableData = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/accuseManage/geTableData", params, head, false, true);

// 官方账号管理
export const getOfficialAccount = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/userManage/officialAccount", params, head, false, true);

// 官方推荐大V管理
export const getHotAccount = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/userManage/hotAccount", params, head, false, true);

export const getContentByContentType = (params = {}, head = {}) => http.blog.get(config.baseUrlHost, "/homePageConfig/getContentByContentType", params, head, false, true);
