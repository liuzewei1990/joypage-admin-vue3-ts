<template>
    <div>
        <tgrat :test="null" :tsfd="false">
            <template #s1>
                <a href=""> a </a>
            </template>
        </tgrat>
        <template>
            <div>dfasfad</div>
        </template>
    </div>
</template>

<script>
    import tgrat from "./t1.vue";
    export default {
        components: { tgrat },
        data() {
            return {};
        },
        created() {},
        mounted() {},
        methods: {}
    };
</script>

<style scoped lang="less"></style>
