import { getCurrentInstance, reactive, ref } from "vue";

import exportFile from "../../../utils/exportFile";

export default function () {
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;
    // 勾选数据
    let selectArr = reactive([]);
    // 选择--勾选框
    const selectionChange = (arg) => {
        selectArr = arg;
    };

    // 导出已勾选
    const exprotTable = () => {
        if (!selectArr.length) {
            that.$message({ type: "warning", message: "请先勾选需要导出的数据!" });
            return;
        }
        const benefitIds = selectArr.map((i) => i.id);
        exportFile(that.$config.baseUrlHost + "/benefit/exportBenefitCodeReceiveListBySelected?benefitIds=" + benefitIds);
    };
    // 导出全部
    const exportAllFlies = (itemData) => {
        exportFile(that.$config.baseUrlHost + "/benefit/exportBenefitCodeReceiveList?benefitConfigId=" + itemData.id);
    };

    return { exprotTable, selectionChange, exportAllFlies };
}
