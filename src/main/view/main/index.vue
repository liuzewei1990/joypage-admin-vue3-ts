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
                    <Header></Header>
                </div>

                <div class="right-content-body">
                    <BodyTab ref="BodyTab"></BodyTab>
                </div>
            </div>
        </section>

        <!-- 辅助工具图标 -->
        <DevTool v-show="isDevTool" />
    </section>
</template>

<script>
    const defaultMenu = {
        id: "9999",
        text: "概括",
        checked: false,
        attributes: {
            icon: null,
            url: "./main22.html#/home"
        },
        children: []
    };

    import { getMenuList } from "../../apis/index";
    // 右侧Header
    import Header from "./modules/header.vue";
    // 右侧TabBody
    import BodyTab from "./modules/bodyTab.vue";
    // 左侧Menu菜单
    import slideMenu from "./modules/slideMenu.vue";

    // 发开辅助工具
    import DevTool from "../../components/DevTool";
    import { mapState, mapActions, mapGetters } from "vuex";
    export default {
        components: { Header, BodyTab, slideMenu, DevTool },
        data() {
            return {
                isDevTool: false
            };
        },
        computed: {
            ...mapGetters(["menuCollapseStatus"]),
            ...mapState({
                isCollapse: (state) => state.finsuitStoreConfig.isCollapse,
                isInit: (state) => state.finsuitStoreConfig.isInit,
                menuList: (state) => state.finsuitStoreMenuList.menuList,
                menuListCode: (state) => state.finsuitStoreMenuList.menuListCode
            })
        },
        created() {
            this.init();
            this.isShowDevTool();
        },
        methods: {
            ...mapActions(["switchCollapse"]),
            ...mapActions(["addTab", "removeTab", "removeAllTab", "removeOutTab", "switchTab"]),

            //init 入口
            async init() {
                this.getMenuList();
            },

            // 获取权限菜单
            async getMenuList() {
                try {
                    let menuList = [defaultMenu];
                    this.openTab(defaultMenu, 0);
                    menuList = menuList.concat(await getMenuList());
                    this.$store.commit("SET_MENU_LIST", menuList);
                    this.$store.commit("IS_INIT", true);
                } catch (error) {}
                //   this.openTab(menuList[1].children[0].children[0], 1);
            },

            // 打开默认tab
            openTab(target, pid) {
                let tabObj = {
                    pid: pid,
                    id: target.id,
                    href: target.attributes.url,
                    icon: target.attributes.icon,
                    title: target.text
                };
                this.addTab(tabObj);
            },

            // 是否显示开发辅助工具
            isShowDevTool() {
                this.isDevTool = this.$route.query["dev"] === "true";
            }
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
