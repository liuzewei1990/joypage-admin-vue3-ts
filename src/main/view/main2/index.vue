<template>
    <section id="root">
        <!-- 下面主体 -->
        <section class="main">
            <!-- 左侧导航 -->
            <div class="left-slide-menu" :class="isCollapse ? 'left-slide-menu-off' : 'left-slide-menu-on'">
                <slideMenu v-if="isInit"></slideMenu>
            </div>

            <!-- 右侧内容 -->
            <div class="right-content" :class="[menuCollapseStatus ? 'el-main-off' : 'el-main-on', { 'el-main-full': isCollapse }]">
                <!-- 上面头部 -->
                <div class="right-content-header">
                    <!-- <Header></Header> -->
                </div>

                <div class="right-content-body">
                    <!-- <BodyTab ref="BodyTab"></BodyTab> -->
                </div>
            </div>
        </section>

        <!-- 辅助工具图标 -->
        <!-- <DevTool v-show="isDevTool" /> -->
    </section>
</template>

<script>
    import { computed, getCurrentInstance } from "vue";
    import { useStore } from "vuex";
    // 左侧Menu菜单
    import slideMenu from "./modules/slideMenu.vue";
    // 右侧TabBody
    import BodyTab from "./modules/bodyTab.vue";

    import Menu from "./compositionApi/Menu";
    export default {
        components: { slideMenu, BodyTab },
        setup() {
            const store = useStore();
            const { init } = Menu();

            init();

            return {
                isCollapse: computed(() => store.state.finsuitStoreConfig.isCollapse),
                isInit: computed(() => store.state.finsuitStoreConfig.isInit),
                menuCollapseStatus: computed(() => store.getters.menuCollapseStatus)
            };
        }
    };
</script>

<style lang="less" scoped>
    @slide-w-on: 264px;
    @slide-w-off: 128px;

    /* 下面主体 */
    .main {
        position: absolute;
        left: 0px;
        right: 0;
        top: 0px;
        bottom: 0;
        width: 100%;
    }

    .left-slide-menu {
        width: @slide-w-off;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        opacity: 1;
        background-color: #2a4266;
        z-index: 1000;
        transition: all 0.5s;
    }

    .right-content {
        position: relative;
        margin-left: @slide-w-off;
        min-width: 800px;
        height: 100vh;
    }

    .right-content-header {
        width: 100%;
        height: 50px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
    }

    .right-content-body {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 50px;
        width: 100%;
        height: calc(100% - 50px);
    }

    /* 左侧收缩 */
    .left-slide-menu-on {
        //   display: block;
    }
    .left-slide-menu-off {
        //   display: none;
        left: -@slide-w-on;
        opacity: 0;
    }

    /* 右侧收缩 */
    .el-main-on {
        margin-left: @slide-w-on;
    }
    .el-main-off {
        margin-left: @slide-w-off;
    }

    .el-main-full {
        margin-left: 0px;
    }
</style>
