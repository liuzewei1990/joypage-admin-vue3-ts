<!-- 新增活动管理 -->
<template>
    <div class="add-activities">
        <BcPageForm :model="form" :rules="acctivityRules" ref="acctivityRulesRef">
            <ItemBox title="活动展示">
                <el-row>
                    <el-form-item label="名称" prop="actName">
                        <el-input v-model="form.actName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="iocn">
                        <!-- <uploadImg v-model="form.icon"></uploadImg> -->
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="位置">
                        <BcSelect v-model="form.local" modelType="id" :list="$json.b.accLoacl" placeholderText="请选择位置"></BcSelect>
                    </el-form-item>
                    <el-form-item label="是否在首页热门活动展示">
                        <el-switch v-model="form.isShow"></el-switch>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="排序" prop="orderBy">
                        <el-input v-model="form.orderBy" autocomplete="off"></el-input>
                    </el-form-item>
                </el-row>
            </ItemBox>

            <ItemBox title="跳转配置">
                <el-row>
                    <el-form-item label="类型">
                        <BcSelect v-model="form.type" modelType="id" :list="$json.b.activitiesType" placeholderText="请选择类型"></BcSelect>
                    </el-form-item>
                    <el-form-item label="内容" prop="actContent">
                        <el-input v-model="form.actContent" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="小程序原始ID" prop="mpID">
                        <el-input v-model="form.mpID" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="跳转小程序类型" prop="mpType">
                        <el-input v-model="form.mpType" autocomplete="off"></el-input>
                    </el-form-item>
                </el-row>
            </ItemBox>
            <ItemBox title="发布配置">
                <el-row>
                    <el-form-item label="投放渠道">
                        <BcSelect v-model="form.channel" modelType="id" :list="$json.b.accLoaclChannel" placeholderText="请选择渠道" disabled></BcSelect>
                    </el-form-item>
                    <el-form-item label="设备">
                        <BcSelect v-model="form.device" modelType="id" disabled :list="$json.b.activitiesSheBei" placeholderText="请选择设备"></BcSelect>
                    </el-form-item>
                </el-row>
            </ItemBox>
            <el-button type="primary" size="mini" @click="saveActivities(form, acctivityRulesRef)">保存</el-button>
            <el-button size="mini">取消</el-button>
        </BcPageForm>
    </div>
</template>

<script setup>
    import uploadImg from "../../components/upImg/uploadImg.vue";
    import modulesBox from "./modules/modulesbox.vue";
    import { BcPageForm, ItemBox } from "@common/finsuit-components/BcPageForm";
    import { reactive, ref, watch, getCurrentInstance } from "vue";
    const instance = getCurrentInstance().appContext.config.globalProperties;
    import createGetApi from "./modules/createGetApi";

    const { saveActivities } = createGetApi();
    const form = reactive({
        isShow: 1,
        channel: "1",
        local: "1",
        orderBy: "",
        type: "1",
        icon: "",
        actName: "",
        device: "1",
        actContent: "",
        mpID: "",
        mpType: ""
    });
    const acctivityRules = {
        actName: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        orderBy: [{ required: true, message: "请排序", trigger: "blur" }],
        actContent: [{ required: true, message: "请输入内容", trigger: "blur" }],
        mpID: [{ required: true, message: "请输入小程序原始ID", trigger: "blur" }],
        mpType: [{ required: true, message: "跳转小程序类型", trigger: "blur" }]
    };
    const acctivityRulesRef = ref(null);
</script>
<style lang="less" scoped>
    // 上传图片组件
    .el-upload--picture-card {
        width: 100px;
        height: 100px;
    }
</style>
