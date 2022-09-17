<!-- 已审核的帖子 -->
<template>
    <BcTable ref="BcTable" :isFill="true" :tableConfig="tableConfig" @GetApiData="GetapiData" @selection-change="selectionChange">
        <!-- 审核：查询条件 -->
        <template #search>
            <BcTableQueryForm :inline="true" label-position="left" label-width="80px" size="mini" ref="checkform" :model="queryForm" @queryBtn="clickQueryBtn" @resetBtn="clickResetBtn">
                <!-- 默认：简单查询条件 -->
                <template #default>
                    <!-- {{queryForm}} -->
                    <el-form-item label="识贝ID" prop="userId">
                        <el-input placeholder="根据发帖人识贝ID查询" v-model="queryForm.userId"></el-input>
                    </el-form-item>

                    <el-form-item label="帖子ID" prop="oId">
                        <el-input placeholder="根据帖子ID查询" v-model="queryForm.oId"></el-input>
                    </el-form-item>

                    <el-form-item label="帖子类型" prop="oType">
                        <BcSelect modelType="id" v-model="queryForm.oType" :list="$json.oTypes"></BcSelect>
                    </el-form-item>
                </template>

                <!-- 高级：更多查询条件 -->
                <template #more>
                    <el-form-item label="帖子状态" prop="oStatus">
                        <BcSelect modelType="id" v-model="queryForm.oStatus" :list="$json.oStatus"></BcSelect>
                    </el-form-item>

                    <el-form-item label="审核状态" prop="sStatus">
                        <BcSelect modelType="id" v-model="queryForm.sStatus" :list="$json.sStatus" placeholder></BcSelect>
                    </el-form-item>

                    <el-form-item label="@人" prop="target">
                        <BcSelect modelType="id" v-model="queryForm.target" @GetApiData="getSelectUser" placeholder="模糊搜索" filterable remote></BcSelect>
                    </el-form-item>

                    <el-form-item label="关联产品" prop="prd">
                        <BcSelect modelType="id" v-model="queryForm.prd" @GetApiData="getSelectPrd" placeholder="模糊搜索" filterable remote></BcSelect>
                    </el-form-item>

                    <el-form-item label="被转发贴ID" prop="ooId" label-width="85px">
                        <el-input placeholder="精确查找" v-model="queryForm.ooId"></el-input>
                    </el-form-item>

                    <el-form-item label="评论数量" prop="pNum">
                        <BcNumRange v-model="queryForm.pNum"></BcNumRange>
                    </el-form-item>

                    <el-form-item label="转发数量" prop="zNum">
                        <BcNumRange v-model="queryForm.zNum"></BcNumRange>
                    </el-form-item>

                    <el-form-item label="点赞数量" prop="dNum">
                        <BcNumRange v-model="queryForm.dNum"></BcNumRange>
                    </el-form-item>

                    <el-form-item label="阅读数量" prop="yNum">
                        <BcNumRange v-model="queryForm.yNum"></BcNumRange>
                    </el-form-item>

                    <el-form-item label="发布时间" prop="cTime" label-width="70px">
                        <el-date-picker
                            v-model="queryForm.cTime"
                            type="daterange"
                            :style="{ width: '205px' }"
                            unlink-panels
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :shortcuts="shortcuts"></el-date-picker>
                    </el-form-item>
                </template>
            </BcTableQueryForm>
        </template>

        <!-- 审核：操作 -->
        <template v-slot:action>
            <Tabs v-bind="$attrs"></Tabs>

            <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                <el-button size="mini" type="primary">前端排序</el-button>
                <el-button size="mini" type="primary" @click="quxiaotuijian">取消推荐</el-button>
                <el-button size="mini" type="primary" @click="pinglun">评论</el-button>
                <el-button size="mini" type="primary" @click="zhuanfa">转发</el-button>
                <el-button size="mini" type="primary" @click="fenxiang">分享</el-button>
                <el-button size="mini" type="primary" @click="pinglun_show">评论是否展示</el-button>
                <el-button size="mini" type="primary" @click="up" icon="el-icon-top">上架</el-button>
                <el-button size="mini" type="primary" @click="down" icon="el-icon-bottom">下架</el-button>
            </el-button-group>
        </template>

        <!-- checkbox选择列 -->
        <template v-slot:column-before>
            <el-table-column fixed="left" type="selection" width="40"></el-table-column>
        </template>

        <!-- 按钮操作列 -->
        <!-- <template v-slot:column-after> -->
        <!-- <el-table-column fixed="right" label="操作" width="100"></el-table-column> -->
        <!-- </template> -->
    </BcTable>
</template>

<script setup>
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";
    import BcNumRange from "@common/finsuit-components/BcNumRange";
    import createTableConfig from "../compositionApi/TableConfig";
    import createActionEvent from "../compositionApi/ActionEvent";
    import createCheckForm from "../compositionApi/CheckForm";
    import Tabs from "./Tabs.vue";
    import { getCurrentInstance, h, onActivated, onMounted, reactive, ref, resolveComponent } from "vue";

    const instance = getCurrentInstance();

    // 查询逻辑区
    const { queryForm, GetapiData, clickQueryBtn, clickResetBtn, shortcuts, getSelectPrd, getSelectUser } = createCheckForm();

    // 操作区
    const { selectionChange, reshenhe, pinglun, up, down, zhuanfa, pinglun_show, fenxiang, tuijian, quxiaotuijian, selectItems } = createActionEvent();

    // 表格配置区
    const { tableConfig } = createTableConfig();

    onActivated(() => {
        instance.refs["BcTable"].emitGetApiData();
    });
</script>
<style lang="less" scoped></style>
