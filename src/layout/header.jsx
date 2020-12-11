/*
 * @Descripttion: 头部
 * @Author: Hades
 * @Date: 2020-12-10 22:49:50
 * @LastEditTime: 2020-12-11 15:23:36
 */
import React, { useState } from 'react';
import { Layout, Badge, Dropdown, Menu, Avatar} from 'antd'
import { connect } from 'react-redux'
import { MenuUnfoldOutlined, MenuFoldOutlined, FullscreenExitOutlined, FullscreenOutlined, BellOutlined, UserOutlined} from '@ant-design/icons'

import { changeCollapsed } from '../redux/action'

const Header = ({collapsed,dispatch}) =>{
    const [full, setFull] = useState(false);

    const handleFull = () => {
        let dos = document.documentElement;
        if (full) {
        if (document.exitFullScreen) {
            document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setFull(false);
        } else {
        if (dos.requestFullscreen) {
            dos.requestFullscreen();
        } else if (dos.mozRequestFullScreen) {
            dos.mozRequestFullScreen();
        } else if (dos.webkitRequestFullScreen) {
            dos.webkitRequestFullScreen();
        }
        setFull(true);
        }
    }

    const menu = (
        <Menu>
          <Menu.Item key="1">关于admin</Menu.Item>
          <Menu.Item key="2">项目仓库</Menu.Item>
          <Menu.Item key="3">返回首页</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="4">退出登录</Menu.Item>
        </Menu>
      );
    return (
        <Layout.Header className="header">
            {
                collapsed? <MenuUnfoldOutlined style={{fontSize:24}} onClick={()=>dispatch(changeCollapsed())}/>:
                <MenuFoldOutlined style={{fontSize:24}} onClick={()=>dispatch(changeCollapsed())}/>
            }
            <div className="right">
                {
                    full ? <FullscreenExitOutlined className="icon-btn" onClick={handleFull} /> : <FullscreenOutlined className="icon-btn" onClick={handleFull} />
                }
                <Badge dot>
                    <BellOutlined className="icon-btn" />
                </Badge>
                <Dropdown overlay={menu}>
                    <div className="avatar" > 
                        <Avatar size={36} icon={<UserOutlined />} />
                        <span style={{ marginLeft: 10 }}>管理员</span>
                    </div>
                </Dropdown>
            </div>
        </Layout.Header>
    )
}
const mapStateProps = state => ({ collapsed: state.collapsed})
export default connect(mapStateProps)(Header);