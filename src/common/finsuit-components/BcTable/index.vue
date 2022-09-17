<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<!-- 帖子管理 -->
<template>
    <CommonTable @height="tableHeight = $event" v-bind="$attrs">
        <!-- 暴露：搜索插槽 -->
        <template v-slot:search v-if="$slots.search">
            <slot name="search"></slot>
        </template>

        <!-- 暴露：操作区插槽 -->
        <template v-slot:action v-if="$slots.action || isShowRefresh || isShowGrid">
            <div class="clear-float">
                <el-button-group style="float: right">
                    <el-button v-if="isShowRefresh" size="mini" icon="el-icon-refresh" @click="emitGetApiData"></el-button>
                    <el-dropdown v-if="isShowGrid == true && columnJson.length > 0" trigger="click" :hide-on-click="false" max-height="350px">
                        <span class="el-dropdown-link">
                            <el-button size="mini" icon="el-icon-s-grid" style="border-top-left-radius: 0; border-bottom-left-radius: 0"></el-button>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu class="columnJson-dropdown-menu">
                                <el-dropdown-item v-for="item in columnJson" :key="item.prop">
                                    <el-checkbox v-model="item.setting.visible" :disabled="item.setting.disabled">{{ item.label }}</el-checkbox>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-button-group>

                <slot name="action"></slot>
            </div>
        </template>
        <!-- 主体：表格内容 -->
        <template v-slot:default>
            <el-table
                class="bc-el-table"
                ref="elTable"
                v-bind:[height]="$attrs.isFill ? tableHeight - 20 : '100%'"
                v-bind="$attrs"
                size="mini"
                :data="tableData.list"
                style="width: 100%"
                stripe
                :border="true"
                v-loading="loading"
                element-loading-text="loading...">
                <!-- 提供默认插槽，允许你使用插槽的形式渲染模版 -->
                <slot name="column-before"></slot>

                <slot>
                    <!-- *************************通过tableConfig配置列***********************自定义内容列*********************************************************** -->
                    <template v-for="item in columnJson">
                        <el-table-column align="center" :show-overflow-tooltip="true" :key="item.prop" v-bind="item" v-if="item.setting.visible">
                            <template v-slot:default="scope" v-if="item.render">
                                <!-- 通过render函数自定义content  v-if="scope._self.ctx" 解决fixed定位下重复渲染的问题 -->
                                <RenderColumnDom :row="scope.row" v-if="scope._self.ctx" :index="scope.$index" :render="item.render"></RenderColumnDom>
                            </template>
                            <template v-slot:header="scope" v-if="item.renderHeade">
                                <!-- 通过renderHeade函数自定义header，vue3提示：不建议使用renderHeader prop 来渲染，建议使用插槽形式 -->
                                <RenderColumnDom :row="scope.row" :index="scope.$index" :render="item.renderHeade" :column="scope.column"></RenderColumnDom>
                            </template>
                        </el-table-column>
                    </template>

                    <!-- **************************通过tableConfig配置按钮**********************按钮操作区*********************************************************** -->
                    <el-table-column align="center" v-bind="actionJson" v-if="actionJson.label">
                        <template v-slot:default="scope">
                            <template v-if="actionJson.btns" v-for="(item, index) in actionJson.btns" :key="index">
                                <!-- 使用自定义函数配置按钮 注意：这里的 render渲染函数，当fxled有定位时会执行两次，原因见fxied实现原理，详情：https://github.com/ElemeFE/element/issues/12177 -->
                                <RenderColumnDom :render="item" v-if="typeof item === 'function'" :row="scope.row" :index="scope.$index"></RenderColumnDom>
                                <!-- 使用props配置按钮 -->
                                <el-button size="mini" type="text" v-else v-bind="item" @click="item.click && item.click({ row: scope.row, index: scope.$index })">{{ item.text }}</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </slot>

                <!-- 提供默认插槽，允许你使用插槽的形式渲染模版 -->
                <slot name="column-after"></slot>
            </el-table>
        </template>
        <!-- 分页 -->
        <template v-slot:footer v-if="isShowPagination">
            <div class="bc-el-pagination">
                <el-pagination
                    @size-change="pageSizeChange"
                    @current-change="currentPageChange"
                    :current-page="query.currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="query.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total"
                    :hide-on-single-page="false"
                    background></el-pagination>
            </div>
        </template>
        <!-- xxx -->
    </CommonTable>
</template>

<script>
    import { onMounted, reactive, ref, toRaw, toRefs, watchEffect } from "vue";
    import CommonTable from "@common/finsuit-components/CommonTable";
    import RenderColumnDom from "./render-dom.js";
    import createTableApi from "./createTableApi";
    export default {
        components: { CommonTable, RenderColumnDom },
        emits: ["GetApiData"],
        props: {
            tableConfig: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },

        setup(props, ctx) {
            const elTable = ref(null);

            const defaultTableConfig = {
                // 表格数据列表
                list: [],
                // 表格数据总条数
                total: 0,
                // 起始pageSize 默认一页展示10条
                pageSize: 20,
                // 起始页码 默认第1页
                currentPage: 1,
                // 是否显示分页
                isShowPagination: true,
                // 是否显示网格项
                isShowGrid: true,
                // 是否显示刷新按钮
                isShowRefresh: true,
                // table column配置json
                columnJson: [],
                // 按钮操作区配置
                actionJson: {
                    label: "",
                    btns: []
                }
            };
            const tc = { ...defaultTableConfig, ...props.tableConfig };

            // 创建表格请求相关api
            const { tableData, query, loading, startQueryBtn, resetQueryBtn, pageSizeChange, currentPageChange, emitGetApiData } = createTableApi(tc);

            // watch list 和 total变化
            watchEffect(() => {
                tableData.list = props.tableConfig.list;
                tableData.total = props.tableConfig.total || 0;
            });

            // el-table 高度
            const tableHeight = ref(0);
            const height = ref("");

            // 如果isFill是true 给el-table设置height属性 否则不添加height属性
            if (ctx.attrs.isFill) {
                height.value = "height";
            } else {
                height.value = "";
            }

            // 列配置
            tc.columnJson = tc.columnJson.map((item) => {
                item.setting = { visible: true, disabled: false, ...item.setting };
                return item;
            });

            const columnJson = reactive(tc.columnJson);

            const actionJson = tc.actionJson;

            const isShowPagination = tc.isShowPagination;

            const isShowGrid = tc.isShowGrid;

            const isShowRefresh = tc.isShowRefresh;

            return {
                elTable,
                tableHeight,
                height,
                columnJson,
                actionJson,
                tableData,
                query,
                loading,
                isShowPagination,
                isShowGrid,
                isShowRefresh,
                startQueryBtn,
                resetQueryBtn,
                pageSizeChange,
                currentPageChange,
                emitGetApiData
            };
        }
    };
</script>
<style lang="less" scoped>
    .columnJson-dropdown-menu {
        .el-dropdown-menu__item {
            width: 90px;
            // overflow: hidden;
            line-height: 30px;
        }
        /deep/ .el-checkbox__label {
            width: 80px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }
    }
    .bc-el-table {
        min-height: calc(100vh - 400px);
    }

    .drawer-box {
        margin-left: 18px;
    }
    .bc-el-pagination {
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
        margin-bottom: 10px;
    }
</style>
