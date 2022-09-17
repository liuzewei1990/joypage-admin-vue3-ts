<template>
    <BcPageForm :rules="rules" title="链接类" :model="addFormData" ref="detailForm">
        <div class="detail">
            <el-row>
                <el-form-item label="福利名称" prop="benefitName">
                    <el-input v-model="addFormData.benefitName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="链接地址">
                    <el-input v-model="addFormData.benefitUrl"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="开始时间:">
                    <el-date-picker v-model="addFormData.rdate" type="daterange" value-format="YYYY-MM-DD HH:mm:ss" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="兑换流程" style="width: 520px">
                    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8 }" v-model="addFormData.process" autocomplete="off"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="福利描述" style="width: 520px">
                    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8 }" v-model="addFormData.benefitDescribe" autocomplete="off"></el-input>
                </el-form-item>
            </el-row>
        </div>
        <el-divider></el-divider>
        <div class="detail-btn">
            <el-button type="primary" size="mini" @click="detailSave">保存</el-button>
            <el-button size="mini" @click="$router.back()">返回</el-button>
        </div>
    </BcPageForm>
</template>

<script>
    import { BcPageForm, ItemBox } from "@common/finsuit-components/BcPageForm";
    import createGetApi from "./modules/createGetApi";
    export default {
        components: {
            BcPageForm,
            ItemBox
        },
        setup() {
            const { addFormData, detailSave } = createGetApi();
            const rules = {
                benefitName: [{ required: true, message: "请输入名称", trigger: "blur" }]
            };
            return {
                addFormData,
                rules,
                detailSave
            };
        }
    };
</script>

<style lang="less">
    @import "../../assets/elementcss.less";
</style>
