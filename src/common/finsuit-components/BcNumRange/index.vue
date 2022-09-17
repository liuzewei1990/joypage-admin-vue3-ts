<!--  -->
<template>
    <div class="bc-num-rangebox">
        <el-input v-model="startNum" :style="{ width: '100%' }" @blur="checkVal" clearable type="number" :placeholder="startPlaceholder"></el-input>
        <span>{{ rangeSeparator }}</span>
        <el-input v-model="endNum" :style="{ width: '100%' }" @blur="checkVal" clearable type="number" :placeholder="endPlaceholder"></el-input>
    </div>
</template>

<script>
    import { onMounted, reactive, ref, toRefs, watch, watchEffect } from "vue";

    export default {
        components: {},
        props: {
            rangeSeparator: {
                type: String,
                default: "-"
            },
            startPlaceholder: {
                type: String,
                default: "起始值"
            },
            endPlaceholder: {
                type: String,
                default: "结束值"
            },
            modelValue: {
                type: Array,
                default: []
            }
        },
        setup(props, { emit }) {
            const { modelValue } = toRefs(props);

            const startNum = ref(modelValue.value[0]);
            const endNum = ref(modelValue.value[1]);

            watch(modelValue, (newVal, oldVal) => {
                startNum.value = newVal[0];
                endNum.value = newVal[1];
            });

            watch([startNum, endNum], (newVal) => {
                emit("update:modelValue", newVal);
            });

            // const checkVal = () => {
            //     startNum.value = Number(startNum.value)
            //     endNum.value = Number(endNum.value)
            //     if (endNum.value <= startNum.value) endNum.value = startNum.value
            //     if (endNum.value > startNum.value) startNum.value = startNum.value || 0
            // }

            const checkVal = () => {
                let a = Number(startNum.value) || 0;
                let b = Number(endNum.value) || 0;
                if (b <= a) endNum.value = startNum.value;
                if (b > a) startNum.value = startNum.value || 0;
            };

            return { startNum, endNum, checkVal };
        }
    };
</script>
<style lang="less" scoped>
    .bc-num-rangebox {
        display: flex;
    }
</style>
