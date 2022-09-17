<!--  -->
<template>
    <div class="form-item-box">
        <div class="title">
            <span>{{ title }}</span>
            <span class="title-slot">
                <slot name="title"></slot>
            </span>
        </div>
        <div class="box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["title"]
    };
</script>
<style lang="less" scoped>
    .form-item-box {
        padding: 0px 10px 0px;
        border: 1px solid #ededed;
        margin: 10px 0;
        box-shadow: 0px 2px 10px #f0f0f0;

        .title {
            display: flex;
            // background: #fdfdfd;
            line-height: 50px;
            font-size: 16px;
            color: #303133;
            // color: #737373;
            // font-weight: 600;
        }
        .title-slot {
            margin-left: 20px;
        }
    }
</style>
