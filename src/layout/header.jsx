/*
 * @Descripttion: 头部
 * @Author: Hades
 * @Date: 2020-12-10 22:49:50
 * @LastEditTime: 2020-12-10 23:18:06
 */
import React, { useState } from 'react';
import { Layout, Badge } from 'antd'
import { connect } from 'react-redux'
import { MenuUnfoldOutlined, MenuFoldOutlined, FullscreenExitOutlined, FullscreenOutlined, BellOutlined} from '@ant-design/icons'

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
            </div>
        </Layout.Header>
    )
}
const mapStateProps = state => ({ collapsed: state.collapsed})
export default connect(mapStateProps)(Header);