<template>
    <el-dialog title="设置“查看更多”跳转链接" v-bind="attrs" width="30%" @close="emits('update:modelValue', false)">
        <el-form :model="form" label-position="right" size="mini" :rules="moreLink" ref="moreLink">
            <el-form-item label="类型">
                <BcSelect v-model="form.moreType" modelType="id" :list="$json.b.activitiesType" placeholderText="请选择类型"></BcSelect>
            </el-form-item>
            <template v-if="form.moreType == 2">
                <el-form-item label="小程序原始ID" prop="mpID">
                    <el-input v-model="form.mpID" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="跳转小程序类型" prop="mpType">
                    <el-input v-model="form.mpType" autocomplete="off"></el-input>
                </el-form-item>
            </template>
            <el-form-item label="内容" prop="content" v-else>
                <el-input v-model="form.content" autocomplete="off"></el-input>
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
    import { reactive, ref, getCurrentInstance, useAttrs } from "vue";
    const attrs = useAttrs();
    const instance = getCurrentInstance();
    const that = instance.appContext.config.globalProperties;

    const prop = defineProps({
        dialogData: {
            type: Object,
            default: () => {}
        }
    });

    const emits = defineEmits(["sureSetMoreData", "update:modelValue"]);

    const form = reactive({
        moreType: "1",
        content: "",
        mpID: "",
        mpType: ""
    });

    const moreLink = {
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        mpID: [{ required: true, message: "请输入小程序原始ID", trigger: "blur" }],
        mpType: [{ required: true, message: "跳转小程序类型", trigger: "blur" }]
    };

    const sure = () => {
        instance.refs["moreLink"].validate((valid) => {
            if (!valid) {
                return;
            }
            emits("update:modelValue", false);
            emits("sureChangeData", form);
        });
    };
</script>

<style scoped lang="less"></style>
