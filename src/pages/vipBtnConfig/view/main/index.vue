<!--  -->
<template>
    <div class="vipBtnConfig">
        <!-- @click="handleAdd('','',tableList.length+1)" -->
        <el-button class="addBtn" size="mini" type="primary" @click="handleAdd('')">新增分区</el-button>
        <!-- {{formModel.formData}} -->
        <div v-for="(item, index) in tableList" :key="index">
            <!-- isFill：true为固定布局 false为流体布局 -->
            <!-- tableConfig.columnJson：列的配置，详细见demo -->
            <!-- @GetApiData：表格列表请求数据事件，该事件触发条件有：刷新、页码变化、页面大小变化，指定页码变化 回调参数：$event.calback 和 $event.query 详细见demo-->

            <!--  BcTable 组件获取数据的方式
      @GetApiData="GetapiData($event,item)" :isAutoGetApiData="false" 这俩搭配用
     :tableConfig="{list:item.memberPageButtons}"  可以直接给tableConfig绑定list值，以为tableConfig方法中，list值为空
     :data="item.memberPageButtons" 不可直接用-->
            <!--如果下面获取数据遍历时，想取到tableConfig的其他值，直接解构：...tableConfig -->
            <!-- :tableConfig="{...tableConfig,list:item.memberPageButtons}" -->

            <!-- // isShowGrid 是否显示网格项； isShowRefresh 是否显示刷新按钮 pageSize:5分页展示条数 isShowPagination 是否显示分页-->
            <BcTable ref="BcTable" :isFill="false" :tableConfig="{ isShowGrid: false, isShowRefresh: false, isShowPagination: false, list: item.memberPageButtons }" style="min-height: 150px">
                <!-- 插槽：操作区 -->
                <template v-slot:action>
                    <p class="fenqu" style="float: left">{{ item.partitionName }}</p>
                    <!-- <p class="fenqu" style="float:left">分区{{index+1}}</p> -->

                    <!-- 一般用于常用操作 或者 tabs按钮 -->
                    <el-button size="mini" type="primary" @click="moveUpClick(item.id, tableList[index - 1].id)" :disabled="index == 0">向上移动</el-button>
                    <el-button size="mini" type="primary" @click="moveDownClick(item.id, tableList[index + 1].id)" :disabled="index == tableList.length - 1">向下移动</el-button>

                    <!-- 一般用于不常用操作 @click="$router.push('/table/add')"跳新增页-->
                    <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                        <el-button size="mini" type="primary" @click="handleAdd(item, '1')">新增按钮</el-button>
                        <!-- <el-button size="mini" type="primary" @click="handleAdd(item,'1',index+1)">新增按钮</el-button> -->
                    </el-button-group>
                </template>

                <!-- 获取数据遍历的方式 ，但遍历后如果单项el-table-column想要做特殊处理，则需要用到tableConfig中的render函数（此函数是BcTable封装的）-->
                <!-- <el-table-column :prop="item.prop" :label="item.label" header-align="center" align="center" 
      v-for="(item,index) in tableConfig.columnJson" :key="index" :width="width">
        <RenderColumnDom :row="scope.row" v-if="scope._self.ctx" :index="scope.$index" :render="item.render"></RenderColumnDom>
      </el-table-column> -->

                <!-- 获取数据，原始标签方式 -->
                <el-table-column prop="buttonName" label="按钮名称" header-align="center" align="center"></el-table-column>
                <el-table-column prop="iconUrl" label="icon" header-align="center" align="center">
                    <template #default="scope">
                        <el-image style="width: 46px; height: 46px; margin-top: 7px" :src="config.aliyuncHost + scope.row.iconUrl"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="subtitleTypeNames" label="副标题文案类型" header-align="center" align="center"></el-table-column>
                <el-table-column prop="subtitleText" label="副标题文案" header-align="center" align="center"></el-table-column>
                <el-table-column prop="orderNum" label="排序" header-align="center" align="center"></el-table-column>
                <el-table-column prop="isRealName" label="是否需要实名" header-align="center" align="center">
                    <template #default="scope">
                        <p v-if="scope.row.isRealName == '1'" size="mini">是</p>
                        <p v-if="scope.row.isRealName == '0'" size="mini">否</p>
                    </template>
                </el-table-column>
                <el-table-column prop="appFlagNames" label="生效渠道" header-align="center" align="center"></el-table-column>
                <el-table-column prop="advPlatform" label="发布设备" header-align="center" align="center">
                    <template #default="scope">
                        <p v-if="scope.row.advPlatform == 'ios,android'" size="mini">苹果,安卓</p>
                        <p v-if="scope.row.advPlatform == 'ios'" size="mini">苹果</p>
                        <p v-if="scope.row.advPlatform == 'android'" size="mini">安卓</p>
                    </template>
                </el-table-column>
                <el-table-column prop="isEnable" label="是否启用" header-align="center" align="center">
                    <template #default="scope">
                        <p v-if="scope.row.isEnable == '1'" size="mini">是</p>
                        <p v-if="scope.row.isEnable == '0'" size="mini">否</p>
                    </template>
                </el-table-column>

                <el-table-column label="操作" fixed="right" header-align="center" align="center">
                    <template #default="scope">
                        <el-button size="mini" type="text" @click="handleAdd(scope.row, '2', item.partitionName)">修改</el-button>
                        <!-- <el-button size="mini" type="text" @click="handleAdd(scope.row,'2',index+1)">修改</el-button> -->
                        <el-button size="mini" type="text" @click="handleDelete(scope.row.id, item.id)">删除</el-button>
                    </template>
                </el-table-column>
            </BcTable>
        </div>
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
    import AddDialog from "./modules/AddDialog";

    // import createTableConfig from "./compositionApi/TableConfig"
    // import SelectData from "./compositionApi/SelectData"
    // js
    import createCheckForm from "./compositionApi/CheckForm";
    import AddForm from "./compositionApi/AddForm";
    import createActionEvent from "./compositionApi/ActionEvent";
    import { t } from "element-plus/lib/locale";
    import config from "../../config/config.index";
    export default {
        components: {
            BcTable,
            AddDialog
        },
        setup() {
            const refAdd = ref(null);
            const instance = getCurrentInstance();
            const _this = instance.appContext.config.globalProperties;
            // json区 tableList假数据
            // const { tableList, } = SelectData()

            // 表格配置区Api
            // const { tableConfig } = createTableConfig();

            // 查询逻辑区Api
            const {
                // queryForm, GetapiData,
                tableList,
                getSelectTMPage
            } = createCheckForm(); //CheckForm
            //弹窗表单数据api
            const { formModel, formRule, submit, handleClose } = AddForm(getSelectTMPage, refAdd); //AddForm
            // 操作区Api
            const { handleAdd, moveUpClick, moveDownClick, handleDelete } = createActionEvent(formModel, getSelectTMPage); //ActionEvent

            onMounted(() => {
                getSelectTMPage(); // 调用列表数据
            });

            return {
                // tableConfig,
                // queryForm, GetapiData,
                tableList,
                getSelectTMPage,
                handleAdd,
                moveUpClick,
                moveDownClick,
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
