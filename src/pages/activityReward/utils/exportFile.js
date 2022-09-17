import { getCurrentInstance } from "vue";

export default function (url, options = {}) {
    const formEl = document.createElement("form");
    // 创建form
    formEl.id = "formEl";
    formEl.name = options.formName || "formName";
    formEl.method = options.method || "POST";
    formEl.action = url;
    document.body.appendChild(formEl);
    // 创建input---传递单个参数，多个参数地址拼接
    const inp = document.createElement("input");
    inp.type = "text";
    inp.name = options.inputName || "inpName";
    inp.value = options.inputVaule || "1234";
    formEl.appendChild(inp);
    formEl.submit();
    document.body.removeChild(formEl);
}
