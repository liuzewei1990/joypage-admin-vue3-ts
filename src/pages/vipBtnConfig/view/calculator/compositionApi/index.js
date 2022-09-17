import { reactive, ref, onMounted, getCurrentInstance } from "vue";
export default function () {
    const state = reactive({
        activeName: "first",
        currentTab: "期限管理"
    });

    const handleClick = (tab, event) => {
        state.currentTab = tab.props.label;
    };
    return {
        state,
        handleClick
    };
}
