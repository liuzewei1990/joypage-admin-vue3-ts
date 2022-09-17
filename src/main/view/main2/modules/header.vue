<!-- 头部 -->
<template>
    <section class="header-container">
        <!-- 左侧logo -->
        <div class="block block-left" v-show="isCollapse">
            <img class="logo" width="29" src="../../../assets/images/logo.png" alt="" />
            <span class="title">比财数据</span>
        </div>

        <!-- 中间内容 -->
        <div class="block block-center"></div>

        <!-- 右侧操作按钮 -->
        <div class="block block-right">
            <div class="more-actions">
                <!-- <div class="action-item" @click="clickActionItem('bell')">
          <span class="el-icon-bell"></span>
        </div>
        <div class="action-item" @click="clickActionItem('edit')">
          <span class="el-icon-edit-outline"></span>
        </div> -->
                <div class="action-item" @click="screenfull">
                    <span class="iconfont" :class="isFullscreen ? 'icon-tuichuzhuanhuan' : 'icon-quanping'"></span>
                </div>
            </div>

            <el-dropdown @command="handleCommand">
                <!-- 按钮 -->
                <span class="user-actions">
                    <span class="el-icon-user-solid"></span>
                    <span>{{ userInfo.NAME }}</span
                    ><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <!-- 下拉 -->
                <template #dropdown>
                    <el-dropdown-menu>
                        <!-- <el-dropdown-item command="updata">修改信息</el-dropdown-item> -->
                        <el-dropdown-item command="exit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </section>
</template>

<script>
    import { logout } from "../../../apis/index";
    import screenfull from "screenfull";
    import { mapState, mapActions } from "vuex";
    export default {
        components: {},
        data() {
            return {
                isFullscreen: false
            };
        },
        computed: {
            ...mapState({
                isCollapse: (state) => state.finsuitStoreConfig.isCollapse,
                userInfo: (state) => state.finsuitStoreUserInfo.userInfo
            })
        },
        created() {},
        mounted() {
            if (screenfull.isEnabled) {
                screenfull.on("change", this.change);
            }
        },
        //方法集合
        methods: {
            handleCommand(command) {
                switch (command) {
                    case "exit":
                        console.log(this);
                        this.logout();
                        break;
                    case "updata":
                        break;
                    default:
                        break;
                }
            },

            // 点击功能按钮
            clickActionItem() {
                this.$message({
                    message: "该功能开发中~",
                    type: "error"
                });
            },

            // 全屏变化时
            change() {
                if (screenfull.isEnabled) {
                    this.isFullscreen = screenfull.isFullscreen;
                }
            },

            // 全屏
            screenfull() {
                if (!screenfull.isEnabled) {
                    this.$message({
                        message: "you browser can not work",
                        type: "warning"
                    });
                    return false;
                }
                screenfull.toggle();
            },

            // 退出系统
            async logout() {
                await logout();
                this.$store.dispatch("logout");
            }
        }
    };
</script>
<style lang="less" scoped>
    .header-container {
        display: flex;
        height: 100%;
        color: #606266;
        .block {
            display: flex;
            align-items: center;
        }
        .block-left {
            width: 210px;
            padding-left: 20px;
            .logo {
                margin-right: 10px;
            }
            .min-title {
                font-size: 13px;
                padding-left: 10px;
                padding-top: 4px;
            }
            .title {
                font-weight: 100;
            }
        }
        .block-center {
            flex: 1;
        }
        .block-right {
            width: 400px;
            justify-content: flex-end;
            padding: 0 20px;

            .more-actions {
                display: flex;
                margin: 2px 20px 0;
                .action-item {
                    width: 50px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    cursor: pointer;
                }
            }

            .user-actions {
                cursor: pointer;
            }
        }
    }
</style>
