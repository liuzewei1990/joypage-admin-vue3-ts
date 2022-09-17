<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" :index="indexMethod"> </el-table-column>
        <el-table-column prop="date" label="日期" width="180" :render-header="renderHeader"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> 行吗 </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
</template>

<script>
    import { h } from "vue";
    export default {
        data() {
            return {
                tableData: [
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        province: "上海",
                        city: "普陀区",
                        address: "上海市普陀区金沙江路 1518 弄",
                        zip: 200333,
                        tag: "家"
                    },
                    {
                        date: "2016-05-04",
                        name: "王小虎",
                        province: "上海",
                        city: "普陀区",
                        address: "上海市普陀区金沙江路 1517 弄",
                        zip: 200333,
                        tag: "公司"
                    },
                    {
                        date: "2016-05-01",
                        name: "王小虎",
                        province: "上海",
                        city: "普陀区",
                        address: "上海市普陀区金沙江路 1519 弄",
                        zip: 200333,
                        tag: "家"
                    },
                    {
                        date: "2016-05-03",
                        name: "王小虎",
                        province: "上海",
                        city: "普陀区",
                        address: "上海市普陀区金沙江路 1516 弄",
                        zip: 200333,
                        tag: "公司"
                    }
                ]
            };
        },
        methods: {
            indexMethod(index) {
                return index * 2;
            },
            renderHeader() {
                return h("div", {}, [
                    "自定义标题",
                    h("i", {
                        class: "el-icon-arrow-down",
                        style: {
                            fontSize: "12px",
                            transform: "scale(0.8)"
                        }
                    })
                ]);
            }
        }
    };
</script>

<style></style>
