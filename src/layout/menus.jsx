/*
 * @Descripttion: 左边导航栏
 * @Author: Hades
 * @Date: 2020-12-10 21:35:06
 * @LastEditTime: 2020-12-10 21:55:29
 */

import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'

import { changeCollapsed } from '../redux/action'

 const menus = ({collapsed, dispatch}) =>{
    return (
        <Layout.Sider className="menus" collapsible collapsed={collapsed} onCollapse={() =>dispatch(changeCollapsed())}>
             <Link to="/index" className="logo">
                Hades  {collapsed ? null : <span>admin</span>}
            </Link>
            <Menu theme="dark" mode="inline" className="my-menus">
                <Menu.Item key="1" >
                    <Link to="/index" >
                        首页
                    </Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    )
 }
 const mapStateProps = state => ({ collapsed: state.collapsed})
 export default connect(mapStateProps)(menus);
