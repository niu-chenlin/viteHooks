import * as React from "react";
import {DashboardView} from "../../views/dashboard-view/dashboard-view";
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
import {GeneralView} from "../../views/general-view/general-view";
import {HooksView} from "../../views/hooks-view/hooks-view";

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
        component: <GeneralView/>,
    },
    {
        name: "Hooks使用",
        key: "hooks",
        icon: <DesktopOutlined />,
        role: 0,
        component: <HooksView/>,
    }
];
export default MenuState;