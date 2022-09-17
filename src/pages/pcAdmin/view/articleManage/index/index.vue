<!--  -->
<template>
    <keep-alive>
        <component v-bind="$attrs" v-model="activeName" :tabs="tabs" :is="tabs[activeName]"></component>
    </keep-alive>
</template>

<script>
    import { reactive, ref } from "vue";
    import s1 from "./modules/s1.vue";
    import s2 from "./modules/s2.vue";
    import s3 from "./modules/s3.vue";
    export default {
        components: { s1, s2, s3 },
        setup() {
            const tabs = {
                s1: "s1",
                s2: "s2",
                s3: "s3"
            };

            const activeName = ref("s1");
            return { tabs, activeName };
        }
    };
</script>
<style lang="less" scoped></style>
