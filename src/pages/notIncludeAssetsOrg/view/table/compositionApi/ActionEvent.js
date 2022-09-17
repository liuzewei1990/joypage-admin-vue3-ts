import { getCurrentInstance, ref } from "vue";

/**
 * 操作逻辑区Api
 */
export default function () {
    const instance = getCurrentInstance();
    const _this = instance.appContext.config.globalProperties;
    const dialogVisible = ref(false);
    // 批操作按钮
    const test = () => {
        _this.$msg.success("点我啦~");
    };

    //向上移动
    const moveUp = (item, index) => {
        _this.$msg.success("向上按钮~");
        console.log("platformRightsList", index);
        console.log("platformRightsList", item);
        // let temp = this.tableList[index-1];
        // Vue.set(this.tableList, index-1, this.tableList[index])
        // Vue.set(this.tableList, index, temp)
    };

    //向下移动
    const moveDown = () => {
        _this.$msg.success("向下按钮~");
        // let i = this.tableList[index+1];
        // Vue.set(this.tableList, index+1, this.tableList[index])
        // Vue.set(this.tableList, index, i)
    };

    //新增分区/新增按钮
    const handleAdd = () => {
        // console.log('1',dialogVisible.value)
        dialogVisible.value = true;
    };

    //删除按钮
    const handleDelete = () => {};

    return { test, moveUp, moveDown, handleAdd, handleDelete };
}
