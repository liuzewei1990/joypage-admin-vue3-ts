<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2" status-icon ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-page">
            <p class="title">系统登录</p>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm2.username" name="username" autocomplete="off" placeholder="用户名" :autofocus="false"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm2.password" name="password" autocomplete="off" placeholder="密码" :show-password="false"></el-input>
            </el-form-item>
            <!-- <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox> -->
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
    import { getCurrentInstance, reactive, ref } from "vue";
    import { createStore, useStore } from "vuex";
    import { useRouter } from "vue-router";

    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const store = useStore();
    const router = useRouter();

    const logining = ref(false);
    const ruleForm2 = reactive({
        username: "",
        password: ""
    });
    const rules2 = reactive({
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
    });
    const ruleForm = ref(null);

    const handleSubmit = () => {
        ruleForm.value.validate(async (valid) => {
            if (valid) {
                logining.value = true;

                try {
                    //  登录
                    let data = await _this.$apis.login({
                        ACCOUNT: ruleForm2.username,
                        PASSWORD: ruleForm2.password
                    });

                    // 获取用户信息
                    let userInfo = await _this.$apis.setting();
                    store.commit("USER_INFO", userInfo);

                    // 记录前端登录标记，并跳转路由
                    store.dispatch("login", "1");
                    router.push({ path: "/" });
                } catch (error) {
                    console.error(error);
                }

                logining.value = false;
            } else {
                console.log("error submit!");
                return false;
            }
        });
    };
</script>

<style lang="less" scoped>
    .login-container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        /* width: 100%; */
        /* height: 100%; */
        background: #eee;
        background: url("../../assets/images/bgimg.png") no-repeat;
        background-size: cover;
    }
    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        /* margin: 180px auto; */
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 20%;
        min-width: 260px;
        padding: 35px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        .title {
            margin-bottom: 30px;
            color: #1d96ff;
            font-size: 30px;
            font-weight: 100;
        }
        /* box-shadow: 0 0 25px #cac6c6; */
    }
    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }
</style>
