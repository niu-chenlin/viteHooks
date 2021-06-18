import React, { useState } from 'react'
import {withRouter} from "react-router"
import {Layout, Menu, Breadcrumb, Button, Spin} from 'antd'
const { Header, Footer, Sider, Content } = Layout;
import logo from './logo.svg'
import './App.css'
import {StudyView} from "./views/study-view/studyView";

function App() {
  // import.meta.env.VITE_APP_TITLE // vite的环境变量 - 为了防止暴漏环境变量，只有VITE_开头的才会暴漏给用户
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="App">
      {/*<Layout style={{ minHeight: '100vh' }}>*/}
        {/*<Sider trigger={null} collapsible collapsed={collapsed}>*/}
          {/*<div className="logo">*/}
            {/*/!*<MenuContainer menuList={state[0]}/>*!/*/}
          {/*</div>*/}
        {/*</Sider>*/}
      {/*</Layout>*/}
      <StudyView/>
    </div>
  )
}

export default withRouter(App)
