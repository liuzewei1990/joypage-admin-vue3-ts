<template>
    <div class="add-box">
        <h2>{{ boxTitle }}</h2>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            boxTitle: String,
            default: ""
        }
    };
</script>

<style lang="less" scoped>
    .add-box {
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 70%;
        margin: 20px auto;
        margin-left: 10%;
        padding: 10px;
        min-height: 70px;
        h2 {
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }
</style>
