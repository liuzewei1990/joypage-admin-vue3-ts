import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { detailListApi, oneDetailListApi, orgTypeDelete } from "../../../apis/index";
export default function (formModelSed, formModelOne) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const router = useRouter();

    //列表
    const tableData = reactive({
        deleteDialogVisible: false, //删除弹窗
        currentRow: "", //删除弹窗时，当前机构数量
        FormData: [
            // {
            //     id:'1',//产品id
            //     orgOneTypeName:'其他',//一级机构类型名称
            //     upId:'1',//一级机构id
            //     orgTypeName:'电放费',//二级机构类型名称
            //     count:'4',//当前机构数量
            //     orderNo:'1',//排序
            //     remarks:'东方不败不不',//备注
            //     level:'1',//级别
            // }
        ]
    });

    // //编辑
    // const handleEditSed = (index,row) =>{
    //     console.log("编辑row",row)
    //     if(row){
    //         formModelSed.title = "修改二级机构类型"
    //         formModelSed.initFormData(row)
    //     }else{
    //         formModelSed.title = "新增二级机构类型"
    //         formModelSed.initFormData()
    //     }
    //     formModelSed.dialogVisibleSed = true
    //     //给弹窗传数据
    //     // formModelSed.initFormData(row)
    // }

    //设置一级机构类型
    // const handleEditOne = () =>{
    //     // formModelOne.newFormItem(tableData.FormData)  //给AddOneLevel传递数据，不能用方法传参这种方式传递，
    //     //因为tableData.FormData数组被tableData引用了，修改tableData后tableData.FormData 也会跟着改变
    //     //两个js 操作一个数组，会导致父组件和子组件列表都会增加，所以需要传递接口最新数据，或者进行深拷贝传递
    //     // console.log(formModelOne)
    //     formModelOne.controlButton = true
    //     oneDetailListApi().then(res =>{
    //         console.log("传给一级机构",res)
    //         res.success.forEach(item =>{
    //             item.isEdit = true
    //         })
    //         formModelOne.newFormItem(res.success)
    //     })

    //     formModelOne.dialogVisibleOne = true
    // }

    //删除
    const handleDelete = (index, row) => {
        // console.log("删除行",index,row)
        if (row) {
            tableData.currentRow = row;
            // console.log(tableData.currentRow )
        }
        tableData.deleteDialogVisible = true;
    };
    //删除列表api
    const deleteConfirm = () => {
        let params = {
            id: tableData.currentRow.id
        };
        orgTypeDelete(params).then((res) => {
            // console.log('删除',res)
            if (res.success) {
                _this.$msg.success("删除成功");
                tableData.deleteDialogVisible = false;
                getTableData();
            }
        });
    };

    //列表数据
    const getTableData = () => {
        detailListApi().then((res) => {
            console.log("列表数据", res);
            res.success.forEach((item) => {
                item.isEdit = true;
            });
            tableData.FormData = res.success;
        });
    };

    return {
        tableData,
        // handleEditSed,
        handleDelete,
        deleteConfirm,
        // handleEditOne,
        getTableData
    };
}
