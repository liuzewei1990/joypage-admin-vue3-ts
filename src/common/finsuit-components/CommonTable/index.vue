<!-- 内容区通用布局组件,父级需要时flex布局 -->
<template>
    <div class="content-layout" :class="{ fluid: isFill }">
        <!-- 搜索区域 -->

        <el-affix :offset="0" @change="($event) => (isAffix = $event)">
            <div class="content-search" :class="{ 'content-search-affix': isAffix }" v-if="$slots.search">
                <slot name="search"></slot>
            </div>
        </el-affix>
        <!-- 操作区域 -->
        <div class="content-action" v-if="$slots.action">
            <slot name="action"></slot>
        </div>
        <!-- 主体内容区域 -->
        <div class="content-main" ref="ContentMainRefDom">
            <slot></slot>
        </div>
        <!-- 底部footer -->
        <div class="content-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
        <!-- <el-backtop target="body"></el-backtop> -->
    </div>
</template>

<script>
    import "./global-table.css";
    import { ref, nextTick, getCurrentInstance, onMounted } from "vue";
    export default {
        name: "common-table",
        props: {
            isFill: {
                type: Boolean,
                default: false
            }
        },
        emits: ["height"],
        setup(props, ctx) {
            const instance = getCurrentInstance();
            const ContentMainRefDom = ref(null);

            // 动态计算table高度
            const setTableHeight = () => {
                nextTick(() => {
                    let height = document.documentElement.clientHeight - ContentMainRefDom.value.getBoundingClientRect().top - (ctx.slots.footer ? 37 : 0);
                    ctx.emit("height", height);
                });
            };

            /* 挂载之后像父级派发计算后的高度 */
            onMounted(() => {
                if (props.isFill) {
                    setTableHeight();
                    window.addEventListener("resize", setTableHeight);
                }
            });

            const isAffix = ref(false);

            return { ContentMainRefDom, isAffix };
        }
    };
</script>
<style lang="less" scoped>
    //@import url(); 引入公共css类
    .content-layout {
        //   min-width: 1136px;
    }

    .content-search {
        padding: 10px 20px 0;
        box-sizing: border-box;
        background: #fff;
        border-bottom: 1px solid #eee;
    }

    .content-search-affix {
        padding-top: 10px;
        box-shadow: 0px 2px 10px #e2e2e2;
    }

    .content-action {
        padding: 10px 20px;
        box-sizing: border-box;
    }

    .content-main {
        padding: 0px 20px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .content-footer {
        padding-bottom: 2px;
        box-sizing: border-box;
        .pagination {
            float: right;
        }
    }

    //flex布局方案
    .fluid {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: flex;
        flex-direction: column;
        .content-main {
            flex: 1;
            overflow: hidden;
        }
    }
</style>
