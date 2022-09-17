import { getCurrentInstance, ref, reactive, toRefs } from "vue";
/**
 * 操作逻辑区Api
 */
export default function (formModel, getSelectTMPage) {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    // console.log('instance',instance)
    // console.log('formModel',formModel)
    // 批操作按钮

    //向上移动
    const moveUpClick = async (itemId, upItemId) => {
        console.log("moveUp", itemId, upItemId);
        let params = {
            id: itemId, //当前分区id
            upId: upItemId //上移的分区id
        };
        let data = await _this.$apis.moveUp(params).then((res) => {
            if (res.success) {
                _this.$msg.success("上移成功");
                getSelectTMPage(); //刷新列表
            }
        });
    };

    //向下移动
    const moveDownClick = async (itemId, downItemId) => {
        console.log("moveDown", itemId, downItemId);
        let params = {
            id: itemId, //当前分区id
            DownId: downItemId //下移的分区id
        };
        let data = await _this.$apis.moveDown(params).then((res) => {
            if (res.success) {
                _this.$msg.success("下移成功");
                getSelectTMPage(); //刷新列表
            }
        });
    };

    // //新增分区/新增按钮
    const handleAdd = async (item, type, partitionName) => {
        if (item.id) {
            //新增按钮和修改
            if (type == 1) {
                //新增按钮
                // console.log('新增按钮',item,type)//item为分区item
                formModel.title = "新增按钮";
                console.log("", formModel.formData);
                let data = {
                    partitionId: item.id, //分区id
                    porderNum: item.orderNum, //分区的排序
                    partitionName: item.partitionName //分区name
                    // partitionName:'分区'+ partitionName,
                };
                formModel.initFormData(data); //传值 data
                getSelectTMPage(); //刷新列表
            } else {
                //修改
                console.log("修改", item, type);
                formModel.title = "修改";
                let data = { ...item, partitionName }; //将，分区name，与修改的item合并
                // let data = {...item,partitionName:'分区'+ partitionName} //将，分区name，与修改的item合并
                formModel.initFormData(data); //传 当前按钮item
                getSelectTMPage(); //刷新列表
            }
        } else {
            //新增分区
            console.log("新增分区");
            formModel.title = "新增分区";
            // //调分初始值接口
            let data = await _this.$apis.partitionSelect().then((res) => {
                return res.success;
            });
            // let obj= {...data,partitionName:'分区'+ partitionName}
            console.log("初始分区值.........", data);
            formModel.initFormData(data); //传值data
            getSelectTMPage(); //刷新列表
        }
        formModel.dialogVisible = true; //先赋值，再弹窗
        //要放到下面，先获取穿进来的值，在展示弹窗，否则，每次点击完修改，关闭弹窗，再点击新增的时候，图片还在，应该是获取到上面设置为空的值，在展示弹窗，此时的图片就是空的；
    };

    //删除按钮
    const handleDelete = (itemId, partitionId) => {
        _this
            .$confirm("是否确定删除", "提示", { type: "warning" })
            .then(() => {
                console.log("删除", itemId, partitionId);
                let params = {
                    id: itemId, //当前按钮id
                    partitionId: partitionId //分区id
                };
                let data = _this.$apis.buttonDelete(params).then((res) => {
                    if (res.success) {
                        _this.$msg.success("删除成功");
                        getSelectTMPage(); //刷新列表
                    }
                });
            })
            .catch(() => {
                console.log(_this);
                _this.$message.info("已取消删除");
            });
    };

    return {
        handleAdd,
        moveUpClick,
        moveDownClick,
        handleDelete
    };
}
