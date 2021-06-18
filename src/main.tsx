import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './index.css'
import App from './App'
import store from "./redux/store"
import {Redirect, Route, Switch} from "react-router"
import {HashRouter, BrowserRouter} from "react-router-dom"

const Main: React.FC<{}> = () => {
    return <Switch>
        {/*<Route path={'/login'} exact render={() => {*/}
            {/*return <LoginView/>*/}
        {/*}}/>*/}
        <Route path={"/main"} render={()=>{ // replace 定位到一个页面后不能点击返回 goBack 不会往页面历史中增加
            return (
                // store 作为一个 prop 传给 Provider 组件，让其所有子组件都可以访问到store
                // 原理是通过react context（上下文）实现的 本质上 Provider 就是给 connect 提供 store 用的
                <Provider store={store}>
                    <App/>
                </Provider>
            )
        }}/>
        <Route render={()=>{return <Redirect to={'/main'}/>}}/>
    </Switch>
};

ReactDOM.render(
    <HashRouter>
        <Main/>
    </HashRouter>,
  document.getElementById('root')
);

// "dev": "vite", // 启动开发服务器
// "build": "vite build", // 为生产环境构建产物
// "serve": "vite preview" // 本地预览生产构建产物
// 值得注意的是 vite preview 旨在提供一个生产版本的本地预览，但不应直接作为一个生产服务器。

// import { someMethod } from 'my-dep'
// 上面的操作将在浏览器中抛出一个错误。Vite 将在服务的所有源文件中检测此类裸模块导入，并执行以下操作:
// 1.预构建 他们以提升页面重载速度，并将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由 esbuild 执行，这使得 Vite 的冷启动时间比任何基于 javascript 的打包程序都要快得多。
// 2.重写导入为合法的 URL，例如 /node_modules/.vite/my-dep.js?v=f3sf2ebd 以便浏览器能够正确导入它们。

// 依赖是强缓存的 - vite最大的特点是它使用了浏览器部分功能（结合浏览器完成缓存）
// Vite 通过 HTTP 头来缓存请求得到的依赖。

// 模块热重载
// Vite 提供了一套原生 ESM 的 HMR API。 具有 HMR 功能的框架可以利用该 API 提供即时、准确的更新，而无需重新加载页面或删除应用程序状态。Vite 提供了第一优先级的 HMR 集成给 Vue 单文件组件（SFC） 和 React Fast Refresh。

// TypeScript
// Vite 仅执行 .ts 文件的翻译工作，并 不 执行任何类型检查。并假设类型检查已经被你的 IDE 或构建过程接管了。
// Vite 使用 esbuild 将 TypeScript 翻译到 JavaScript，约是 tsc 速度的 20~30 倍，同时 HMR 更新反映到浏览器的时间小于 50ms。
// 注意因为 esbuild 只执行转译工作而不含类型信息，所以它无需支持 TypeScript 的特定功能例如常量枚举和隐式 “type-only” 导入。你必须在你的
// tsconfig.json 中的 compilerOptions 里设置 "isolatedModules": true，这样 TS 才会警告你哪些功能无法与独立编译模式一同工作。

// CSS 代码分割
// Vite 会自动地将一个异步 chunk 模块中使用到的 CSS 代码抽取出来并为其生成一个单独的文件。这个 CSS 文件将在该异步 chunk 加载完成时自动通过一个 <link> 标签载入，该异步 chunk 会保证只在 CSS 加载完毕后再执行，避免发生 FOUC 。
// 如果你更倾向于将所有的 CSS 抽取到一个文件中，你可以通过设置 build.cssCodeSplit 为 false 来禁用 CSS 代码分割。

// vite build --mode staging 使用命令时更换模式，在此模式下的环境变量将在staging文件中被定义
// .env.staging 文件：
// # .env.staging
// NODE_ENV=production
// VITE_APP_TITLE=My App (staging)
