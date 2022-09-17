<template>
    <component :is="componentId" v-model="componentId"></component>
</template>

<script>
    import index1 from "./index-1.vue";
    import index2 from "./index-2.vue";
    import { ref } from "vue";
    export default {
        components: { index1, index2 },
        setup() {
            const componentId = ref("index1");
            return {
                componentId
            };
        }
    };
</script>

<style scoped lang="less"></style>
