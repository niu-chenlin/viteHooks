import * as React from "react";
import {useHistory, useLocation, useParams, useRouteMatch, withRouter} from "react-router";
import {useCallback, useEffect, useMemo, useState} from "react";
import {GLOBAL_ROLE} from "../../util/global-bariable/GlobalBariable";
import {Menu} from "antd";
const { SubMenu } = Menu;

// 容器组件 - 菜单
const MenuContainer: React.FC<{menuList: any, testProps: string}> = (props: any) => {
    console.log(props);
    //@ts-ignore
    let { sulg } = useParams();
    let location = useLocation();
    let history = useHistory();
    let match = useRouteMatch({ // 将任何“浮动”（不在 a 内<Switch>）<Route>元素替换为useRouteMatch
        path: '/BLOG/:slug/',
        strict: true,
        sensitive: true
    });
    // {match ? <BlogPost match={match} /> : <NotFound />}
    console.log(sulg);
    console.log(location);
    console.log(history);
    console.log(match);
    // 根据role取出对应的菜单
    const menuListByRole = useMemo(() => { // useMemo返回缓存（memoized）的变量，useCallback返回缓存（memoized）的函数。
        return props.menuList.filter((menu: any) => (menu.role === GLOBAL_ROLE));
    }, [props]);
    console.log(menuListByRole);

    let renderMenu = useCallback((menuArr) => { // 递归中的useCallback肯定会重复调用
        console.log("useCallback");
        return menuArr.map((menu: any) => {
            if(menu.children) {
                return <SubMenu key={menu.key} icon={menu.icon} title={menu.name}>
                    {renderMenu(menu.children)}
                </SubMenu>
            } else {
                return <Menu.Item key={menu.key} icon={menu.icon}>
                    {menu.name}
                </Menu.Item>
            }
        });
    }, [menuListByRole]);

    // let renderMenu = (menuArr: any[]) => {
    //     console.log("renderMenu");
    //     return menuArr.map(menu => {
    //         if(menu.children) {
    //             return <SubMenu key={menu.key} icon={menu.icon} title={menu.name}>
    //                 {renderMenu(menu.children)}
    //             </SubMenu>
    //         } else {
    //             return <Menu.Item key={menu.key} icon={menu.icon}>
    //                 {menu.name}
    //             </Menu.Item>
    //         }
    //     });
    // };
    // console.log(renderMenu(menuListByRole));
    const [menuState, setMenuState] = useState(renderMenu(menuListByRole));
    console.log(menuState);

    const menuOnClick = (e: any) => {
        console.log(e);
        history.push('/main/' + e.key);
    };
    return <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={menuOnClick}>
        {menuState}
    </Menu>
};
// @ts-ignore
// export default withRouter(MenuContainer) // 在 5.1 中没有被弃用，但当你可以用钩子组合你的状态时，它是一个奇怪的 API。它也很可能在未来的版本中被弃用。
export default MenuContainer