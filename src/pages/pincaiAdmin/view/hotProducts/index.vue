<!-- 热销产品 -->
<template>
    <section class="">
        <BcTable ref="BcTableProduct" :isFill="true" @GetApiData="getHotProducts" :tableConfig="tableConfig">
            <template v-slot:action>
                <el-button-group style="float: right; margin: 0px 10px 0px 0px">
                    <el-button size="mini" type="primary" @click="$router.push('/hotProducts/add')">新增</el-button>
                    <el-button size="mini" type="primary" @click="SetMoreDataDialog = true">查看更多跳转链接</el-button>
                </el-button-group>
            </template>
        </BcTable>
        <sureSetMoreDataDialog v-model="SetMoreDataDialog" @sureSetMoreData="sureSetMoreData"></sureSetMoreDataDialog>
    </section>
</template>

<script>
    import BcTable from "@common/finsuit-components/BcTable";
    import sureSetMoreDataDialog from "./modules/sureSetMoreDataDialog.vue";

    import createdTableConfig from "./modules/TableConfig-1";
    import createGetApi from "./modules/createGetApi";

    import { ref, onMounted, reactive, getCurrentInstance } from "vue";
    export default {
        components: { BcTable, sureSetMoreDataDialog },
        setup(props) {
            const instance = getCurrentInstance();
            const that = instance.appContext.config.globalProperties;
            const SetMoreDataDialog = ref(false);
            onMounted(() => {
                instance.refs["BcTableProduct"].emitGetApiData();
            });
            const { tableConfig } = createdTableConfig();
            const { getHotProducts, sureSetMoreData } = createGetApi();
            return {
                SetMoreDataDialog,
                tableConfig,
                getHotProducts,
                sureSetMoreData
            };
        }
    };
</script>

<style lang="less" scoped></style>
