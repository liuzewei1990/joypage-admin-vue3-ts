<!--  -->
<template>
    <component ref="SelectRefComponent" :is="types[modelType]"></component>
</template>

<script>
    import { getCurrentInstance, onMounted, reactive, ref } from "vue";

    import SelectById from "./modules/SelectById";
    import SelectByName from "./modules/SelectByName";
    import SelectByObj from "./modules/SelectByObj";
    export default {
        components: { SelectById, SelectByName, SelectByObj },
        props: {
            modelType: {
                type: String,
                default: "id"
            },
            autoGetApiData: {
                type: Boolean,
                default: false
            }
        },
        setup(props) {
            const instance = getCurrentInstance();
            const SelectRefComponent = ref(null);

            const types = reactive({
                id: "SelectById",
                name: "SelectByName",
                obj: "SelectByObj"
            });

            onMounted(() => {
                props.autoGetApiData && SelectRefComponent.value.emitGetApiData();
            });
            return { types, SelectRefComponent };
        }
    };
</script>
<style lang="less" scoped></style>
