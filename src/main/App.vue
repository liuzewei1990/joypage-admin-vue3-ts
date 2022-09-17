<template>
    <router-view v-slot="{ Component, route }">
        <!-- 如果需要keep-alive 在路由组件选项中定义的name与路由表的name一致即可 -->
        <keep-alive :include="$router.options.routes.map((item) => item.name || 'No')">
            <component :is="Component" :key="route.path" />
        </keep-alive>
    </router-view>
</template>
