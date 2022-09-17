import { reactive, getCurrentInstance } from "vue";
import { orgTypeSelect } from "../../../apis/index";
export default function () {
    const getOrgSelect = async ($event) => {
        let { query, callback } = $event;
        let params = {
            status: "1"
        };
        let data = await orgTypeSelect(params);
        console.log("下拉框数据", data);
        callback({ list: data.dateList });
    };
    return {
        getOrgSelect
    };
}
