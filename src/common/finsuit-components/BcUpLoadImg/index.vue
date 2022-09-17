<!--  -->
<template>
    <section class="">
        <el-upload ref="UploadRefComponent" class="bc-upload" :class="{ 'hide-btn': hideUploadBtn }" v-bind="{ ...options, ...$attrs }" :fileList="fileList">
            <template #default>
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </template>
        </el-upload>
        <ElImageViewer :url-list="imgList" v-if="isShow" :initial-index="index" :hide-on-click-modal="true" @close="isShow = !isShow"></ElImageViewer>
    </section>
</template>

<script>
    import { getCurrentInstance, reactive, ref, watch, watchEffect, toRaw, onMounted, computed, h, toRefs } from "vue";
    import finsuitConfig from "../../finsuit-config/config.index";
    import { ElImageViewer } from "element-plus";
    export default {
        components: { ElImageViewer },
        emits: ["update:modelValue"],
        props: {
            btnType: {
                type: String,
                default: "1"
            },
            modelValue: {
                type: Array,
                default: []
            }
        },
        setup(props, ctx) {
            const instance = getCurrentInstance();
            const _this = instance.appContext.config.globalProperties;
            const aliyuncHost = finsuitConfig.aliyuncHost;
            const UploadRefComponent = ref(null);

            // 预览组件配置
            const preView = reactive({
                isShow: false,
                index: 0,
                imgList: []
            });

            // 长度超限 limit长度 隐藏上传按钮
            const hideUploadBtn = ref(false);
            const checkHideUploadBtn = (fileListLength = 0) => {
                hideUploadBtn.value = fileListLength >= UploadRefComponent.value.limit;
            };

            // 文件列表 回显fileList数据 ，单独定义防止父级误改
            const fileList = ref([]);
            fileList.value = props.modelValue.map((item) => {
                return { url: aliyuncHost + item.url, _url: item.url };
            });

            // 回显检测
            onMounted(() => {
                checkHideUploadBtn(fileList.value.length);
            });

            // 上传组件配置
            const options = reactive({
                // 是否支持多选文件
                multiple: true,
                // 默认地址 通用这一个地址即可
                action: "/activityMng/forUpload",
                // 上传的文件字段名
                name: "file",
                // 上传时附带的额外参数
                data: {},
                // 设置上传的请求头部
                headers: {},

                // 最大允许上传个数
                limit: 1,
                // 超限的钩子
                onExceed: (files, fileList) => {
                    _this.$msg.error(`当前限制选择 ${UploadRefComponent.value.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
                },

                // 是否在选取文件后立即进行上传
                autoUpload: true,
                // 覆盖默认的上传行为，可以自定义上传的实现
                // httpRequest:()=>{},
                // 是否禁用
                disabled: false,
                // 支持发送 cookie 凭证信息
                withCredentials: false,
                // 是否显示已上传文件列表
                showFileList: true,
                // 文件列表的类型
                listType: "picture-card", // text/picture/picture-card
                // 是否启用拖拽上传
                drag: false,
                // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
                accept: ".jpg, .jpeg, .png, .gif",
                // 点击文件列表中已上传的文件时的钩子
                onPreview: (file) => {
                    // preView.imgList = toRaw(props.modelValue).map(item => aliyuncHost + item.url) 暂且不支持多图预览
                    preView.imgList = [file.url];
                    preView.isShow = true;
                },
                // 文件列表移除文件时的钩子
                onRemove: (file, fileList) => {
                    // 回传数据
                    let value = fileList.map((item) => ({ url: item._url }));
                    ctx.emit("update:modelValue", value);
                    // 检测长度
                    checkHideUploadBtn(fileList.length);
                },
                // 文件上传成功时的钩子
                onSuccess: (response, file, fileList) => {
                    if (response.result === true) {
                        (response.data || []).forEach((url) => {
                            file._url = url;
                        });
                        // 回传数据
                        let value = fileList.map((item) => ({ url: item._url }));
                        ctx.emit("update:modelValue", value);
                    } else {
                        _this.$msg.error("上传失败");
                    }
                },
                // 文件上传失败时的钩子
                onError: () => {},
                // 文件上传时的钩子
                onProgress: () => {},
                // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
                onChange: (file, fileList) => {
                    // 检测长度
                    checkHideUploadBtn(fileList.length);
                },
                // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
                beforeUpload: (file) => {
                    const isJPG = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp", "image/x-png"].indexOf(file.type) !== -1;
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isJPG) {
                        _this.$msg.error("上传的图片格式有误!");
                    }
                    if (!isLt2M) {
                        _this.$msg.error("上传图片大小不能超过 2MB!");
                    }
                    return isJPG && isLt2M;
                }
                // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
                //   beforeRemove: (file, fileList) => {
                //     return _this.$confirm(`确定移除这个文件吗？`);
                //   },
            });

            // 合并域名
            options.action = finsuitConfig.baseUrlHost + options.action;

            return { UploadRefComponent, ...toRefs(preView), options, fileList, hideUploadBtn };
        }
    };
</script>
<style lang="less" scoped>
    .bc-upload {
        /deep/ .el-upload-list--picture-card .el-upload-list__item {
            width: 80px;
            height: 80px;
            transition: none;
        }
        /deep/ .el-upload--picture-card {
            width: 80px;
            height: 80px;
            line-height: 90px;
        }
    }
    .hide-btn {
        /deep/ .el-upload--picture-card {
            display: none;
        }
    }
</style>
