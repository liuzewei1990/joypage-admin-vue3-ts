/**
 * 翻译方法
 * @param {*} target id值： "2" || "BC,PC,PMP"
 * @param {*} selectArrs 原json
 * @returns
 */
export const findSelectTextArr = (target = "", selectArrs = [], opts = { nameKey: "name", valueKey: "id" }) => {
    let targetArrs = (target + "").split(/，|,/);
    return targetArrs.map((key) => (selectArrs.find((item) => item[opts["valueKey"]] == key) || {})[opts["nameKey"]]);
};

/**
 * 解析json串 兼容默认值
 * @param {*} json
 * @returns
 */
export const jsonParse = (json) => {
    try {
        return JSON.parse(json);
    } catch (error) {
        return {};
    }
};

export const isEmpty = (value) => {
    if (value === null || value === "" || value === "undefined" || value === undefined || value === "null") {
        return true;
    } else {
        value = (value + "").replace(/\s/g, "");
        if (value === "") {
            return true;
        }
        return false;
    }
};
