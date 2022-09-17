<template>
    <el-config-provider :locale="locale">
        <router-view v-slot="{ Component, route }">
            <!-- 如果需要keep-alive 在路由组件选项中定义的name与路由表的name一致即可 -->
            <keep-alive :include="$router.options.routes.map((item) => item.name || 'No')">
                <component :is="Component" :key="route.path" />
            </keep-alive>
        </router-view>
    </el-config-provider>
</template>
<script>
    import { ElConfigProvider } from "element-plus";

    import zhCn from "element-plus/lib/locale/lang/zh-cn";
    export default {
        components: {
            [ElConfigProvider.name]: ElConfigProvider
        },
        data() {
            return {
                locale: zhCn
            };
        }
    };
</script>
