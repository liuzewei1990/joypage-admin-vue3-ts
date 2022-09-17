<!--  -->
<template>
    <div class="vipBtnConfig">
        <!-- isFill：true为固定布局 false为流体布局 -->
        <!-- tableConfig.columnJson：列的配置，详细见demo -->
        <!-- @GetApiData：表格列表请求数据事件，该事件触发条件有：刷新、页码变化、页面大小变化，指定页码变化 回调参数：$event.calback 和 $event.query 详细见demo-->

        <!--  BcTable 组件获取数据的方式
      第一种：直接在触发组件中的事件：@GetApiData="GetapiData($event)" :isAutoGetApiData="false"这个值是默认的false 这俩搭配用
      第二种：:tableConfig="{list:tableList}"  可以直接给 tableConfig 绑定一个对象，里面加一个list的key值，因为tableConfig方法中，list值为空,所以可以直接传自己定一个list
      第三种：:data="tableList" 但是不可以直接用
    -->
        <!-- // tableConfig 对象中的key值：isShowGrid 是否显示网格项； isShowRefresh 是否显示刷新按钮 pageSize:5分页展示条数 isShowPagination 是否显示分页 
    list:tableList,total:''这俩值也可以直接在对象中传，也可以在getSelectTMPage方法中的callbank中回调过去-->
        <BcTable
            ref="BcTableRefComponent"
            :isFill="true"
            @GetApiData="getSelectTMPage($event)"
            :tableConfig="{ isShowGrid: true, isShowRefresh: false, isShowPagination: true, pageSize: 10 }"
            style="min-height: 150px">
            <!-- 插槽：查询条件区 -->
            <template #search>
                <!-- BcTableQueryForm继承el-form组件，封装内容：提供了以下两个插槽位，和集成了查询按钮和高级查询popup，提供两个事件：查询按钮事件：@queryBtn 和 重置按钮事件：@resetBtn-->
                <BcTableQueryForm
                    :inline="true"
                    label-position="right"
                    label-width="auto"
                    size="mini"
                    ref="BcTableQueryRefComponent"
                    :model="queryForm"
                    @queryBtn="clickQueryBtn"
                    @resetBtn="clickResetBtn">
                    <!-- 默认插槽：简单查询条件  -->
                    <!-- 1、由于CommonTable设置了最小宽度1136px，一般来说为了不让搜索区域换行，默认插槽渲染个数为3个正常的输入框，或者4个尺寸小点的输入框即可。 -->
                    <!-- 2、如果超出个数可以通过more插槽进入高级搜索中查询，将常用的搜索条件置于默认插槽中。 -->
                    <template #default style="border-bottom: 0">
                        <el-form-item label="机构名称" prop="orgId">
                            <!-- modelType的值可为id，name,obj 指使用该组件下的v-model 的值为id,name还是obj-->
                            <BcSelect modelType="id" itemValueKey="id" itemNameKey="orgName" v-model="queryForm.orgId" @GetApiData="getOrgList" filterable clearable></BcSelect>
                        </el-form-item>
                        <el-form-item label="一级机构类型" prop="type">
                            <!-- itemValueKey="value" itemNameKey="label" 修改默认的值id,name -->
                            <BcSelect modelType="id" itemValueKey="value" itemNameKey="label" v-model="queryForm.type" @GetApiData="getOneOrgTypeList" clearable></BcSelect>
                        </el-form-item>
                    </template>

                    <!-- 高级插槽：更多查询条件 ,如果不需要更多查询条件，删除这个插槽即可-->
                    <!-- <template #more>
          <el-form-item label="帖子状态" prop="oneOrgType">
            <BcSelect modelType="id" v-model="oneOrgType" :list="[{id:1,name:'小青'},{id:2,name:'小白'}]"></BcSelect>
          </el-form-item>
        </template> -->
                </BcTableQueryForm>
            </template>
            <!-- 插槽：操作区 -->
            <template v-slot:action>
                <!-- 一般用于不常用操作 @click="$router.push('/table/add')"跳新增页-->
                <!-- <el-button-group style="margin:0px 10px 0px 0px;"> -->
                <el-button size="mini" type="primary" @click="handleAdd()">新增按钮</el-button>
                <!-- </el-button-group> -->
            </template>

            <!-- 获取数据，原始标签方式 -->
            <el-table-column prop="orgName" label="机构名称" header-align="center" align="center"></el-table-column>
            <el-table-column prop="levelOneOrgTypeName" label="一级机构类型" header-align="center" align="center"></el-table-column>
            <el-table-column prop="assetLink" label="资产链接" header-align="center" align="center"></el-table-column>
            <el-table-column prop="orderyby" label="排序号" header-align="center" align="center"></el-table-column>
            <el-table-column prop="state" label="是否智能展示" header-align="center" align="center">
                <template #default="scope">
                    <p v-if="scope.row.state == '0'" size="mini">是</p>
                    <p v-if="scope.row.state == '1'" size="mini">否</p>
                </template>
            </el-table-column>
            <el-table-column prop="enable" label="是否启用" header-align="center" align="center">
                <template #default="scope">
                    <p v-if="scope.row.enable == '0'" size="mini">是</p>
                    <p v-if="scope.row.enable == '1'" size="mini">否</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" header-align="center" align="center">
                <template #default="scope">
                    <el-button size="mini" type="text" @click="handleAdd(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </BcTable>
        <!-- 新增修改弹窗 -->
        <!--  -->
        <el-dialog :title="formModel.title" width="50%" v-model="formModel.dialogVisible" :before-close="handleClose">
            <AddDialog ref="refAdd" v-if="formModel.dialogVisible" :formData="formModel.formData" :formRule="formRule"></AddDialog>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="mini" @click="formModel.dialogVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="submit">保 存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import { getCurrentInstance, h, onActivated, onMounted, reactive, ref, toRefs, resolveComponent } from "vue";
    import BcTable from "@common/finsuit-components/BcTable";
    import BcTableQueryForm from "@common/finsuit-components/BcTableQueryForm";

    import AddDialog from "./modules/AddDialog";

    // import createTableConfig from "./compositionApi/TableConfig"
    import SelectData from "./compositionApi/SelectData";
    // js
    import createCheckForm from "./compositionApi/CheckForm";
    import AddForm from "./compositionApi/AddForm";
    import createActionEvent from "./compositionApi/ActionEvent";
    import { t } from "element-plus/lib/locale";
    import config from "../../config/config.index";
    export default {
        components: {
            BcTable,
            BcTableQueryForm,
            AddDialog
        },
        setup() {
            const instance = getCurrentInstance();
            const _this = instance.appContext.config.globalProperties;
            // BcTable的模版引用
            const BcTableRefComponent = ref(null);
            // BcTableQueryForm的模版引用
            const BcTableQueryRefComponent = ref(null);
            //新增弹窗的引用
            const refAdd = ref(null);

            // json区 tableList假数据
            const {
                // tableList, //列表数据,本地测试
                getOrgList, //机构名称
                getOneOrgTypeList //一级机构类型
            } = SelectData(); //测试

            // 表格配置区Api
            // const { tableConfig } = createTableConfig();

            // 查询逻辑区Api
            const {
                queryForm, //查询区域数据
                // tableList,  //接口请求回来的列表数据
                clickQueryBtn,
                clickResetBtn,
                getSelectTMPage
            } = createCheckForm(BcTableRefComponent); //CheckForm
            //弹窗表单数据api
            const { formModel, formRule, submit, handleClose } = AddForm(refAdd, BcTableRefComponent); //AddForm
            // 操作区Api
            const { handleAdd, handleDelete } = createActionEvent(formModel, BcTableRefComponent); //ActionEvent

            onMounted(() => {
                console.log("BcTableRefComponent", BcTableRefComponent.value);
                BcTableRefComponent.value.emitGetApiData(); // 调用列表数据
            });

            return {
                BcTableRefComponent,
                // tableConfig,
                getOrgList,
                getOneOrgTypeList,
                queryForm,
                clickQueryBtn,
                clickResetBtn,
                // tableList,
                getSelectTMPage,
                handleAdd,
                handleDelete,
                formModel,
                formRule,
                submit,
                handleClose,
                config,
                refAdd
            };
        }
    };
</script>

<style lang="less" scoped>
    .vipBtnConfig {
        margin: 20px 0;
        .addBtn {
            margin: 0 20px 10px;
        }
    }
    /deep/ .clear-float {
        padding: 10px;
        background-color: #f5f5f5;
    }
    .el-form-item {
        margin-bottom: 0;
    }
    /deep/ .el-select__popper .el-popper .is-light .is-pure {
        width: 200px;
    }
    .addBtn {
        padding: 5px 10px;
    }
    .fenqu {
        padding: 3px 20px 3px 10px;
    }
    .content-footer {
        .el-input__inner {
            width: 100px;
        }
    }
</style>
