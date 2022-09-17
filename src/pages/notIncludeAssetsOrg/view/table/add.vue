<!--  -->
<template>
    <BcPageForm title="新增" :model="form" :rules="formRule" ref="BcPageForm">
        <ItemBox title="Form">
            <pre>{{ form }}</pre>
        </ItemBox>

        <ItemBox title="新增分区/新增按钮">
            <el-row>
                <el-form-item label="新增分区/新增按钮" prop="">
                    <p>正在新增分区，请设置该分区下按钮，至少设置一个</p>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="分区序号" prop="">
                    <p>分区1</p>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="按钮名称" prop="">
                    <el-input v-model="form.name" placeholder="最多8个中文字符，4个英文单词（以英文逗号区分）"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="icon" prop="">
                    <BcUpLoadImg></BcUpLoadImg>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="副标题文案类型" prop="">
                    <BcSelect modelType="id" v-model="form.device" placeholder="副标题文案类型" :list="textTypeSelect" filterable></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="副标题文案" prop="">
                    <el-input v-model="form.name" placeholder="副标题文案"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="跳转类型" prop="">
                    <BcSelect modelType="id" v-model="form.device" placeholder="跳转类型" :list="deviceSelect" filterable></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="内容" prop="">
                    <el-input v-model="form.name" placeholder="副标题文案"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="排序" prop="">
                    <el-input v-model="form.name" placeholder="副标题文案"></el-input>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="是否实名" prop="">
                    <BcSelect modelType="id" v-model="form.device" placeholder="跳转类型" :list="deviceSelect" filterable></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="生效渠道" prop="">
                    <BcSelect modelType="id" v-model="form.device" placeholder="生效渠道" :list="deviceSelect" filterable></BcSelect>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="是否启用" prop="">
                    <BcSelect modelType="id" v-model="form.device" placeholder="是否启用" :list="deviceSelect" filterable></BcSelect>
                </el-form-item>
            </el-row>
        </ItemBox>
        <ItemBox title="使用发布设置业务组件">
            <!-- 使用发布设置业务组件 多重model绑定双向数据流 目前支持三种 渠道:appFlag、设备:device、可见用户:visibleUser， 支持自定义select json 支持移出select 支持插槽位 -->
            <ChannelSelect v-model:appFlag="form.flag" v-model:device="form.device" :visibleUser="false"></ChannelSelect>
        </ItemBox>

        <el-row>
            <el-button size="mini" type="primary" @click="submit">提交</el-button>
            <el-button size="mini" @click="goBack">返回</el-button>
        </el-row>
    </BcPageForm>
</template>

<script setup>
    import { BcPageForm, ItemBox } from "@common/finsuit-components/BcPageForm";
    import PrdSelect from "@common/finsuit-modules/Form/PrdSelect";
    import ChannelSelect from "@common/finsuit-modules/Form/ChannelSelect";
    import BcUpLoadImg from "@common/finsuit-components/BcUpLoadImg";

    import AddForm from "./compositionApi/AddForm";
    import SelectData from "./compositionApi/SelectData";

    const { form, formRule, submit, goBack } = AddForm();
    const { textTypeSelect, appFlagSelect, deviceSelect, getOrgSelect, getPrdSelect } = SelectData();
</script>
<style lang="less" scoped></style>
