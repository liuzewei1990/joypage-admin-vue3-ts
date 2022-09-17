<!--  -->
<template>
    <div>
        <!-- :model="formData" ref="refFormData" 这俩值不可以绑定一样的 -->
        <el-form :model="formData" :rules="formRule" ref="elForm" size="small" label-position="left" class="addForm">
            <!-- {{formData}} -->
            <p style="margin-bottom: 18px; color: #409eff" v-if="formData.partitionId == ''">正在新增分区，请设置该分区下按钮，至少设置一个</p>

            <el-form-item label="分区序号：" prop="partitionName">
                <p>{{ formData.partitionName }}</p>
            </el-form-item>
            <el-form-item label="按钮名称：" prop="buttonName">
                <el-input v-model="formData.buttonName" placeholder="请输入 最多8个中文字符，4个英文单词（以英文逗号区分）"></el-input>
            </el-form-item>
            <el-form-item label="icon：" prop="iconUrl">
                <BcUpLoadImg v-model="formData.iconUrl" :limit="1"></BcUpLoadImg>
            </el-form-item>
            <el-form-item label="副标题文案类型：" prop="subtitleType">
                <BcSelect
                    modelType="id"
                    v-model="formData.subtitleType"
                    placeholder="请选择副标题文案类型"
                    @GetApiData="getTextTypeSelect"
                    filterable
                    :autoGetApiData="formData.id ? true : false"
                    clearable></BcSelect>
            </el-form-item>
            <el-form-item label="副标题文案：" prop="subtitleText" v-if="formData.subtitleType == '5'">
                <el-input v-model="formData.subtitleText" placeholder="请输入副标题文案"></el-input>
            </el-form-item>
            <el-form-item label="跳转类型：" prop="contentType">
                <BcSelect modelType="id" v-model="formData.contentType" placeholder="请选择跳转类型" @GetApiData="getJumpTypeSelect" filterable :autoGetApiData="formData.id ? true : false"></BcSelect>
            </el-form-item>
            <el-form-item label="内容：" prop="content" v-if="formData.contentType == 1 || formData.contentType == 2">
                <el-input v-if="formData.contentType == 1" v-model="formData.content" placeholder="请输入链接"></el-input>
                <BcSelect
                    v-if="formData.contentType == 2"
                    modelType="id"
                    itemValueKey="value"
                    v-model="formData.content"
                    placeholder="请选择活动内容"
                    @GetApiData="getActiveContentList"
                    filterable
                    :autoGetApiData="formData.id && formData.contentType == 2 ? true : false"></BcSelect>
            </el-form-item>
            <el-form-item label="排序：" prop="orderNum">
                <el-input v-model.number="formData.orderNum" placeholder="请输入" onkeyup="this.value=parseInt(this.value.replace(/[^\d]/g,''))|0"></el-input>
            </el-form-item>
            <el-form-item label="是否实名：" prop="isRealName">
                <BcSelect modelType="id" v-model="formData.isRealName" placeholder="请选择" :list="isFlageSelect" filterable></BcSelect>
            </el-form-item>
            <el-form-item label="实名提示文案：" prop="realNameTipText" :rules="formData.isRealName == 0 ? [{ required: false }] : [{ required: true, message: '请输入实名提示文案' }]">
                <el-input v-model="formData.realNameTipText"></el-input>
                <!-- <BcEditor v-model="formData.realNameTipText" style="height:282px"></BcEditor> -->
            </el-form-item>
            <el-form-item label="生效渠道：" prop="appFlags">
                <BcSelect modelType="id" v-model="formData.appFlags" placeholder="请选择生效渠道" :list="appFlagSelect" multiple filterable></BcSelect>
            </el-form-item>
            <el-form-item label="发布设备：" prop="advPlatform">
                <BcSelect modelType="id" v-model="formData.advPlatform" placeholder="请选择发布设备" :list="deviceSelect" filterable></BcSelect>
            </el-form-item>
            <el-form-item label="是否启用：" prop="isEnable">
                <BcSelect modelType="id" v-model="formData.isEnable" placeholder="请选择" :list="isFlageSelect" filterable></BcSelect>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import BcUpLoadImg from "@common/finsuit-components/BcUpLoadImg";
    import BcSelect from "@common/finsuit-components/BcSelect";
    import BcEditor from "@common/finsuit-components/BcEditor";
    // import AddForm from "../compositionApi/AddForm"
    import SelectData from "../compositionApi/SelectData";
    import { reactive, toRefs, ref, watch, watchEffect, onMounted } from "vue";

    export default {
        components: {
            BcUpLoadImg,
            BcSelect,
            BcEditor
        },
        props: {
            formData: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            formRule: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        setup(props, context) {
            const elForm = ref(null);
            // watchEffect(() => {
            //     console.log(`props.formDataProps: `,props.formDataProps)
            // })
            // console.log(`222222: `,props.formDataProps)

            // const { formData, formRule, submit } = AddForm(props.formDataProps)
            // console.log('formData',formData)

            const { textTypeSelect, JumpTypeSelect, isFlageSelect, appFlagSelect, deviceSelect, getTextTypeSelect, getJumpTypeSelect, getActiveContentList } = SelectData();

            // console.log('adddialog',isFlageSelect,appFlagSelect)

            return {
                textTypeSelect,
                JumpTypeSelect,
                isFlageSelect,
                appFlagSelect,
                deviceSelect,
                getTextTypeSelect,
                getJumpTypeSelect,
                getActiveContentList,
                elForm
                // formData, formRule, submit
            };
        }
    };
</script>
<style lang="less" scoped>
    // .add{
    //     width: 100%;
    //     height: auto;
    // }
    .addForm {
        /deep/ .el-input__inner {
            width: 100%;
        }
        /deep/ .el-form-item:last-child {
            margin-bottom: 0;
        }
        /deep/ .dialog-footer {
            float: right;
        }
        /deep/ .w-e-text-container {
            height: 200px !important;
        }
    }
</style>
