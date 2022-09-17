<template>
    <el-form ref="form" :model="addFormData.formData" :rules="rules">
        <ItemBox title="计算器收益计算公式">
            <el-row>
                <el-form-item label="一年天数：" prop="annualDays">
                    <el-input v-model="addFormData.formData.annualDays" :disabled="state.annualDayState" placeholder="请输入一年天数">
                        <template #suffix>
                            <span>天</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button type="primary" v-if="state.annualDayState" size="small" @click="modifyBtn('annualDays')">修 改</el-button>
                <el-button type="success" v-else size="small" @click="submit">确 定</el-button>
            </el-row>

            <el-row>
                <el-form-item label="一月天数：" prop="monthDays">
                    <el-input v-model="addFormData.formData.monthDays" :disabled="state.monthDayState" placeholder="请输入一月天数">
                        <template #suffix>
                            <span>天</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button type="primary" v-if="state.monthDayState" size="small" @click="modifyBtn('monthDays')">修 改</el-button>
                <el-button type="success" v-else size="small" @click="submit">确 定</el-button>
            </el-row>

            <el-row>
                <p style="margin-bottom: 22px">预计收益=存入本金×存入天数×日利率（年化收益率/一年天数）</p>
            </el-row>
        </ItemBox>

        <ItemBox>
            <el-row>
                <el-form-item class="rate" label="央行活期存款基准利率：" prop="interestRate">
                    <el-input v-model="addFormData.formData.interestRate" :disabled="state.interestRateState" placeholder="请输入基准利率">
                        <template #suffix>
                            <span>%</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button class="rate-btn" v-if="state.interestRateState" type="primary" size="small" @click="modifyBtn('interestRate')">修 改</el-button>
                <el-button class="rate-btn" v-else type="success" size="small" @click="submit">确 定</el-button>
            </el-row>
        </ItemBox>
    </el-form>
</template>

<script>
    import { ref } from "vue";
    import { ItemBox } from "@common/finsuit-components/BcPageForm";
    import addForm from "./../compositionApi/AddFormFormula";

    export default {
        components: {
            ItemBox
        },

        props: {
            tabType: {
                type: String,
                default: ""
            }
        },

        setup() {
            const form = ref(null);
            const { addFormData, state, rules, formulaDataApi, modifyBtn, submit } = addForm(form);

            formulaDataApi();

            return {
                form,
                addFormData,
                state,
                rules,
                formulaDataApi,
                modifyBtn,
                submit
            };
        }
    };
</script>

<style lang="less" scoped>
    .rate {
        margin-top: 22px;
    }
    .el-button--small {
        margin-left: 10px;
        margin-top: 4px;
        height: 32px;
        padding: 9px 15px;
    }
    .rate-btn {
        margin-top: 27px;
    }
    /deep/ .el-form-item__content {
        width: 168px;
    }
</style>
