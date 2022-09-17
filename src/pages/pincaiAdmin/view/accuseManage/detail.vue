<!-- 投诉详情 -->
<template>
    <section class="acc-detail">
        <el-divider content-position="left">投诉人</el-divider>
        <el-row>
            <el-col :span="12"><div class="el-col-margin">投诉人昵称：XXX</div></el-col>
            <el-col :span="12"><div class="el-col-margin">投诉人识贝ID：234234234</div></el-col>
        </el-row>

        <el-divider content-position="left">被投诉人</el-divider>
        <el-row>
            <el-col :span="12"><div class="el-col-margin">被投诉人昵称：XXX</div></el-col>
            <el-col :span="12"><div class="el-col-margin">被投诉人识贝ID：234234234</div></el-col>
        </el-row>

        <el-divider content-position="left">被投诉内容</el-divider>
        <el-row>
            <el-col :span="12"><div class="el-col-margin">被投诉人内容类型：帖子</div></el-col>
            <el-col :span="12"><div class="el-col-margin">被投诉人内容ID：234234234</div></el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <div class="el-col-margin">被投诉人内容：</div>
            </el-col>
            <el-col :span="18"
                ><div class="el-content-margin">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales
                    pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed
                    rhoncus pronin sapien nunc accuan eget.
                </div></el-col
            >
        </el-row>

        <el-row>
            <el-col :span="6"><div class="el-col-margin">图片：</div></el-col>
            <el-col :span="18">
                <div class="el-content-margin">
                    <el-image v-for="n in 15" style="width: 100px; height: 100px; margin-right: 4px" :src="url" fit="fill" :preview-src-list="srcList"></el-image>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <div class="el-col-margin">视频：</div>
            </el-col>
            <el-col :span="18"
                ><div class=""><video controls="controls" src="https://www.w3school.com.cn/i/movie.ogg"></video></div
            ></el-col>
        </el-row>

        <el-row>
            <el-col :span="16"><div class="el-col-margin">关联产品：XXXXXX、XXXXXXX</div></el-col>
            <el-col :span="8"><div class="el-col-margin"></div></el-col>
        </el-row>

        <el-divider content-position="left">处理</el-divider>
        <el-row>
            <el-col :span="24"
                ><div class="el-col-btn">
                    <el-button type="danger" @click="sureDialogRef.centerDialogVisible = true">下架该内容</el-button>
                </div></el-col
            >
        </el-row>
    </section>
</template>

<script>
    import { ref, reactive, toRefs, onMounted, onUnmounted, getCurrentInstance } from "vue";

    export default {
        components: {},
        setup() {
            const that = getCurrentInstance().appContext.config.globalProperties;

            onMounted(() => {});
            onUnmounted(() => {});
            return {
                ischeck: ref("ischeck"),
                url: ref("https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"),
                srcList: ["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"]
            };
        }
    };
</script>
<style lang="less" scoped>
    .el-content-margin {
        margin: 20px 0;
    }
    .el-col-margin {
        margin: 10px 0 10px 200px;
    }
    .el-col-btn {
        text-align: center;
        width: 100%;
        margin: 20px 0;
    }
    .el-row {
        font-size: 14px;
        color: #606266;
    }
</style>
