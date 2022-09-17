<template>
    <el-upload
        class="upload-img"
        action="imageDomain"
        v-bind="$attr"
        :http-request="uploadImg"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-exceed="exceedFile"
        :show-file-list="false"
        :before-upload="beforeUploadFile">
        <el-image v-if="imgUrlList" :src="imageUrl + imgUrlList" class="avatar" fit="contain"></el-image>

        <el-button v-else size="small" type="primary">点击上传</el-button>
        <span class="el-upload__tip">(仅支持一张)</span>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img class="dialog-img" :src="imgUrlPreview" alt="" />
    </el-dialog>
</template>
<script>
    import { ref, reactive, toRefs, getCurrentInstance } from "vue";
    export default {
        props: {
            /**上传图片张数 */
            limit: {
                type: Number,
                default: 1
            },
            /**是否多选 */
            multiple: {
                type: Boolean,
                default: false
            },
            /**v-model响应数据 */
            modelValue: {
                type: String,
                default: ""
            }
        },
        emits: ["GetApiData", "update:modelValue"],
        setup(props, context) {
            const instance = getCurrentInstance().appContext.config.globalProperties;

            const state = reactive({
                dialogVisible: false,
                imgUrlList: "",
                imgUrlPreview: "",
                imageDomain: instance.$config.baseUrlHost + "/finsuitImgDisplay/show?path="
            });

            //图片上传
            const uploadImg = (content) => {
                let query = content.file; //取需要上传的file值

                let callback = (dataset = {}) => {
                    if (dataset.list.result) {
                        state.imgUrlList = dataset.list.data[0];
                        console.log("state.imgUrlList", state.imgUrlList);
                        context.emit("update:modelValue", state.imgUrlList);
                    } else {
                        instance.$message.error(dataset.list.message);
                    }
                };

                context.emit("GetApiData", { query, callback });
            };

            // 删除图片
            const handleRemove = (file, fileList) => {
                state.imgUrlList = "";
            };

            //点击图片放大
            const handlePictureCardPreview = (file) => {
                state.imgUrlPreview = file.url;
                state.dialogVisible = true;
            };

            // 文件超出个数限制时的钩子
            const exceedFile = (files, fileList) => {
                instance.$message.warning(`只能选择 ${props.limit} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
            };

            // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
            const beforeUploadFile = (file) => {
                let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (extension !== "png") {
                    instance.$message.warning("只能上传后缀是.png的文件");
                }
                if (!isLt5M) {
                    instance.$message.error("请上传5M以下的图片");
                    return false;
                }
            };

            return {
                ...toRefs(state),
                uploadImg,
                handleRemove,
                handlePictureCardPreview,
                exceedFile,
                beforeUploadFile
            };
        }
    };
</script>
<style lang="less" scoped>
    .el-upload__tip {
        margin-left: 20px;
        color: red;
    }
    /deep/ .el-dialog__body {
        padding: 30px 20px;
        text-align: center;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
    }
    .dialog-img {
        margin: 0 auto;
        width: 100%;
    }
</style>
