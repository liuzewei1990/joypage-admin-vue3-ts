import { h, ref } from "vue";
import { ElButton, ElCol, ElContainer, ElDivider, ElDropdown, ElMessageBox, ElRadio, ElRadioButton, ElRadioGroup, ElRow, ElSpace } from "element-plus";

const Radios = (props, context) => {
    // 读取props配置
    const modelValue = props.modelValue || ref(null);
    const radios = props.radios || [];
    const bottomMassage = props.bottomMassage || "";

    const children = radios.map((item) => {
        return h("div", {}, [
            // radio
            h(
                ElRadioButton,
                {
                    style: { marginRight: "0px" },
                    label: item.value,
                    border: true
                },
                {
                    default: () => item.label
                }
            ),
            // radio 下面info提示
            h(
                "div",
                {
                    style: { fontSize: "13px", color: "#999", margin: "10px 0px" }
                },
                item.tip
            )
        ]);
    });

    return h(
        "div",
        { style: { margin: "10px 0px 0px 0px" } },
        {
            default: () => [
                // radio组 数据绑定
                h(
                    ElRadioGroup,
                    {
                        size: "small",
                        fill: "#F56C6C",
                        textColor: "#fff",
                        modelValue: modelValue.value,
                        "onUpdate:modelValue": (value) => (modelValue.value = value)
                    },
                    {
                        // 间距组件
                        default: () =>
                            h(
                                ElSpace,
                                {
                                    style: { marginLeft: "20px" },
                                    size: 20
                                },
                                {
                                    default: () => children
                                }
                            )
                    }
                ),
                h(
                    "div",
                    {
                        style: { fontSize: "13px", color: "#999", margin: "10px 0px" }
                    },
                    bottomMassage
                )
            ]
        }
    );
};
Radios.props = ["modelValue", "radios", "bottomMassage"];

export default Radios;
