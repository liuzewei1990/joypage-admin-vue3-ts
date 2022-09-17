<template>
    <el-upload class="upload-demo-file" name="importFile" :action="`${$config.baseUrlHost}/benefit/importBenefitCodeInfo?benefitConfigId=${itemData.id}`" :on-error="onError" :on-success="onSuccess">
        <el-button size="mini" type="primary">批量导入券码</el-button>
    </el-upload>
</template>

<script>
    import { onMounted } from "@vue/runtime-core";
    export default {
        props: ["itemData"],

        setup(props, { emit }) {
            const onSuccess = async (res) => {
                console.log("onSuccess", res);
                emit("updateTbale");
            };
            const onError = (res) => {
                console.log("onError", res);
            };
            onMounted(() => {
                console.log("itemData", props.itemData);
            });
            return {
                onError,
                onSuccess
            };
        }
    };
</script>

<style lang="less" scoped>
    .iconimg {
        img {
            width: 50px;
            height: 50px;
        }
    }
</style>

<style lang="less">
    .upload-demo-file ul.el-upload-list {
        display: none;
    }
</style>
