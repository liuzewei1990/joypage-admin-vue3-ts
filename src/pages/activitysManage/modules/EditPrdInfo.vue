<!-- 根据产品ID回显产品信息 -->
<template>
    <section class="">
        <el-row>
            <el-form-item label="机构名称">
                <el-input class="form-item" v-model="form.orgName.value" placeholder="机构名称" style="width: 250px">
                    <template #suffix>
                        <el-checkbox v-model="form.orgName.isShow">前端是否显示</el-checkbox>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="产品类型名称">
                <el-input class="form-item" v-model="form.prdTypeName.value" placeholder="产品名称" style="width: 220px">
                    <template #suffix>
                        <el-checkbox v-model="form.prdTypeName.isShow">前端是否显示</el-checkbox>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="产品名称">
                <el-input class="form-item" v-model="form.prdName.value" placeholder="产品名称" style="width: 250px">
                    <template #suffix>
                        <el-checkbox v-model="form.prdName.isShow">前端是否显示</el-checkbox>
                    </template>
                </el-input>
            </el-form-item>
        </el-row>

        <el-row>
            <el-form-item label="产品利率">
                <el-input class="form-item" v-model="form.rate.value" placeholder="利率" style="width: 250px">
                    <template #suffix>
                        <el-checkbox v-model="form.rate.isShow">前端是否显示</el-checkbox>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="利率名称">
                <el-input class="form-item" v-model="form.rateText.value" placeholder="利率名称" style="width: 220px">
                    <template #suffix>
                        <el-checkbox v-model="form.rateText.isShow">前端是否显示</el-checkbox>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="产品年限">
                <el-input class="form-item" v-model="form.period.value" placeholder="年限" style="width: 250px">
                    <template #suffix>
                        <el-checkbox v-model="form.period.isShow">前端是否显示</el-checkbox>
                    </template>
                </el-input>
            </el-form-item>
        </el-row>
    </section>
</template>

<script>
    import { getCurrentInstance, reactive, toRefs, watch, watchEffect } from "vue";

    export default {
        components: {},
        props: {
            prdIndexId: [String, Number],
            modelValue: {
                type: Object,
                default: {}
            }
        },
        setup(props, ctx) {
            const instance = getCurrentInstance();
            const _this = instance.appContext.config.globalProperties;

            const defaults = {
                // 机构名称
                orgName: {
                    value: "",
                    isShow: true
                },
                // 产品名称
                prdName: {
                    value: "",
                    isShow: true
                },
                // 产品类型名称
                prdTypeName: {
                    value: "",
                    isShow: true
                },
                // 利率名称
                rateText: {
                    value: "",
                    isShow: true
                },
                // 利率
                rate: {
                    value: "",
                    isShow: true
                },
                // 年限
                period: {
                    value: "",
                    isShow: true
                }
            };

            const { prdIndexId } = toRefs(props);
            const modelValue = props.modelValue || {};

            const form = reactive({
                ...defaults,
                ...modelValue
            });

            // 监听整个form的变化 回传整个数据
            watch(
                form,
                (newValue) => {
                    ctx.emit("update:modelValue", newValue);
                },
                {
                    // 深度监听
                    deep: true
                    // 立即以表达式当前的值触发回调
                    //   immediate: true
                }
            );

            const initForm = (prdInfo = {}) => {
                form.orgName.value = prdInfo.orgName || "";
                form.prdName.value = prdInfo.prdName || "";
                form.prdTypeName.value = prdInfo.prdTypeName || "";
                form.rateText.value = prdInfo.rateText || "";
                form.rate.value = prdInfo.rate || "";
                form.period.value = prdInfo.period || "";
            };

            // 根据产品id获取回显信息
            const getPrdInfoByIdForTeamMng = async (prdIndexId) => {
                let prdInfo = {};
                // 获取信息
                try {
                    let params = { prdIndexId: prdIndexId };
                    let data = await _this.$apis.getPrdInfoByIdForTeamMng(params);
                    prdInfo = data;
                } catch (error) {
                    prdInfo = {};
                }
                // 回显内容
                initForm(prdInfo);
            };

            // 监听产品id变化时 重新回显数据
            watch(prdIndexId, () => {
                getPrdInfoByIdForTeamMng(prdIndexId.value);
            });

            return {
                form
            };
        }
    };
</script>
<style lang="less" scoped>
    .form-item {
        /deep/ .el-input__inner {
            padding-right: 120px;
        }
    }
</style>
