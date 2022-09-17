# 新项目模板

### 新项目上手指南

-   第一步：快速复制 template 项目集成包创建新的微项目，并启用新的名称，该名称也对应服务器部署目录名，也就是 assetsPublicPath，例如：joyPage
-   第二步：将新项目目录中的 template.js 和 template.html 重命名 : joyPage
-   第三步：npm run dev -joyPage 浏览器输入http://192.168.137.1:8080/joyPage.html
-   第四步：npm run build:【对应环境】 joyPage 将会打包到 项目根目录/【对应环境文件夹名】/joyPage/文件夹中。
-   第五步：将 joyPage 包文件夹放到服务器目录中，浏览器输入域名：https://xxxx.com/xxx/xxx/joyPage/index.html
