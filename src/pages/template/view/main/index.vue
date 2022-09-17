<!--  -->
<template>
    <div>
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
        <!-- 本地 -->
        <BcSelect v-model="data.advPlatform" :list="appFlagList" placeholder="请选择"></BcSelect>
        <!-- 接口，未分页 -->
        <!-- {{data.orgId1}} -->
        <BcSelect @GetApiData="orgSelectData($event)" v-model="data.orgId1" :filterable="true" placeholder="请输入/选择机构" itemNameKey="org_name" itemValueKey="id" :clearable="true"> </BcSelect>

        <!-- 接口分页 -->
        <!-- {{data.orgId}} -->
        <BcSelect @GetApiData="getOrgSelectData($event)" v-model="data.orgId" :filterable="true" :remote="true" placeholder="请输入跳转内容" :clearable="true"> </BcSelect>

        <!-- 字符串 -->
        <!-- <StrSelect v-model="data.advPlatform" :list="appFlagList"  placeholder="请选择"></StrSelect> -->

        <el-button type="success" @click="submit">成功按钮</el-button>
    </div>
</template>

<script>
    import OldBcSelect from "@common/finsuit-components/BcSelect";
    // 3.0 select组件
    import BcSelect from "@common/finsuit-components/BcSelect/select";
    // import StrSelect from "@common/finsuit-components/BcSelect/strSelect"

    import { ref, toRefs, onMounted, getCurrentInstance, reactive } from "vue";
    export default {
        components: {
            // OldBcSelect,
            BcSelect
            // StrSelect,
        },
        setup() {
            const instance = getCurrentInstance().appContext.config.globalProperties;
            // console.log("instance",instance)
            const appFlagList = [
                { name: "识贝比", id: "BC" },
                { name: "识贝拼", id: "PC" },
                { name: "小程序", id: "PMP" },
                { name: "异业", id: "YIYE" }
            ];

            const state = reactive({
                appFlagList: appFlagList,
                data: {
                    advPlatform: "",
                    orgId1: "",
                    orgId: ""
                }
            });

            // 当获取焦点时获取机构列表
            const orgSelectData = async ($event) => {
                let { query, callback } = $event;
                let params = {
                    orgName: query.keywords
                };

                let data = await instance.$apis.selectOrgData(params).then((res) => res.datatypeParam.success || {});

                callback({ list: data, total: 0 });
            };

            // 当获取焦点时获取转跳内容类型
            const getOrgSelectData = async ($event) => {
                let { query, callback } = $event;

                let params = {
                    pageNum: query.currentPage,
                    pageSize: 10,
                    contentTypeId: 4, //4是机构
                    name: query.keywords
                };
                // console.log(params)
                let data = await instance.$apis.getContentByContentType(params).then((res) => res.data || {});
                // console.log("转跳内容data",data)
                callback({ list: data.data, total: data.totalCount });
            };

            const submit = () => {
                console.log("state.data.advPlatform", state.data.advPlatform);
                console.log("state.data.orgId", state.data.orgId);
            };
            return {
                ...toRefs(state),
                submit,
                orgSelectData,
                getOrgSelectData
            };
        }
    };
</script>
<style lang="less" scoped></style>
