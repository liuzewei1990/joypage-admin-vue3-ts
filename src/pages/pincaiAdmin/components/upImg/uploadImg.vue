<template>
    <el-upload
        class="upload-demo"
        action="http://localhost:8080/omp/finsuitFileUpload/forUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-change="changegetFile"
        :on-error="onError"
        :on-success="onSuccess">
        <template #file="{ file }">
            <di class="iconimg">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            </di>
        </template>

        <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-upload>
</template>

<script>
    export default {
        data() {
            return {
                fileList: [
                    {
                        name: "food.jpeg",
                        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                    }
                ]
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            async onSuccess(res) {
                console.log("onSuccess", res);
                // this.fileList = res.data;
                this.fileList[0].url = this.$config.aliyuncHost + res.data;
                this.$emit("update:modelValue", res.data);

                // let data = await this.$apis.activityManage.forUpload(formData);
                // console.log("data", data)
            },
            onError(res) {
                console.log("onError", res);
            },
            changegetFile(res, fileList) {
                console.log("getFile", res, fileList);
                if (fileList.length > 0) {
                    // this.fileList[0].name = [fileList[fileList.length - 1]][0].name
                    // this.fileList[0].url = this.$config.aliyuncHost + [fileList[fileList.length - 1]][0].response.data;
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .iconimg {
        img {
            width: 50px;
            height: 50px;
        }
    }
</style>

<style lang="less">
    ul.el-upload-list {
        width: 50px;
        float: left;
        margin-top: -15px;
        margin-right: 10px;
    }
</style>
