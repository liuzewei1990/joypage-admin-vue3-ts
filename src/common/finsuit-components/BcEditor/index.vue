<!--  -->
<template>
    <!-- <video src="https://finsuit-test.oss-cn-beijing.aliyuncs.com/ACT/0b063fc0-7e10-445d-b7f9-a0b25a08b3ff.mp4"></video> -->
    <section class="bc-editor" ref="dom"></section>
</template>

<script>
    import { defineAsyncComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref, toRefs, watch, watchEffect } from "vue";
    import finsuitConfig from "../../finsuit-config/config.index";
    import upImage from "./upImage";
    import E from "wangeditor";
    import PreCode from "./btns/PreCode";
    E.registerMenu("PreCode", PreCode);

    // const E = defineAsyncComponent(() => import(/* webpackChunkName: "wangeditor" */ "wangeditor"))
    export default {
        components: {},
        emits: ["update:modelValue"],
        props: {
            modelValue: {
                default: ""
            }
        },
        setup(props, ctx) {
            const { modelValue } = toRefs(props);

            const instance = getCurrentInstance();

            const dom = ref(null);

            let editor = null;

            const init = () => {
                editor = new E(dom.value);
                // 设置编辑区域高度为 500px
                editor.config.height = 300;
                // 编辑器 z-index 默认为 10000，可以自行调整。
                editor.config.zIndex = 100;
                // 可以修改 placeholder 的提示文字。
                editor.config.placeholder = "请输入正文";
                // 取消自动 focus
                editor.config.focus = false;
                // 默认情况，显示所有菜单
                editor.config.menus = [
                    // 标题
                    "head",
                    // 加粗
                    "bold",
                    // 字体大小
                    "fontSize",
                    // 字体
                    "fontName",
                    // 斜体
                    "italic",
                    // 下划线
                    "underline",
                    // 删除线
                    "strikeThrough",
                    // 缩进
                    "indent",
                    // 行高
                    "lineHeight",
                    // 文字颜色
                    "foreColor",
                    // 背景颜色
                    "backColor",
                    // 插入链接
                    "link",
                    // 序列
                    "list",
                    // 代办事项
                    // 'todo',
                    // 对齐
                    "justify",
                    // 引用
                    "quote",
                    // 表情
                    // 'emoticon',
                    // 图片
                    "image",
                    // 视频
                    "video",
                    // 表格
                    "table",
                    // 代码
                    // 'code',
                    // 分割线
                    "splitLine",
                    // 撤销
                    "undo",
                    // 前进
                    "redo"
                ];
                // 配置颜色（文字颜色、背景色）
                editor.config.colors = ["#000000", "#eeece0", "#1c487f", "#4d80bf"];
                // 配置行高
                editor.config.lineHeights = ["0.8", "1", "1.15", "1.6", "2", "2.5", "3"];

                // 植入自定义图片上传配置
                upImage(editor);

                // 监听变化
                editor.config.onchange = function (html) {
                    // 第二步，监控变化，同步更新到 textarea
                    // $text1.val(html)
                    ctx.emit("update:modelValue", html);
                };
                editor.config.onblur = function (newHtml) {
                    // console.log('onblur', newHtml) // 获取最新的 html 内容
                };
                editor.config.onfocus = function (newHtml) {
                    // console.log('onfocus', newHtml) // 获取最新的 html 内容
                };
                // 自定义检查插入的链接
                editor.config.linkCheck = function (text, link) {
                    // 以下情况，请三选一

                    // 1. 返回 true ，说明检查通过
                    return true;

                    // // 2. 返回一个字符串，说明检查未通过，编辑器会阻止链接插入。会 alert 出错误信息（即返回的字符串）
                    // return '链接有 xxx 错误'

                    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止链接插入。
                    // 此处，你可以自定义提示错误信息，自由发挥
                };

                editor.create();

                // 回显内容
                editor.txt.html(modelValue.value);
                // 追加新内容
                //   editor.txt.append('<p>追加的内容</p>')
                // 获取 html (从编辑器中获取的 html 代码是不包含任何样式的纯 html)
                //   editor.txt.html()

                // 获取 text 文本。
                // editor.txt.text()

                // 获取 JSON 格式的内容
                // editor.txt.getJSON()

                // 设置 JSON
                // editor.txt.setJSON()

                // 清空内容
                // editor.txt.clear()
            };

            // 实现让watch只监听一次
            let unwatch = null;
            unwatch = watch(modelValue, (newVal) => {
                editor.txt.html(newVal);
                // 取消watch监听
                if (unwatch) unwatch();
            });

            // 别问我我为什么2秒后取消这个监听，除非你能知道为什么要实现让watch只监听一次
            setTimeout(() => {
                unwatch();
            }, 2000);

            onMounted(() => {
                init();
            });

            onBeforeUnmount(() => {
                editor.destroy();
                editor = null;
            });

            return { editor, dom };
        }
    };
</script>
<style lang="less" scoped>
    .bc-editor {
        width: 100%;
    }
</style>
