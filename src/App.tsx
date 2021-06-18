import React, { useState } from 'react'
import {Route, withRouter} from "react-router"
import {Layout, Menu, Breadcrumb, Button, Spin} from 'antd'
const { Header, Footer, Sider, Content } = Layout;
import logo from './logo.svg'
import './App.css'
import {StudyView} from "./views/study-view/studyView";
import 'antd/dist/antd.less';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import {useSelector} from "react-redux";
import MenuContainer from "./collapsed/menu/menu-container";
// 浏览器 history 新增的 scrollRestortation 属性支持页面恢复后自动滚动到之前滚动的位置。此属性有两个可选值（“auto" 自动和 "manual" 手动) ，默认自动就是滚动恢复。
// 所以，浏览器可以支持或者取消“滚动恢复”，只需设置 widnow.history.scrollRestoration 为 "auto"或者 “manual”即可。
// 但是我们也可以使用 react 的 useEffect 来解决：
// useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
function App() {
  // import.meta.env.VITE_APP_TITLE // vite的环境变量 - 为了防止暴漏环境变量，只有VITE_开头的才会暴漏给用户
  const [collapsed, setCollapsed] = useState(false);
  const state = useSelector((state: any) => {
      console.log(state);
      return state;
  });
  console.log(state);
  const toggle = () => {
      setCollapsed(!collapsed)
  };
  // @ts-ignore
  const renderRoute = (routeArr: any[]) => {
      return routeArr.map(route => {
          if(route.children) {
              return renderRoute(route.children)
          } else {
              return <Route
                  key={route.key}
                  path={"/main/" + route.key}
                  exact={route.exact}
                  render={(props) => {
                      console.log(1111111111);
                      console.log(route.component);
                      // if(route.component) {
                      //     route.component.props = {...props}
                      // }
                      if(!route.component) {
                          // return noResourceView() 404页面
                      }
                      return route.component
                  }}
              >
                  {/*<route.component/>*/}
              </Route>
          }
      });
  };
  return (
    <div className="test-app">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <MenuContainer menuList={state[0]} testProps="test"/>
          </div>
        </Sider>
          <Layout className="site-layout">
              <Header className="site-layout-background" style={{position: 'relative'}}>
                  {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: toggle,
                          style: {
                              fontSize: '25px',
                              verticalAlign: 'middle'
                          }
                      }
                  )}
                  {/*<HeaderView/>*/}
              </Header>
              <Content className="site-layout-background"
                       style={{
                           padding: '10px 15px 0 15px',
                           minHeight: 280,
                           position: 'relative'
                       }}>
                  <div className={"g-modal-mask"} style={{display: state[1].loading ? "block" : "none"}}>
                      <Spin className={"g-spin"} size="large" tip="Loading..."/>
                  </div>
                  {renderRoute(state[0])}
              </Content>
              <Footer
                  style={{
                      textAlign: 'center',
                      padding: '10px 50px',
                      // background: '#f0f2f5',
                      fontSize: 16
                  }}>sean知识体系 ©2021 Created by Sean（基于react hooks，打包工具使用vite）</Footer>
          </Layout>
      </Layout>
      {/*<StudyView/>*/}
    </div>
  )
}

export default withRouter(App)
