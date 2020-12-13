/*
 * @Descripttion: 左边导航栏
 * @Author: Hades
 * @Date: 2020-12-10 21:35:06
 * @LastEditTime: 2020-12-13 11:42:56
 */

import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import { deepMenus} from '../utils'
import { changeCollapsed } from '../redux/action'

 const menus = ({collapsed, dispatch,menus}) =>{
    
    return (
        <Layout.Sider className="menus" collapsible collapsed={collapsed} onCollapse={() =>dispatch(changeCollapsed())}>
             <Link to="/index" className="logo">
                Hades  {collapsed ? null : <span>admin</span>}
            </Link>
            <Menu theme="dark" mode="inline" className="my-menus">
                {renderMenu(menus)}
            </Menu>
        </Layout.Sider>
    )
 }
 const mapStateProps = state => ({ collapsed: state.collapsed,menus: deepMenus(state.userMenus)})
 export default connect(mapStateProps)(menus);

 const renderMenu = (routerConfig) =>{
    return routerConfig.map( item => {
        if(item.children.length>0){
            return (
                <Menu.SubMenu title={<span>{item.name} </span>} key={item.name} >
                    {renderMenu(item.children)}
                </Menu.SubMenu>
            )
        }else{
            return (
                <Menu.Item title={item.name} key={item.name}>
                  <Link to={item.url}>
                      {item.name}</Link>
                </Menu.Item>
              );
        }
    })
 }
