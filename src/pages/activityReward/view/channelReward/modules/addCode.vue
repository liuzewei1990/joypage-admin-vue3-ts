<template>
    <BcTable ref="addCode" style="min-width: auto" height="200px" :isFill="false" @GetApiData="getjihuomaCode" :tableConfig="addCodeTableConfig">
        <template v-slot:action>
            <el-button-group style="margin: 0px 10px 0px 0px; display: flex">
                <el-button size="mini" type="primary" @click="addCodeformDialog = true">输入券码</el-button>
                <UploadFile :itemData="itemData" @updateTbale="$refs['addCode'].emitGetApiData()"></UploadFile>
                <el-button size="mini" type="primary" @click="exportTemplatFile">下载模板</el-button>
            </el-button-group>
        </template>
    </BcTable>
    <el-dialog title="新增券码" v-model="addCodeformDialog">
        <el-form :model="addCodeform">
            <el-form-item label="券码信息">
                <el-input v-model="addCodeform.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addCodeformDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveSingleCode(itemData)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
    import BcTable from "@common/finsuit-components/BcTable";
    import UploadFile from "../../../components/uploadFile";
    import createdTableConfig from "./TableConfig-1";
    import createGetApi from "./createGetApi";
    import { onMounted, getCurrentInstance } from "vue";
    import actionEvent from "./actionEvent";

    export default {
        components: {
            BcTable,
            UploadFile
        },
        props: {
            itemData: {
                type: Object,
                default: () => {}
            }
        },
        setup(props, { emit }) {
            const instance = getCurrentInstance();
            const that = instance.appContext.config.globalProperties;

            const { addCodeTableConfig, saveSingleCode, addCodeform, addCodeformDialog } = createdTableConfig();
            const { getjihuomaCode } = createGetApi(props.itemData);
            const { exportTemplatFile } = actionEvent();
            onMounted(() => {
                instance.refs["addCode"].emitGetApiData();
            });

            return {
                addCodeTableConfig,
                addCodeform,
                addCodeformDialog,
                getjihuomaCode,
                saveSingleCode,
                exportTemplatFile
            };
        }
    };
</script>

<style scoped lang="less"></style>
