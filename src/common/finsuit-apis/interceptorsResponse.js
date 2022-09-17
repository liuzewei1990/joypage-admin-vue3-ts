import Toast from "@common/finsuit-components/Toast";

export const act = function (data) {
    if (data.code == "S_SUCCESS") {
        return data.data || {};
    } else {
        Toast({ message: data.message || "未知错误" });
        return Promise.reject(new Error(data.message));
    }
};

export const omp = function () {};
