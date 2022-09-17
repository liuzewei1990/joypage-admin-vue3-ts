<template>
    <div>
        <!-- Form -->

        <el-dialog title="新增" v-model="addhotProductsForm">
            <el-form :model="form">
                <el-form-item label="别名" :label-width="formLabelWidth">
                    <el-input v-model="form.alias" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="icon" :label-width="formLabelWidth">
                    <el-input v-model="form.icon" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品内容" :label-width="formLabelWidth">
                    <el-input v-model="form.introduction" autocomplete="off"></el-input>
                    <!-- <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option label="男" value="nan"></el-option>
                <el-option label="女" value="nv"></el-option>
            </el-select> -->
                </el-form-item>

                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input v-model="form.orderBy" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="*可见用户" :label-width="formLabelWidth">
                    <el-select v-model="form.seeUser" placeholder="请选择">
                        <el-option label="全部" value="new"></el-option>
                        <el-option label="登录用户" value="new"></el-option>
                        <el-option label="未登录用户" value="new"></el-option>
                        <el-option label="新用户" value="new"></el-option>
                        <el-option label="老用户" value="old"></el-option>
                        <el-option label="未注册的新设备" value="old"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="监管沙盒" :label-width="formLabelWidth">
                    <el-input v-model="form.shahe" autocomplete="off" placeholder="请输入产品ID"></el-input>
                </el-form-item>
                <el-form-item label="发布渠道" :label-width="formLabelWidth">
                    <el-select v-model="form.seeUser">
                        <el-option label="识贝拼" value="old"></el-option>
                        <el-option label="识贝比" value="old"></el-option>
                        <el-option label="小程序" value="old"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布设备" :label-width="formLabelWidth">
                    <el-select v-model="form.seeUser">
                        <el-option label="苹果" value="old"></el-option>
                        <el-option label="安卓" value="old"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addhotProductsForm = false">取 消</el-button>
                    <el-button type="primary" @click="addhotProductsForm = false">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import { reactive, toRefs } from "vue";
    export default {
        setup() {
            const state = reactive({
                gridData: [
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-04",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-01",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-03",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    }
                ],
                addhotProductsForm: true,
                form: {
                    nickName: "",
                    sbId: "",
                    introduction: "",
                    sex: "",
                    professional: ""
                },
                formLabelWidth: "80px"
            });
            return {
                ...toRefs(state)
            };
        }
    };
</script>

<style scoped lang="less"></style>
