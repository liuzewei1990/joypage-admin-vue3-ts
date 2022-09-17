<template>
    <div>
        <h1>h1</h1>
        <slot name="s1"></slot>
        <h2>h2</h2>
        <slot></slot>
        <h3>h3</h3>
        <slot name="s2"></slot>
    </div>
</template>

<script>
    export default {
        //   props: ["test", "tsfd"],
        data() {
            return {};
        },
        created() {},
        mounted() {
            // console.log(this.$slots.s1);
            console.log(this.$props);
            console.log(this.test);
            console.log(this.tsfd);
            console.log(this.$attrs);
        },
        methods: {}
    };
</script>

<style scoped lang="less"></style>
