<!--  -->
<template>
    <div>
        <el-affix position="top" :offset="0" @change="change" :z-index="1001">
            <el-header class="bc-form-header" :class="{ 'header-shadow': affixShow }">
                <el-page-header @back="$router.back" icon="el-icon-arrow-left" :content="title"></el-page-header>
            </el-header>
        </el-affix>
        <el-main class="bc-form-main">
            <el-form ref="elForm" inline size="mini" v-bind="$attrs">
                <slot></slot>
            </el-form>
        </el-main>
    </div>
</template>

<script>
    import { ref } from "vue";

    export default {
        props: {
            title: {
                type: String,
                default: "标题"
            }
        },
        components: {},
        setup() {
            const elForm = ref(null);

            const affixShow = ref(false);
            const change = (flag) => {
                affixShow.value = flag;
            };

            return { elForm, affixShow, change };
        }
    };
</script>
<style lang="less" scoped>
    .bc-form-header {
        background: rgb(250 250 250);
        display: flex;
        align-items: center;
        transition: all 0.5s;
    }
    .header-shadow {
        box-shadow: 0px 0px 20px #e6e6e6;
        background: rgb(253 253 253);
    }
    .bc-form-main {
        min-width: 888px;
        padding-bottom: 50px;
    }
</style>
