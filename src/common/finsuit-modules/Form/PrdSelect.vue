<!--  -->
<template>
    <div>
        <!-- prdId 父级校验时，在规则中用这个prdId就可以 -->
        <el-form-item label="选择产品" prop="prdId" :show-message="false"></el-form-item>
        <el-form-item label="" prop="org_Id">
            <BcSelect
                modelType="id"
                :autoGetApiData="org_Id != ''"
                v-model="org_Id"
                @GetApiData="getOrgSelect"
                :disabled="disabled"
                placeholder="机构"
                @change="org_IdChange"
                clearable
                filterable></BcSelect>
        </el-form-item>
        <el-form-item label="" prop="prdId">
            <BcSelect
                modelType="id"
                :autoGetApiData="org_Id != ''"
                v-model="prdId"
                @GetApiData="getPrdSelect($event, org_Id)"
                placeholder="请选择产品"
                style="width: 300px"
                :disabled="disabled || org_Id == ''"
                :key="org_Id"
                clearable
                filterable></BcSelect>
        </el-form-item>
    </div>
</template>

<script>
    import { ItemBox } from "@common/finsuit-components/BcPageForm";
    import BcSelect from "@common/finsuit-components/BcSelect";
    import * as finsuitApis from "@common/finsuit-apis";
    import { ref, watch, watchEffect } from "vue";
    export default {
        components: { BcSelect },
        emits: ["update:org_Id", "update:prdId"],
        props: {
            orgId: {
                default: ""
            },

            prdIndexId: {
                default: ""
            },

            disabled: {
                default: false
            }
        },
        setup(props, ctx) {
            const org_Id = ref("");
            const prdId = ref("");

            // watch props变动 进入数据流
            watchEffect(() => {
                org_Id.value = props.orgId;
            });
            watchEffect(() => {
                prdId.value = props.prdIndexId;
            });

            // watch ref变动 回传数据流
            watch(org_Id, (v) => {
                ctx.emit("update:org_Id", v);
            });
            watch(prdId, (v) => {
                ctx.emit("update:prdId", v);
            });

            // 机构select
            const getOrgSelect = async ($event) => {
                let { query, callback } = $event;
                let params = {};
                let data = await finsuitApis.getOrgSelect(params);
                callback({ list: data });
            };

            // 产品select
            const getPrdSelect = async ($event, org_Id = "") => {
                let { query, callback } = $event;
                let params = { org_Id };
                let data = await finsuitApis.getPrdSelect(params);
                callback({ list: data });
            };

            const org_IdChange = () => {
                prdId.value = "";
            };

            return {
                org_Id,
                prdId,
                getOrgSelect,
                getPrdSelect,
                org_IdChange
            };
        }
    };
</script>

<style lang="less" scoped></style>
