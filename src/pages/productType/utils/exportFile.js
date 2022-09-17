import { getCurrentInstance } from "vue";

export default function (url, options = {}) {
    let iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.src = url;
    iframe.id = "menuFrame";
    iframe.style.position = "absolute";
    iframe.style.left = "-1000px";
    iframe.style.bottom = "0px";
    iframe.height = "1px";
    iframe.width = "100%";
}
