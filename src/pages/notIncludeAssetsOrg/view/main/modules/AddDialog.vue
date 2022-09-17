<!--  -->
<template>
    <div>
        <!-- :model="formData" ref="refFormData" 这俩值不可以绑定一样的 -->
        <el-form :model="formData" :rules="formRule" ref="elForm" size="small" label-position="left" class="addForm">
            <el-form-item label="机构名称：" prop="orgId">
                <!-- autoGetApiData  true：自动触发GetApiData事件请求数据回显操作 false：手动请求 一般回显时设置为true; 组件中默认为false-->
                <BcSelect
                    modelType="id"
                    itemValueKey="id"
                    itemNameKey="orgName"
                    v-model="formData.orgId"
                    placeholder="请选择机构名称"
                    @GetApiData="getOrgList"
                    :autoGetApiData="formData.id ? true : false"
                    filterable
                    clearable></BcSelect>
            </el-form-item>
            <el-form-item label="前端按钮别名：" prop="orgButtonAlias">
                <el-input v-model="formData.orgButtonAlias" placeholder="请输入前端按钮别名"></el-input>
            </el-form-item>
            <el-form-item label="资产链接：" prop="assetLink">
                <el-input v-model="formData.assetLink" placeholder="请输入资产链接"></el-input>
            </el-form-item>
            <el-form-item label="是否智能展示：" prop="state">
                <BcSelect modelType="id" v-model="formData.state" placeholder="请选择是否智能展示" :list="isFlageSelect"></BcSelect>
            </el-form-item>
            <el-form-item label="排序号：" prop="orderyby">
                <el-input v-model="formData.orderyby" placeholder="请输入排序号"></el-input>
            </el-form-item>
            <el-form-item label="版本标识：" prop="ctVer">
                <el-input v-model="formData.ctVer" placeholder="请输入版本标识"></el-input>
            </el-form-item>
            <el-form-item label="是否启用：" prop="enable">
                <BcSelect modelType="id" v-model="formData.enable" placeholder="请选择是否启用" :list="isFlageSelect"></BcSelect>
            </el-form-item>
            <el-form-item label="生效渠道：" prop="appFlags">
                <BcSelect modelType="id" v-model="formData.appFlags" placeholder="请选择生效渠道" :list="appFlagSelect" multiple filterable></BcSelect>
            </el-form-item>
            <!-- <el-form-item label="发布设备：" prop="advPlatform">
                <BcSelect modelType="id" v-model="formData.advPlatform" placeholder="请选择发布设备" :list="deviceSelect" filterable></BcSelect>
            </el-form-item> -->
        </el-form>
    </div>
</template>

<script>
    import BcSelect from "@common/finsuit-components/BcSelect";
    // import AddForm from "../compositionApi/AddForm"
    import SelectData from "../compositionApi/SelectData";
    import { reactive, toRefs, ref, watch, watchEffect, onMounted } from "vue";

    export default {
        components: {
            BcSelect
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
            //下拉框数据
            const { getOrgList, isFlageSelect, appFlagSelect, deviceSelect } = SelectData();

            // console.log('adddialog',getOrgList, isFlageSelect, appFlagSelect, deviceSelect)

            return {
                isFlageSelect,
                appFlagSelect,
                deviceSelect,
                getOrgList,
                elForm
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
