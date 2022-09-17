import { createApp, getCurrentInstance, h, reactive, ref } from "vue";
import * as MsgBox from "@pcAdmin/components/MsgBox";
import { ElButton, ElImage, ElLink } from "element-plus";
import { PrdsLink, UserLink, OType, OStatu, SStatu } from "../../../../components/TableColumnContent";
import { HeaderImage, TextLink } from "@common/finsuit-components/BcTable/columnContent.js";

export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;

    // 审核
    const shenhe_setting = async (scope) => {
        try {
            console.log(scope);
            const modelValue = ref(1);
            await MsgBox.ConfirmRadios("审核提示", {
                modelValue,
                radios: [
                    { label: "通过", value: 1, tip: "通过后所有人可见" },
                    { label: "不通过", value: 2, tip: "不通过仅发帖人可见" }
                ]
            });
            _this.$msg.success(modelValue.value + "");
        } catch (error) {
            console.error(error);
        }
    };

    // 下架
    const xiajia_setting = async (scope) => {
        try {
            if (scope.row.up == "2") {
                await MsgBox.AlertText("上架提示", "当前内容已下架，是否上架？");
            } else {
                await MsgBox.AlertText("下架提示", "下架后，所有用户（含发布人）在前端页面看不到本内容");
            }
            _this.$msg.success("确定", scope);
        } catch (error) {}
    };

    // 可评论
    const pinglun_setting = async (scope) => {
        try {
            const modelValue = ref(1);
            await MsgBox.ConfirmRadios("评论设置", {
                modelValue,
                radios: [
                    { label: "可评论", value: 1, tip: "该帖不能进行评论" },
                    { label: "禁止评论", value: 2, tip: "该帖可进行评论" }
                ]
            });
            _this.$msg.success(modelValue.value + "");
        } catch (error) {}
    };

    // 可转发
    const zhuanfa_setting = async (scope) => {
        try {
            const modelValue = ref(1);
            await MsgBox.ConfirmRadios("转发设置", {
                modelValue,
                radios: [
                    { label: "可转发", value: 1, tip: "该帖不能进行站内转发" },
                    { label: "禁止转发", value: 2, tip: "该帖可进行站内转发" }
                ]
            });
            _this.$msg.success(modelValue.value + "");
        } catch (error) {}
    };

    // 可分享
    const share_setting = async (scope) => {
        try {
            const modelValue = ref(1);
            await MsgBox.ConfirmRadios("分享设置", {
                modelValue,
                radios: [
                    { label: "可分享", value: 1, tip: "该帖不能进行站外分享" },
                    { label: "禁止分享", value: 2, tip: "该帖可进行站外分享" }
                ]
            });
            _this.$msg.success(modelValue.value + "");
        } catch (error) {}
    };

    // 评论展示
    const pinglunzhanshi_setting = async (scope) => {
        try {
            const modelValue = ref(1);
            await MsgBox.ConfirmRadios("评论展示设置", {
                modelValue,
                radios: [
                    { label: "展示", value: 1, tip: "该帖不能进行站外分享" },
                    { label: "不展示", value: 2, tip: "该帖可进行站外分享" }
                ]
            });
            _this.$msg.success(modelValue.value + "");
        } catch (error) {}
    };

    // 官方推荐帖
    const tuijian_setting = async (scope) => {
        try {
            const modelValue = ref(1);
            await MsgBox.ConfirmRadios("官方推荐帖", {
                modelValue,
                radios: [
                    { label: "普通帖子", value: 1 },
                    { label: "官方推荐帖", value: 2 }
                ],
                bottomMassage: "设置后，该贴将标记为官方推荐帖"
            });
            _this.$msg.success(modelValue.value + "");
        } catch (error) {}
    };

    const commentCntClick = () => {
        _this.$msg.success("点我了");
    };

    const tableConfig = reactive({
        // 表格列配置
        columnJson: [
            {
                label: "帖类型",
                prop: "blogPublishType",
                render: (scope) => {
                    const { row } = scope;
                    return h(OType, { status: row.blogPublishType });
                }
            },
            {
                label: "帖子ID",
                prop: "id",
                setting: { disabled: true }
            },
            {
                label: "用户头像",
                prop: "menberHeadImg",
                render: (scope) => {
                    const { row } = scope;
                    return h(HeaderImage, { src: row.menberHeadImg });
                }
            },
            {
                label: "用户昵称",
                prop: "memberNo"
            },
            {
                label: "识贝ID",
                prop: "memberId"
            },
            {
                label: "标题",
                prop: "blogTitle",
                width: "100px"
            },
            {
                label: "文本内容",
                prop: "blogContent"
            },
            {
                label: "图片",
                prop: "blogUrls"
            },
            {
                label: "关联产品",
                prop: "refPrdIds",
                width: "110px",
                // showOverflowTooltip: false,
                render: (scope) => {
                    const { row } = scope;
                    return h(PrdsLink, { list: row.refPrdIds });
                }
            },
            {
                label: "@人",
                prop: "refMemberIds",
                render: (scope) => {
                    const { row } = scope;
                    return h(UserLink, { list: row.refMemberIds });
                }
            },
            {
                label: "评论数量",
                prop: "commentCnt",
                render: (scope) => {
                    const { row } = scope;
                    return h(TextLink, { onClick: commentCntClick }, { default: () => row.commentCnt });
                }
            },
            {
                label: "转发数量",
                prop: "forwardCnt"
            },
            {
                label: "点赞数量",
                prop: "likeCnt"
            },
            {
                label: "阅读数量",
                prop: "viewCnt"
            },
            {
                label: "被转发人昵称",
                prop: "XXXXXXXXX_refMemberName"
            },
            {
                label: "被转发帖ID",
                prop: "refBlogId"
            },
            {
                label: "原帖ID",
                prop: "XXXXXXXXXXXX_ID"
            },
            {
                label: "发布时间",
                prop: "createTime"
            },
            {
                label: "帖子状态",
                prop: "XXXXXXXXX_Status"
            },
            {
                label: "审核状态",
                prop: "status",
                render: (scope) => {
                    const { row } = scope;
                    // return h(Status, { status: row.blogPublishType })
                }
            }
        ],

        actionJson: {
            label: "操作1",
            fixed: "right",
            width: "100px",
            btns: [
                {
                    text: "查看",
                    click: shenhe_setting
                },
                {
                    text: "删除",
                    click: shenhe_setting
                }
                // {
                //     text: "重新审核",
                //     click: shenhe_setting
                // },
                // (scope) => {
                //     const isUp = scope.row.up == "2";
                //     return h(ElButton, { type: "text", size: "mini", onClick: () => xiajia_setting(scope) }, { default: () => isUp ? "取消下架" : "下架" })
                // },
                // (scope) => {
                //     const isUp = scope.row.up == "2";
                //     return h(ElButton, { type: "text", size: "mini", onClick: () => pinglun_setting(scope) }, { default: () => isUp ? "可评论" : "不可评论" })
                // },
                // (scope) => {
                //     const isUp = scope.row.up == "2";
                //     return h(ElButton, { type: "text", size: "mini", onClick: () => zhuanfa_setting(scope) }, { default: () => isUp ? "可转发" : "不可转发" })
                // },
                // (scope) => {
                //     const isUp = scope.row.up == "2";
                //     return h(ElButton, { type: "text", size: "mini", onClick: () => share_setting(scope) }, { default: () => isUp ? "可分享" : "不可分享" })
                // },
                // (scope) => {
                //     const isUp = scope.row.up == "2";
                //     return h(ElButton, { type: "text", size: "mini", onClick: () => pinglunzhanshi_setting(scope) }, { default: () => isUp ? "评论展示" : "评论不展示" })
                // },
                // (scope) => {
                //     const isUp = scope.row.up == "2";
                //     return h(ElButton, { type: "text", size: "mini", onClick: () => tuijian_setting(scope) }, { default: () => isUp ? "普通帖子" : "官方推荐帖" })
                // }
            ]
        }
        // actionJson: {}
    });

    return { tableConfig };
}
