<!--  -->
<template>
    <mask-box
        v-model="visible"
        :show-loading="showLoading"
        :title="maskConfig.title"
        :hideOnBlur="maskConfig.hideOnBlur"
        :defaultcloseBtnVisible="maskConfig.defaultcloseBtnVisible"
        :isTransparent="maskConfig.isTransparent"
        @on-show="onShow"
        @on-hide="onHide">
        <div class="container" @click.self="close"></div>
    </mask-box>
</template>

<script>
    import MaskBox from "@common/finsuit-components/MaskBox";
    export default {
        components: { MaskBox },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            showLoading: {
                type: Boolean,
                default: false
            },
            appendElement: {
                type: Boolean,
                default: false
            },
            maskConfig: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {};
        },
        created() {},
        mounted() {},
        //方法集合
        methods: {
            onShow() {
                this.$emit("onShow");
                this.$modalHelper.open(this.appendElement);
            },
            onHide() {
                this.$emit("onHide");
                this.$modalHelper.close(this.appendElement);
            },
            close() {
                if (this.maskConfig.hideOnBlur) this.visible = false;
            }
        }
    };
</script>
<style lang="less" scoped></style>
