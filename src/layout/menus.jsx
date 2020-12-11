/*
 * @Descripttion: 左边导航栏
 * @Author: Hades
 * @Date: 2020-12-10 21:35:06
 * @LastEditTime: 2020-12-11 16:35:27
 */

import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'

import routerConfig from '../router_config'

import { changeCollapsed } from '../redux/action'

 const menus = ({collapsed, dispatch}) =>{
    return (
        <Layout.Sider className="menus" collapsible collapsed={collapsed} onCollapse={() =>dispatch(changeCollapsed())}>
             <Link to="/index" className="logo">
                Hades  {collapsed ? null : <span>admin</span>}
            </Link>
            <Menu theme="dark" mode="inline" className="my-menus">
                {renderMenu(routerConfig)}
            </Menu>
        </Layout.Sider>
    )
 }
 const mapStateProps = state => ({ collapsed: state.collapsed})
 export default connect(mapStateProps)(menus);

 const renderMenu = (routerConfig) =>{
    return routerConfig.map( item => {
        if(item.children){
            return (
                <Menu.SubMenu title={<span>{item.name} </span>} key={item.name} >
                    {renderMenu(item.children)}
                </Menu.SubMenu>
            )
        }else{
            return (
                <Menu.Item title={item.name} key={item.name}>
                  <Link to={item.path}>
                      {item.name}</Link>
                </Menu.Item>
              );
        }
    })
 }
