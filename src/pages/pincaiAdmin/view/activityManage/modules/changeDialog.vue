<template>
    <el-dialog title="活动位置修改" v-bind="attrs" width="30%" @close="emits('update:modelValue', false)">
        <el-form :model="form" label-position="right" size="mini">
            <el-form-item label="活动位置">
                <BcSelect v-model="form.acctivityLoacl" modelType="id" :list="$json.b.accLoacl" placeholderText="请选择位置"></BcSelect>
            </el-form-item>
            <el-form-item label="活动设备">
                <BcSelect v-model="form.equipment" modelType="id" :list="$json.b.activitiesSheBei" placeholderText="请选择设备"></BcSelect>
            </el-form-item>
            <el-form-item label="投放渠道">
                <BcSelect v-model="form.channel" modelType="id" :list="$json.b.accLoaclChannel" placeholderText="请选择渠道"></BcSelect>
            </el-form-item>

            <el-form-item label="活动数量">
                <el-input v-model="form.acctivityNumber" type="number" max="10" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否开启">
                <el-switch v-model="form.delivery"></el-switch>
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
    import { reactive, ref, watch, useAttrs } from "vue";
    const attrs = useAttrs();

    const prop = defineProps({
        dialogData: {
            type: Object,
            default: () => {}
        }
    });

    const emits = defineEmits(["sureChangeData", "update:modelValue"]);

    const form = reactive({
        acctivityLoacl: "",
        channel: "",
        equipment: "",
        acctivityNumber: "",
        delivery: ""
    });

    watch(
        () => prop.dialogData,
        (newval, oldval) => {
            console.log("dialogData", newval.row);
            const row = newval.row;
            form.acctivityLoacl = row.actLocation;
            form.channel = row.channel;
            form.equipment = row.device;
            form.acctivityNumber = row.actNumber;
            form.delivery = !!row.isOpen;
        }
    );

    const sure = () => {
        console.log(attrs);
        emits("update:modelValue", false);
        emits("sureChangeData", form);
    };
</script>

<style scoped lang="less"></style>
