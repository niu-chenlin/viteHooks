import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginReact from 'vite-plugin-react' // react热更新 插件 reactRefresh必须结合 必须安装它reactRefresh才可用
import antdViteImportPlugin from 'antd-vite-import-plugin'; // antd按需导入插件 - 不兼容
// // import importPlugin from 'babel-plugin-named-asset-import';
// import importPlugin from 'vite-plugin-babel-import';
import vitePluginImp  from 'vite-plugin-imp';
import { resolve } from 'path';

// vite-plugin-react react热更新 必须安装 核心功能热更新依赖react-refresh。react-refresh是react官方推出的用于替代react-hot-loader的热更新机制
// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
    root: "./", // 项目根目录，index.html所在位置
    // base: "./public/static", // 开发或生产环境服务的公共基础路径 - 这个选项也可以通过命令行参数指定，例如 vite build --base=/my/public/path/。由 JS 导入的资源路径，CSS 中的 url() 引用，和 .html 文件中的资源引用在构建过程中都会自动调整以适配此选项。
    mode: "development", // serve 时默认 'development'，build 时默认 'production' 也可以通过命令行 --mode 选项来重写。
    define: {  // 定义全局变量替换方式。每项在开发时会被定义为全局变量，而在构建时则是静态替换。
        // a: "bb"
    },
    plugins: [
        reactRefresh(),
        vitePluginImp({ // 配置antd按需引入css后 就不用再全局引入less了 否则报错
            // @ts-ignore
            libList: [
                {
                    libName: 'antd',
                    style: (name) => `antd/es/${name}/style`,
                },
            ],
        })
    ], // 将要用到的插件数组
    // publicDir: "./src/public/static", // 作为静态资源服务的文件夹。这个目录中的文件会再开发中被服务于 /，在构建时，会被拷贝到 outDir 根目录，并没有转换，永远只是复制到这里。该值可以是文件系统的绝对路径，也可以是相对于项目根的路径。
    alias: {
        '@styles': resolve(__dirname, './src/public/static') // 这样在模块中导入时@就指向src目录
    },
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 导入时想要省略的扩展名列表。
    },
    css: {
        // 使用 CSS Module
        // 修改 CSS 文件名为 CSS Module 格式即可，无需配置，Vite 默认支持。
        // index.css --> index.module.css
        // index.scss --> index.module.scss
        // index.less --> index.module.less

        // modules: {}, // 配置 CSS modules 的行为。选项将被传递给 postcss-modules。
        // // 注意，如果提供了该内联配置，Vite 将不会搜索其他 PostCSS 配置源。
        postcss: {
            plugins: [ // 自动添加css前缀 可以在vite.config.js文件中配置 或 新建 postcss.config.js配置文件
                require('autoprefixer')
            ]
        }, // 内联的 PostCSS 配置（格式同 postcss.config.js），或者一个（默认基于项目根目录的）自定义的 PostCSS 配置路径。其路径搜索是通过 postcss-load-config 实现的。
        preprocessorOptions: { // 指定传递给 CSS 预处理器的选项。
            // scss: {
            //   additionalData: `$injectedColor: orange;`
            // }
            // less: {
            //   additionalData: "@import './src/public/static/style.less'"
            // }
            less: {
                javascriptEnabled: true,
            },
        }
    },
    server: {
        hmr: true, // 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。
        watch: {}
    }
})