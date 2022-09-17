<template>
    <component :is="tabs[componentVal]" v-model="componentVal"></component>
</template>

<script>
    import index1 from "./index-1.vue";
    import index2 from "./index-2.vue";
    import index3 from "./index-3.vue";
    import { ref, watch, watchEffect } from "vue";
    export default {
        components: { index1, index2, index3 },
        setup() {
            const tabs = {
                1: "index1",
                2: "index2",
                3: "index3"
            };
            const componentVal = ref(window.sessionStorage.channelRewardTabIndex || "1");
            watchEffect(() => {
                window.sessionStorage.channelRewardTabIndex = componentVal.value;
            });
            return {
                tabs,
                componentVal
            };
        }
    };
</script>

<style scoped lang="less"></style>
