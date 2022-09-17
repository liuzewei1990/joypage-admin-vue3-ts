import finsuitConfig from "../../finsuit-config/config.index";

export default (editor) => {
    /**
     * 上传网络图片配置
     */

    // 插入网络图片的回调
    editor.config.linkImgCallback = function (src, alt, href) {
        // console.log('图片 src ', src)
        // console.log('图片文字说明', alt)
        // console.log('跳转链接', href)
    };

    /*
     * 上传本地图片配置
     */

    editor.config.uploadImgServer = finsuitConfig.baseUrlHost + "/activityMng/forUpload";
    editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    editor.config.uploadImgMaxLength = 1;
    editor.config.uploadImgParams = {
        // token: 'xxxxx',
        // x: 100
    };
    // 如果需要将参数拼接到 url 中，可再加上如下配置。
    editor.config.uploadImgParamsWithUrl = false;
    editor.config.uploadFileName = "file";
    editor.config.uploadImgHeaders = {
        // Accept: 'text/x-json',
        // a: 100,
    };
    //   editor.config.withCredentials = true
    editor.config.uploadImgHooks = {
        // 上传图片之前
        before: function (xhr) {
            // console.log(xhr)
            // 可阻止图片上传
            //   return {
            //     prevent: true,
            //     msg: '需要提示给用户的错误信息'
            //   }
        },
        // 图片上传并返回了结果，图片插入已成功
        success: function (xhr) {
            // console.log('success', xhr)
        },
        // 图片上传并返回了结果，但图片插入时出错了
        fail: function (xhr, editor, resData) {
            // console.log('fail', resData)
        },
        // 上传图片出错，一般为 http 请求的错误
        error: function (xhr, editor, resData) {
            // console.log('error', xhr, resData)
        },
        // 上传图片超时
        timeout: function (xhr) {
            // console.log('timeout')
        },
        // 图片上传并返回了结果，想要自己把图片插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        customInsert: function (insertImgFn, result) {
            // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            insertImgFn(finsuitConfig.aliyuncHost + result.data[0]);
        }
    };
};
