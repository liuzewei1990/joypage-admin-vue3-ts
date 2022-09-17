<!--  -->
<template>
    <div>
        <!-- prdIndexId 父级校验时，在规则中用这个prdIndexId就可以 -->
        <el-form-item label="适用范围" :required="true" :show-message="false"></el-form-item>

        <el-form-item label="" :prop="rewardScopeProp">
            <BcSelect v-model="rewardScope" :list="$json.rewardScopeArr" placeholder="请选择" @change="rewardScopeChange"></BcSelect>
        </el-form-item>
        <el-form-item label="" :prop="rewardScopeIdProp">
            <BcSelect
                v-if="rewardScope == '1'"
                :autoGetApiData="rewardScopeId != ''"
                v-model="rewardScopeId"
                @GetApiData="$json.getActivitysSelect"
                :disabled="rewardScope == ''"
                placeholder="请选择活动"
                filterable></BcSelect>
            <BcSelect
                v-if="rewardScope == '2'"
                :autoGetApiData="rewardScopeId != ''"
                v-model="rewardScopeId"
                @GetApiData="$json.getTaskSelect"
                :disabled="rewardScope == ''"
                placeholder="请选择任务"
                filterable></BcSelect>
        </el-form-item>
    </div>
</template>

<script setup>
    import { ref, watch, watchEffect } from "vue";

    const emits = defineEmits(["update:rewardScope", "update:rewardScopeId"]);

    const props = defineProps({
        rewardScope: {
            default: "1"
        },
        rewardScopeProp: {
            default: "rewardScope"
        },
        rewardScopeId: {
            default: ""
        },
        rewardScopeIdProp: {
            default: "rewardScopeId"
        }
    });

    // 定义v-model
    const rewardScope = ref("");
    const rewardScopeId = ref("");

    // watch props变动 进入数据流
    watchEffect(() => {
        rewardScope.value = props.rewardScope;
    });
    watchEffect(() => {
        rewardScopeId.value = props.rewardScopeId;
    });

    // watch ref变动 回传数据流
    watch(rewardScope, (value) => {
        emits("update:rewardScope", value);
    });
    watch(rewardScopeId, (value) => {
        emits("update:rewardScopeId", value);
    });

    // rewardScope change时清空rewardScopeId的值
    const rewardScopeChange = () => {
        rewardScopeId.value = "";
    };
</script>
<style lang="less" scoped></style>
