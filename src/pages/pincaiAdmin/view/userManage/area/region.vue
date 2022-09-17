<template>
    <div class="block-cascader">
        <!-- <span class="demonstration">默认 click 触发子菜单</span> -->
        <el-cascader v-bind="attrs" :options="areaData"></el-cascader>
    </div>
    <!-- <div class="block">
    <span class="demonstration">hover 触发子菜单</span>
    <el-cascader v-model="value" :options="options" :props="props" @change="handleChange"></el-cascader>
  </div> -->
</template>

<script setup>
    import { markRaw, useAttrs } from "vue";
    import { options } from "./region.js";
    const attrs = useAttrs();
    const areaData = markRaw(options);
</script>

<style>
    .el-cascader {
        width: 100%;
    }
</style>
