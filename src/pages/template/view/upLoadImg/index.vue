<template>
    <div>
        <uploadImg v-model="advImgUrl" :limit="3" @GetApiData="imgDataApi" :multiple="true"></uploadImg>
    </div>
</template>
<script>
    import uploadImg from "@common/finsuit-components/UpLoadImg";
    import { reactive, toRefs, getCurrentInstance } from "vue";

    export default {
        name: "TodoItem",
        components: {
            uploadImg
        },

        setup() {
            const instance = getCurrentInstance().appContext.config.globalProperties;

            const state = reactive({
                advImgUrl: ""
            });

            const imgDataApi = async ($event) => {
                let { query, callback } = $event;
                console.log(query);
                var formData = new FormData();
                formData.append("name", query);

                let data = await instance.$apis.forUpload(formData).then((res) => res || {});
                console.log(data);
                callback({ list: data });
            };

            return {
                ...toRefs(state),
                imgDataApi
            };
        }
    };
</script>
