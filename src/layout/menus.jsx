/*
 * @Descripttion: 左边导航栏
 * @Author: Hades
 * @Date: 2020-12-10 21:35:06
 * @LastEditTime: 2020-12-17 16:22:42
 */

import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import { deepMenus} from '../utils'
import { changeCollapsed } from '../redux/action'

 const menus = ({collapsed, dispatch, menus, user}) =>{
    
    const a = () =>{
        const arrMenus = user.menus.split(',')
        let tempMenus = []
        menus.forEach( item =>{
            if(arrMenus.indexOf(item.id)>-1){
                tempMenus.push(item)
            }
        })
        return tempMenus
    }

    return (
        <Layout.Sider className="menus" collapsible collapsed={collapsed} onCollapse={() =>dispatch(changeCollapsed())}>
             <Link to="/index" className="logo">
                Hades  {collapsed ? null : <span>admin</span>}
            </Link>
            <Menu theme="dark" mode="inline" className="my-menus">
                {renderMenu(deepMenus(a(menus)))}
            </Menu>
        </Layout.Sider>
    )
 }
 const mapStateProps = state => ({ collapsed: state.collapsed,menus: state.userMenus,user:state.user})
 export default connect(mapStateProps)(menus);

 const renderMenu = (routerConfig) =>{
    return routerConfig.map( item => {
        if(item.children.length>0 ){
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
