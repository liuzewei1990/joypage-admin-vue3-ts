<!--  -->
<template>
    <div>
        <!-- prdIndexId 父级校验时，在规则中用这个prdIndexId就可以 -->
        <el-form-item label="选择权益" :required="true" :show-message="false"></el-form-item>

        <el-form-item label="">
            <BcSelect v-model="welfareType" :list="$json.welfareTypeSelect" placeholder="请选择" @change="rewardScopeChange"></BcSelect>
        </el-form-item>
        <el-form-item label="" :prop="benefitIdProp">
            <BcSelect :autoGetApiData="welfareTypeId != ''" v-model="welfareTypeId" @GetApiData="$json.getActivitysSelect" :disabled="welfareType == ''" placeholder="请选择活动" filterable></BcSelect>
        </el-form-item>
    </div>
</template>

<script setup>
    import { ref, watch, watchEffect } from "vue";

    const emits = defineEmits(["update:welfareType", "update:welfareTypeId"]);

    const props = defineProps({
        welfareType: {
            default: ""
        },
        welfareTypeProp: {
            default: "welfareType"
        },
        welfareTypeId: {
            default: ""
        },
        welfareTypeIdProp: {
            default: "welfareTypeId"
        }
    });

    // 定义v-model
    const welfareType = ref("");
    const welfareTypeId = ref("");

    // watch props变动 进入数据流
    watchEffect(() => {
        welfareType.value = props.welfareType;
    });
    watchEffect(() => {
        welfareTypeId.value = props.welfareTypeId;
    });

    // watch ref变动 回传数据流
    watch(welfareType, (value) => {
        emits("update:welfareType", value);
    });
    watch(welfareTypeId, (value) => {
        emits("update:welfareTypeId", value);
    });

    // welfareType change时清空rewardScopeId的值
    const rewardScopeChange = () => {
        welfareTypeId.value = "";
    };
</script>
<style lang="less" scoped></style>
