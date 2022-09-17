<!-- 新增热销理财 -->
<template>
    <div class="add-activities">
        <BcPageForm :model="saveForm" title="热销产品" :rules="hotproRules" ref="hotproRulesRef">
            <ItemBox title="活动展示">
                <el-row>
                    <el-form-item label="别名" prop="financialName">
                        <el-input v-model="saveForm.financialName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="iocn">
                        <uploadImg v-model="saveForm.financialIcon"></uploadImg>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="所属机构" prop="financialOrg">
                        <BcSelect v-model="saveForm.financialOrg" modelType="id" placeholderText="请选择机构"></BcSelect>
                    </el-form-item>
                    <el-form-item label="监管沙盒" prop="superviseId">
                        <el-input v-model="saveForm.superviseId"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model="saveForm.sort" autocomplete="off"></el-input>
                    </el-form-item>
                </el-row>
            </ItemBox>

            <ItemBox title="跳转配置">
                <JumpType v-model:jumpType="saveForm.financialType" v-model:jumpContent="saveForm.financialInfo" v-model:pmpId="saveForm.pmpId" v-model:pmpValue="saveForm.pmpType"></JumpType>
            </ItemBox>

            <ItemBox title="发布渠道">
                <ChannelSelect
                    v-model:appFlag="saveForm.appFlag"
                    v-model:device="saveForm.deviceType"
                    v-model:visibleUser="saveForm.visibleType"
                    :visibleUserSelect="$json.activitiesSeeUsers"
                    :appFlagSelect="$json.activitiesChannel"></ChannelSelect>
            </ItemBox>

            <el-button type="primary" size="mini" @click="saveActivities(saveForm, hotproRulesRef)">保存</el-button>
            <el-button size="mini">取消</el-button>
        </BcPageForm>
    </div>
</template>

<script>
    import uploadImg from "@common/finsuit-components/BcUpLoadImg";
    import { BcPageForm, ItemBox } from "@common/finsuit-components/BcPageForm";
    import JumpType from "@common/finsuit-modules/Form/JumpType.vue";
    import ChannelSelect from "@common/finsuit-modules/Form/ChannelSelect.vue";
    import { reactive, ref, watch, getCurrentInstance } from "vue";
    import createGetApi from "./modules/createGetApi";
    import createAddForm from "./modules/addForm";
    export default {
        components: { uploadImg, BcPageForm, ItemBox, JumpType, ChannelSelect },
        setup(props) {
            const instance = getCurrentInstance().appContext.config.globalProperties;

            const { saveActivities } = createGetApi();
            const { saveForm } = createAddForm();
            const hotproRules = {
                financialName: [
                    { required: true, message: "请输入活动名称", trigger: "blur" },
                    { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
                ],
                sort: [{ required: true, message: "请排序", trigger: "blur" }],
                superviseId: [{ required: true, message: "请输入沙盒ID", trigger: "blur" }],
                financialOrg: [{ required: true, message: "请输入机构", trigger: "blur" }]
            };
            const hotproRulesRef = ref(null);
            return {
                saveActivities,
                saveForm,
                hotproRules,
                hotproRulesRef
            };
        }
    };
</script>
<style lang="less" scoped>
    // 上传图片组件
    .el-upload--picture-card {
        width: 100px;
        height: 100px;
    }
</style>
