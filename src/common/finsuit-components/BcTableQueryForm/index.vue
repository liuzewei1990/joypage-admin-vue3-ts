<!--  -->
<template>
    <el-form v-bind="$attrs" ref="FormRefComponent">
        <!-- 默认插槽 -->
        <slot>
            <FormItem v-for="(item, key) in formItemJson" :key="key" :prop="key" :config="item"></FormItem>
        </slot>
        <!-- 更多搜索插槽 -->
        <slot name="more" v-if="false"></slot>
        <!-- 按钮插槽 -->
        <slot name="btn">
            <div class="btns">
                <el-button size="mini" type="primary" @click="queryBtn">查询</el-button>
                <el-button size="mini" type="default" @click="resetBtn">重置</el-button>
                <el-button size="mini" type="default" v-if="($slots.default && $slots.more) || (Object.keys(formItemJson).length > 0 && Object.keys(formItemJsonMore).length > 0)" @click="open"
                    >高级搜索</el-button
                >
            </div>
        </slot>
    </el-form>

    <!-- popup弹出层 -->
    <el-drawer size="320px" direction="rtl" :withHeader="false" v-model="modelValue">
        <div class="pop-container">
            <div class="pop-title">高级搜索</div>
            <div class="pop-content">
                <!-- popup的备份form部分 -->
                <el-form v-bind="$attrs" ref="MoreFormRefComponent">
                    <!-- 如果有插槽内容使用插槽的模板 -->
                    <template v-if="$slots.more && $slots.default">
                        <RenderDom v-if="modelValue" :render="render"></RenderDom>
                    </template>
                    <!-- 没有插槽模板使用json配置 -->
                    <template v-else>
                        <FormItem v-for="(item, key) in formItemJson" :key="key" :prop="key" :config="item"></FormItem>
                        <el-divider contentPosition="left">高级搜索</el-divider>
                        <FormItem v-for="(item, key) in formItemJsonMore" :key="key" :prop="key" :config="item"></FormItem>
                    </template>
                </el-form>
            </div>
            <div class="pop-btn">
                <el-button size="mini" type="primary" @click="queryBtn">查询</el-button>
                <!-- <el-button size="mini" type="default" @click="resetBtn">重置</el-button> -->
                <el-button size="mini" type="default" @click="close">关闭</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
    import { getCurrentInstance, h, ref } from "vue";
    import FormItem from "./FormItem.vue";
    import RenderDom from "@common/finsuit-components/BcTable/render-dom.js";
    import { ElDivider } from "element-plus";

    export default {
        components: { RenderDom, FormItem },
        props: {
            /**
             * 可选：普通查询 与 default slot插槽二选一
             */
            formItemJson: {
                type: Object,
                default() {
                    return {
                        /**
                         * 每个一级成员代表了一个查询字段，然后根据这个字段配置组件和数据
                         * 比如：userName这个查询字段，以下为它配置了UI组件
                         */
                        userName: {
                            // 配置一、el-form-item 的 label名称
                            label: "查询条件",
                            // 配置二、要在el-form-item中 渲染组件的名称， 比如：el-input | BcSelect | el-date-picker 等等、、
                            componentName: "el-input",
                            // 配置三、v-model绑定的值
                            modelValue: "",
                            // 配置四、componentName的props
                            attrs: {
                                placeholder: "通过props把我替换掉吧~",
                                style: { width: "180px" }
                            }
                        }
                    };
                }
            },
            /**
             * 可选：高级查询 与 more slot插槽二选一
             */
            formItemJsonMore: {
                type: Object,
                // 配置同上
                default() {
                    return {};
                }
            }
        },
        emits: ["queryBtn", "resetBtn"],
        setup(props, ctx) {
            const instance = getCurrentInstance();

            const FormRefComponent = ref(null);
            const MoreFormRefComponent = ref(null);

            const modelValue = ref(false);

            const render = () => h("div", null, { default: () => [instance.slots.default(), h(ElDivider, { contentPosition: "left" }, { default: () => "高级搜索" }), instance.slots.more()] });
            const open = () => {
                modelValue.value = true;
            };

            const queryBtn = () => {
                ctx.emit("queryBtn");
            };

            const resetBtn = () => {
                FormRefComponent.value && FormRefComponent.value.resetFields();
                MoreFormRefComponent.value && MoreFormRefComponent.value.resetFields();
                ctx.emit("resetBtn");
            };
            const close = () => {
                modelValue.value = false;
            };
            return { FormRefComponent, MoreFormRefComponent, render, modelValue, open, queryBtn, resetBtn, close };
        }
    };
</script>
<style lang="less" scoped>
    .pop-container {
        display: flex;
        height: 100%;
        flex-direction: column;
        height: 100vh;
    }
    .pop-title {
        background: #409eff;
        padding: 20px;
        box-sizing: border-box;
        line-height: 10px;
        color: #fff;
        box-shadow: 0px -5px 15px #888;
    }
    .pop-content {
        /* flex: 1; */
        padding: 20px;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;

        /deep/ .el-input__inner {
            padding: 0 20px 0px 10px;
        }
    }
    .pop-btn {
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
        border-top: 1px solid #f3f3f3;
    }
    .btns {
        float: right;
    }
</style>
