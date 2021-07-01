import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: "./", // 项目根目录，index.html所在位置
  // base: "./public/static", // 开发或生产环境服务的公共基础路径 - 这个选项也可以通过命令行参数指定，例如 vite build --base=/my/public/path/。由 JS 导入的资源路径，CSS 中的 url() 引用，和 .html 文件中的资源引用在构建过程中都会自动调整以适配此选项。
  mode: "development", // serve 时默认 'development'，build 时默认 'production' 也可以通过命令行 --mode 选项来重写。
  define: {  // 定义全局变量替换方式。每项在开发时会被定义为全局变量，而在构建时则是静态替换。
    // a: "bb"
  },
  plugins: [reactRefresh()], // 将要用到的插件数组
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
        // 支持内联 JavaScript
        javascriptEnabled: true, // 注意：若想在.js 等文件中import .css等文件，需要开启javascriptEnabled
        // 全局样式默认导入不怎么修改的样式 - vite的热更新不会重新执行vite.config文件，因此频繁修改的样式不建议采用此方法
        // additionalData: "@import '@styles/style.less';", //引入全局样式 注意：必须要有分号
        // 重写 less 变量，定制样式
        modifyVars: {
          // '@primary-color': 'red',
        },
      }
    },
  },
  json: {
    namedExports: false, // 是否支持从 .json 文件中进行按名导入。
    stringify: false, // 设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...") 会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候。
  },
  esbuild: { // ESBuildOptions 继承自 esbuild 转换选项。最常见的用例是自定义 JSX： 设置成 false 可以禁用 ESbuild 转换（默认应用于 .ts. .tsx 和 .jsx 文件）。
    // 默认情况下，ESbuild 应用在 ts、jsx、tsx 文件。你可以通过 esbuild.include 和 esbuild.exclude 对其进行配置
    // include: "src",
    // exclude: "node_modules",
    // Babel中默认转化jsx使用的是React.createElement， 而preact使用的是h函数， 所以需要将babel中转化jsx的函数替换成preact.h。
    // 首先将Jsx代码通过babel编译成h函数调用；
    // jsxFactory: 'h',
    // jsxFragment: 'Fragment',
    // 此外，你还可以通过esbuild.jsxInject来自动为每一个被 ESbuild 转换的文件注入 JSX helper。
    // jsxInject: `import React from 'react'`
  },
  // 行为类似于 Webpack 的 file-loader。区别在于导入既可以使用绝对公共路径（基于开发期间的项目根路径），也可以使用相对路径。
  // 常见的图像、媒体和字体文件类型被自动检测为资源。你可以使用 assetsInclude 选项 扩展内部列表。
  // 引用的资源作为构建资源图的一部分包括在内，将生成散列文件名，并可以由插件进行处理以进行优化。
  // 较小的资源体积小于 assetsInlineLimit 选项值 则会被内联为 base64 data URL。
  assetsInclude: "", // 指定其他文件类型作为静态资源处理（这样导入它们就会返回解析后的 URL） - 将资源引入为 URL
  logLevel: "info", // 调整控制台输出的级别，默认为 'info'。
  clearScreen: true, // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。命令行模式下请通过 --clearScreen false 设置。
  server: {
    host: 'localhost', // 指定服务器主机名
    port: 3000, // 端口
    strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    https: false, // 启用 TLS + HTTP/2。注意当 server.proxy option 也被使用时，将会仅使用 TLS。
    open: true, // "./src/index.html", // 在服务器启动时自动在浏览器中打开应用程序。当此值为字符串时，会被用作 URL 的路径名。
    proxy: { // ajax服务代理 - 类似webpack的poxy
      // 字符串简写写法
      '/foo': 'http://localhost:4567/foo',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      }
    },
    cors: { // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用。

    },
    force: false, // 设置为 true 强制使依赖预构建。
    hmr: false, // 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。
    watch: {
      alwaysStat: false,
      atomic: undefined,
      awaitWriteFinish: undefined,
      binaryInterval: 0,
      cwd: "",
      depth: 0,
      disableGlobbing: false,
      followSymlinks: false,
      ignoreInitial: false,
      ignorePermissionErrors: false,
      ignored: undefined,
      interval: 0,
      persistent: false,
      useFsEvents: false,
      usePolling: false,
    }, // 传递给 chokidar 的文件系统监视器选项。
  },
  build: {
    // 默认值是一个 Vite 特有的值，'modules'，这是指 支持原生 ES 模块的浏览器。
    // 另一个特殊值是 “esnext” —— 即指执行 minify 转换（作最小化压缩）并假设有原生动态导入支持。
    // 转换过程将会由 esbuild 执行，并且此值应该是一个合法的 esbuild 目标选项。自定义目标也可以是一个 ES 版本（例如：es2015）、一个浏览器版本（例如：chrome58）或是多个目标组成的一个数组。
    target: "", // 设置最终构建的浏览器兼容目标。 -- 注意，如果代码包含不能被 esbuild 安全地编译的特性，那么构建将会失败。
    outDir: "dist", // 指定输出路径（相对于 项目根目录).
    // assetsDir: "static", // 指定生成静态资源的存放路径（相对于 build.outDir）。
    assetsInlineLimit: 0, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    // 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在块加载时插入。
    sourcemap: true, // 构建后是否生成 source map 文件。
    rollupOptions: {}, // 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并。
    commonjsOptions: {}, // 传递给 @rollup/plugin-commonjs 插件的选项。
    minify: "terser", // 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认为 Terser，虽然 Terser 相对较慢，但大多数情况下构建后的文件体积更小。ESbuild 最小化混淆更快但构建后的文件相对更大。
    write: true, // 设置为 false 来禁用将构建后的文件写入磁盘。这常用于 编程式地调用 build() 在写入磁盘之前，需要对构建后的文件进行进一步处理。
    // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。若 outDir 在根目录之外则会抛出一个警告避免意外删除掉重要的文件。可以设置该选项来关闭这个警告。该功能也可以通过命令行参数 --emptyOutDir 来使用。
    emptyOutDir: false, // 若 outDir 在 root 目录下，则为 true
    brotliSize: false, // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    chunkSizeWarningLimit: 500,// chunk 大小警告的限制（以 kbs 为单位）。
  },
  // optimizeDeps: { // 依赖优化选项
  //   // 如果这两者都不适合你的需要，则可以使用此选项指定自定义条目 - 该值需要遵循 fast-glob 模式 ，或者是相对于 vite 项目根的模式数组。这将覆盖掉默认条目推断。
  //   entries: "", // 默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项。如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点。
  //   exclude: [ // 在预构建中强制排除的依赖项。
  //
  //   ],
  //   include: [], // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
  // }
})
