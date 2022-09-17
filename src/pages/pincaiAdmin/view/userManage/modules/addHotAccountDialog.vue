<template>
    <el-dialog title="新增推荐大V用户" width="70%" @close="emits('update:modelValue', false)">
        <el-form size="mini" :inline="true">
            <el-form-item label="识贝ID：">
                <el-input v-model="form.sbid"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="6">
                <div class="elcol-text">会员ID：31231</div>
            </el-col>
            <el-col :span="6">
                <div class="elcol-text">昵称：我说昵称</div>
            </el-col>
            <el-col :span="6">
                <div class="elcol-text">识贝ID：3123</div>
            </el-col>
            <el-col :span="6">
                <div class="elcol-text">地区：北京</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <div class="elcol-text">性别：男</div>
            </el-col>
            <el-col :span="6">
                <div class="elcol-text">注册时间：2020-1-1</div>
            </el-col>
            <el-col :span="6">
                <div class="elcol-text">会员积分：312</div>
            </el-col>
            <el-col :span="6">
                <div class="elcol-text">粉丝数量：312</div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <div class="elcol-text">关注数量：421</div>
            </el-col>
            <el-col :span="6">
                <div class="elcol-text">获赞数量：4123</div>
            </el-col>
            <el-col :span="6">
                <div class="elcol-text">视频数量：3213</div>
            </el-col>
            <el-col :span="6">
                <div class="elcol-text">帖子数量：312321</div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <div class="elcol-text">职业：s产品</div>
            </el-col>
            <el-col :span="18">
                <div class="elcol-text">简介：我说ffsfsdfs简介我说fdfsfsdfs简介我说fdfsfsdfs简介我说fdfsfsdfs简介</div>
            </el-col>
        </el-row>
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

    const areaValue = ref([]);

    const emits = defineEmits(["sureAddVData", "update:modelValue"]);

    const form = reactive({
        sbid: ""
    });

    const sure = () => {
        emits("update:modelValue", false);
        emits("sureAddVData", form);
    };
</script>

<style scoped lang="less">
    .elcol-text {
        line-height: 2;
        font-size: 14px;
        color: #606266;
    }
</style>
