<!--  -->
<template>
    <!-- isFill：true为固定布局 false为流体布局 -->
    <!-- tableConfig.columnJson：列的配置，详细见demo -->
    <!-- @GetApiData：表格列表请求数据事件，该事件触发条件有：刷新、页码变化、页面大小变化，指定页码变化 回调参数：$event.calback 和 $event.query 详细见demo-->
    <BcTable ref="BcTableRefComponent" :isFill="true" :tableConfig="tableConfig" @GetApiData="GetapiData">
        <!-- 插槽：查询条件区 -->
        <template #search>
            <!-- BcTableQueryForm继承el-form组件，封装内容：提供了以下两个插槽位，和集成了查询按钮和高级查询popup，提供两个事件：查询按钮事件：@queryBtn 和 重置按钮事件：@resetBtn-->
            <BcTableQueryForm :inline="true" label-position="left" label-width="80px" size="mini" ref="BcTableQueryRefComponent" :model="queryForm" @queryBtn="clickQueryBtn" @resetBtn="clickResetBtn">
                <!-- 默认插槽：简单查询条件  -->
                <!-- 1、由于CommonTable设置了最小宽度1136px，一般来说为了不让搜索区域换行，默认插槽渲染个数为3个正常的输入框，或者4个尺寸小点的输入框即可。 -->
                <!-- 2、如果超出个数可以通过more插槽进入高级搜索中查询，将常用的搜索条件置于默认插槽中。 -->
                <template #default>
                    <el-form-item label="表单一" prop="item1">
                        <el-input placeholder="表单一" v-model="queryForm.item1"></el-input>
                    </el-form-item>

                    <el-form-item label="表单二" prop="item2">
                        <el-input placeholder="表单二" v-model="queryForm.item2"></el-input>
                    </el-form-item>

                    <el-form-item label="表单二" prop="item2">
                        <el-input placeholder="表单二" v-model="queryForm.item2"></el-input>
                    </el-form-item>
                </template>

                <!-- 高级插槽：更多查询条件 ,如果不需要更多查询条件，删除这个插槽即可-->
                <template #more>
                    <el-form-item label="帖子状态" prop="item3">
                        <BcSelect
                            modelType="id"
                            v-model="queryForm.item3"
                            :list="[
                                { id: 1, name: '小青' },
                                { id: 2, name: '小白' }
                            ]"></BcSelect>
                    </el-form-item>
                </template>
            </BcTableQueryForm>
        </template>

        <!-- 插槽：操作区 -->
        <template v-slot:action>
            <!-- 一般用于常用操作 或者 tabs按钮 -->
            <el-button size="mini" type="primary" @click="$router.push('/table/add')">新增</el-button>
            <!-- 一般用于不常用操作 -->
            <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                <el-button size="mini" type="primary" @click="test">操作一</el-button>
                <el-button size="mini" type="primary" @click="test">操作二</el-button>
            </el-button-group>
        </template>
    </BcTable>
</template>

<script setup>
    import { getCurrentInstance, h, onActivated, onMounted, reactive, ref, resolveComponent } from "vue";
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";

    import createTableConfig from "./compositionApi/TableConfig";
    import createActionEvent from "./compositionApi/ActionEvent";
    import createCheckForm from "./compositionApi/CheckForm";

    const instance = getCurrentInstance();
    // BcTable的模版引用
    const BcTableRefComponent = ref(null);
    // BcTableQueryForm的模版引用
    const BcTableQueryRefComponent = ref(null);

    // 查询逻辑区Api
    const { queryForm, GetapiData, clickQueryBtn, clickResetBtn } = createCheckForm(BcTableRefComponent);

    // 操作区Api
    const { test } = createActionEvent();

    // 表格配置区Api
    const { tableConfig } = createTableConfig();

    // 手动触发表格GetapiData事件，首次加载表格数据
    onMounted(() => {
        BcTableRefComponent.value.emitGetApiData(); // 正确的写法
        // instance.refs["BcTableRefComponent"].emitGetApiData() 错误的写法
    });
</script>

<style lang="less" scoped></style>
