<!--  -->
<template>
    <Tabs :tabs="tabs" v-model="tab" @change="change"></Tabs>
</template>

<script setup>
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";
    import Tabs from "../../components/Tabs";

    const router = useRouter();

    const tab = ref(router.currentRoute.value.name);

    const tabs = reactive([
        {
            name: "加息奖励",
            label: "couponReward"
        },
        {
            name: "混合奖励",
            label: "blendReward"
        },
        {
            name: "随机奖励",
            label: "randomReward"
        },
        {
            name: "周期奖励",
            label: "loopReward"
        }
    ]);

    const change = (routeName) => {
        router.push({ name: routeName });
    };
</script>
<style lang="less" scoped></style>
