import React, { useState } from 'react';
import { Avatar, Image, Space, Badge, Dropdown, Menu, message } from 'antd';
import {
    BellOutlined,
    SettingOutlined,
    FormOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {useHistory} from "react-router";

export const HeaderView: React.FC<{}> = () => {
    console.log("header-view");
    const history = useHistory();
    const onMenuClick = (event: any, type: string) => {
        console.log(11111111111111);
        event.stopPropagation();
        event.preventDefault();
        switch (type) {
            case "logout":
                // AuthorTool.clearAuthor();
                // console.log(this.props.history);
                // history.push("/login");
                message.info('登录中...');
                break;
            default :
                message.info('等待开发中...');
        }
    };
    const initMenu = () => {
        return <Menu>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="#" onClick={(e) => onMenuClick(e,'set-info')}>
                    <SettingOutlined />  &nbsp;&nbsp;修改个人信息
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="#" onClick={(e) => onMenuClick(e,'up-pwd')}>
                    <FormOutlined />  &nbsp;&nbsp;修改密码
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="#" onClick={(e) => onMenuClick(e,'re-pwd')}>
                    <EditOutlined />  &nbsp;&nbsp;重置密码
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="#" onClick={(e) => onMenuClick(e,'logout')}>
                    <LogoutOutlined />  &nbsp;&nbsp;退出登录
                </a>
            </Menu.Item>
        </Menu>
    };
    return <div id="header-view">
          <Dropdown overlay={initMenu()} placement="bottomRight" arrow>
              <Avatar><i className="iconfont g-mouse-hand">&#xe6a0;</i></Avatar>
          </Dropdown>
    </div>
};