export default () => {
    // 自定义检查插入视频的回调
    editor.config.onlineVideoCallback = function (video) {
        // 自定义回调内容，内容成功插入后会执行该函数
        console.log("插入视频内容", video);
    };

    /*
     * 本地上传适配配置
     */
    editor.config.uploadVideoServer = finsuitConfig.baseUrlHost + "/activityMng/forUpload";
    // 限制大小
    editor.config.uploadVideoMaxSize = 1 * 1024 * 1024 * 1024; // 1024m
    // 限制类型
    editor.config.uploadVideoAccept = ["mp4"];
    // 自定义上传参数
    editor.config.uploadVideoParams = {
        // token: 'xxxxx',
        // x: 100
    };
    // 如果需要将参数拼接到 url 中，可再加上如下配置。
    editor.config.uploadVideoParamsWithUrl = true;
    // 定义 fileName
    editor.config.uploadVideoName = "file";
    // 自定义 header
    editor.config.uploadVideoHeaders = {
        // Accept: 'text/x-json',
        // a: 100,
    };
    //   editor.config.withVideoCredentials = true

    editor.config.uploadVideoHooks = {
        // 上传视频之前
        before: function (xhr) {
            console.log(xhr);

            // 可阻止视频上传
            return {
                prevent: true,
                msg: "需要提示给用户的错误信息"
            };
        },
        // 视频上传并返回了结果，视频插入已成功
        success: function (xhr) {
            console.log("success", xhr);
        },
        // 视频上传并返回了结果，但视频插入时出错了
        fail: function (xhr, editor, resData) {
            console.log("fail", resData);
        },
        // 上传视频出错，一般为 http 请求的错误
        error: function (xhr, editor, resData) {
            console.log("error", xhr, resData);
        },
        // 上传视频超时
        timeout: function (xhr) {
            console.log("timeout");
        },
        // 视频上传并返回了结果，想要自己把视频插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: { url : '.....'} } 这种格式，可使用 customInsert
        customInsert: function (insertVideoFn, result) {
            // result 即服务端返回的接口
            console.log("customInsert", result);

            // insertVideoFn 可把视频插入到编辑器，传入视频 src ，执行函数即可
            insertVideoFn(result.data.url);
        }
    };
};
