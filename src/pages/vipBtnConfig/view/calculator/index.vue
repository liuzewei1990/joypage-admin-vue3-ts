<template>
    <el-tabs v-model="state.activeName" @tab-click="handleClick">
        <el-tab-pane label="期限管理" name="first">
            <TimeLimit v-if="state.currentTab == '期限管理'" :tabType="state.currentTab"></TimeLimit>
        </el-tab-pane>
        <el-tab-pane label="公式管理" name="second">
            <Formula v-if="state.currentTab == '公式管理'" :tabType="state.currentTab"></Formula>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import TimeLimit from "./modules/TimeLimit";
    import Formula from "./modules/Formula";
    import { ref, toRefs, reactive, getCurrentInstance, onMounted } from "vue";
    import index from "./compositionApi/index";

    export default {
        components: { TimeLimit, Formula },
        setup() {
            const { state, handleClick } = index();
            return { state, handleClick };
        }
    };
</script>
<style scoped lang="less">
    /deep/ .el-tabs__nav {
        margin-left: 22px;
    }
</style>
