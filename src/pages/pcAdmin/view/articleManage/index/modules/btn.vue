<!--  -->
<template>
    <section class="">
        <el-radio v-model="radio1" label="1" border>备选项1</el-radio>
        <el-radio v-model="radio1" label="2" border>备选项2</el-radio>
    </section>
</template>

<script>
    import { ref } from "vue";

    export default {
        components: {},
        setup() {
            const radio1 = ref(false);
            return {
                radio1
            };
        }
    };
</script>
<style lang="less" scoped></style>
