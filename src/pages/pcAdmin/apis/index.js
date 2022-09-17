import http from "@common/finsuit-http/index.js";
import config from "../config/config.index.js";

// config.baseUrlHost = "http://easy-mock.liuup.com/mock/611db5a63613fa05c7da773f/articleManage";

/* 接口描述 */
export const getTableData = (params = {}, head = {}) => http.omp.get(config.baseUrlHost, "/list", params, head, false, false);
