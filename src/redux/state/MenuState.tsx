import * as React from "react";
import {DashboardView} from "../../views/dashboard-view/index";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    ApartmentOutlined
} from '@ant-design/icons';

const MenuState = [
    {
        name: "Dashboard",
        key: "dashboard",
        icon: <PieChartOutlined />,
        role: 0,
        component: <DashboardView/>,
        // children: [
        //     {
        //         name: "Dashboard1",
        //         key: "dashboard1",
        //         icon: <PieChartOutlined />,
        //         role: 0,
        //         component: <DashboardView/>,
        //     }
        // ]
    },
    {
        name: "概况",
        key: "general",
        icon: <ApartmentOutlined />,
        role: 0,
        component: <DashboardView/>,
    }
];
export default MenuState;