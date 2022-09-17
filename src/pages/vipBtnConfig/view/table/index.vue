<!--  -->
<template>
    <div class="content">
        <!-- 新增分区 -->
        <div class="addBtn">
            <!-- <el-button size="mini" type="primary" @click="$router.push('/main/add')">新增分区</el-button> -->
            <el-button size="mini" type="primary" @click="handleAdd()">新增分区</el-button>
        </div>
        <!-- 主体 -->
        <div class="main" v-for="(item, index) in tableList" :key="index">
            <!-- 操作按钮区 -->
            <div class="action">
                <p class="fenqu" style="float: left">分区{{ index + 1 }}</p>
                <el-button size="mini" style="float: left" type="primary" @click="moveUp(item, index)" :disabled="index == 0">向上移动</el-button>
                <el-button size="mini" style="float: left" type="primary" @click="moveDown(item, index)" :disabled="index == tableList.length - 1">向下移动</el-button>
                <el-button style="float: right" size="mini" type="primary" @click="$router.push('/main/add')">新增按钮</el-button>
            </div>
            <!-- 表格内容栏 -->
            <el-table height="auto" size="mini" :data="item.memberPageButtons" style="width: 100%">
                <el-table-column prop="buttonName" label="按钮名称" header-align="center" align="center"></el-table-column>
                <el-table-column prop="iconUrl" label="icon" header-align="center" align="center"></el-table-column>
                <el-table-column prop="subtitleType" label="副标题文案类型" header-align="center" align="center"></el-table-column>
                <el-table-column prop="subtitleText" label="副标题文案" header-align="center" align="center"></el-table-column>
                <el-table-column prop="orderNum" label="排序" header-align="center" align="center"></el-table-column>
                <el-table-column prop="isRealName" label="是否需要实名" header-align="center" align="center"></el-table-column>
                <el-table-column prop="appFlags" label="生效渠道" header-align="center" align="center"></el-table-column>
                <el-table-column prop="isEnable" label="是否启用" header-align="center" align="center"></el-table-column>

                <el-table-column label="操作" fixed="right" header-align="center" align="center">
                    <template #default="scope">
                        <el-button size="mini" type="text" @click="handleAdd(scope.row)">修改</el-button>
                        <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新增弹窗 :title="!dataForm.id ? '新增' : '修改'" :visible.sync="dialogVisible==true"  :before-close="closeDialog"-->
        <AddDialog :dialogVisible="dialogVisible"></AddDialog>
    </div>
</template>

<script>
    import AddDialog from "../main/modules/AddDialog";
    import { ref, toRefs, onMounted, getCurrentInstance, reactive } from "vue";

    import createCheckForm from "./compositionApi/CheckForm";

    import createActionEvent from "./compositionApi/ActionEvent";
    import SelectData from "./compositionApi/SelectData";
    export default {
        components: {
            AddDialog
        },
        setup() {
            const instance = getCurrentInstance();
            const _this = instance.appContext.config.globalProperties;
            // console.log("instance",instance)

            // json区  tableList假数据
            const { tableList } = SelectData();
            // 操作区Api
            const { moveUp, moveDown, handleDelete } = createActionEvent();
            // 接口区
            const { getSelectTMPage } = createCheckForm();

            const state = reactive({
                tableList: tableList,
                dialogVisible: false, //是否展示新增弹窗
                dataForm: {
                    // id:'',
                }
            });

            // const getSelectTMPage = (()=>{
            //   _this.$apis.selectTMPage().then(res=>{
            //     console.log('getSelectTMPage',res)
            //   })
            // })

            const handleAdd = () => {
                state.dialogVisible = true;
            };

            //  const handleDelete =()=>{
            //    console.log('shanchu')
            // }

            // const moveUp = (item,index) => {
            //     _this.$msg.success("向上按钮~");
            //     console.log('向上2222',state.tableList)
            //     let arr1 = state.tableList.slice()
            //     arr1[index] = state.tableList[index-1]
            //     arr1[index-1] = state.tableList[index]
            //     console.log('show', arr1)

            //     state.tableList = arr1
            // }
            // const moveDown = (item,index) => {
            //     _this.$msg.success("向下按钮~");

            //     console.log('向下1111',state.tableList)
            //     let arr1 = state.tableList.slice()
            //     arr1[index] = state.tableList[index+1]
            //     arr1[index+1] = state.tableList[index]
            //     console.log('show', arr1)

            //     state.tableList = arr1
            // }
            onMounted(() => {
                getSelectTMPage();
            });

            return {
                ...toRefs(state),
                moveUp,
                moveDown,
                handleAdd,
                handleDelete,
                getSelectTMPage
            };
        }
    };
</script>
<style lang="less" scoped>
    .content {
        padding: 10px 20px;
        height: 100%;
        .addBtn {
            box-sizing: border-box;
            .el-button {
                margin: 0;
            }
        }
        /deep/ .el-input__inner {
            height: 32px;
            line-height: 32px;
        }
        .el-form-item {
            margin: 0;
        }

        .main {
            height: auto;
            margin: 20px 0;
            box-sizing: border-box;
            overflow: hidden;
            .action {
                height: 50px;
                padding: 5px 20px;
                box-sizing: border-box;
                background-color: #f5f5f5;
                .el-button {
                    margin: 6px 10px;
                }
                .fenqu {
                    line-height: 40px;
                    padding-right: 10px;
                }
            }
        }
    }
</style>
