<template>
    <el-dialog title="新增官方账户" width="30%" @close="emits('update:modelValue', false)">
        <el-form :model="form" label-position="right" size="mini">
            <el-form-item label="昵称">
                <el-input v-model="form.nickName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="识贝ID">
                <el-input v-model="form.sbId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="form.introduction" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="获赞数量">
                <el-input v-model="form.praiseNumber" type="number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <BcSelect v-model="form.sex" modelType="id" :list="$json.b.sex"></BcSelect>
            </el-form-item>
            <el-form-item label="职业">
                <el-input v-model="form.professional" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="地区">
                <region v-model="areaValue" @change="areaChange"></region>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emits('update:modelValue', false)">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
    import region from "../area/region.vue";
    import { reactive, ref, watch, useAttrs } from "vue";

    const attrs = useAttrs();

    const areaValue = ref([]);
    const areaChange = (val) => {
        areaValue.value = val;
    };
    const emits = defineEmits(["sureAddData", "update:modelValue"]);

    const form = reactive({
        nickName: "",
        sbId: "",
        introduction: "",
        praiseNumber: "",
        sex: "",
        professional: "",
        region: areaValue
    });

    const sure = () => {
        emits("update:modelValue", false);
        emits("sureAddData", form);
    };
</script>

<style scoped lang="less"></style>
