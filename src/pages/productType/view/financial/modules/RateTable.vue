<!--  -->
<template>
    <section class="table-box">
        <el-radio-group class="my-radio" v-model="type">
            <el-radio label="1">七日年化收益</el-radio>
            <el-radio label="2">固定收益</el-radio>
        </el-radio-group>
        <keep-alive>
            <component :is="types[type]" :rateCurveGraphType="type" :prdIndexId="attrs.prdIndexId"></component>
        </keep-alive>
    </section>
</template>

<script setup>
    import { ref, reactive, getCurrentInstance, useAttrs, useSlots, watchEffect, watch } from "vue";
    import RateTableA from "./RateTable-A.vue";
    import RateTableB from "./RateTable-B.vue";
    import { default as SelectData, rateCurveGraphTypeList, riskLevelList, rateUnitList, isSupervisionList, nationalTypeList, bankDockTypeList } from "../compositionApi/SelectData";
    const attrs = useAttrs();
    const types = reactive({
        1: RateTableA,
        2: RateTableB
    });
    const type = ref(attrs.rateCurveGraphType);
    console.log("执行了");
</script>
<style lang="less" scoped>
    .table-box {
        position: relative;
        //   border: 1px solid red;
    }
    .my-radio {
        position: absolute;
        left: 20px;
        top: 20px;
        z-index: 10;
    }
</style>
