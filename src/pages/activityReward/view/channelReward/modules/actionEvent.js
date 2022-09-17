import { getCurrentInstance, reactive, ref } from "vue";
import exportFile from "../../../utils/exportFile";
export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    // 下载excel模板
    const exportTemplatFile = () => {
        exportFile(that.$config.baseUrlHost + "/benefit/benefitExportDailyTemplate");
    };
    return { exportTemplatFile };
}
