/*
 * @Descripttion: 路由文件
 * @Author: Hades
 * @Date: 2020-12-10 16:27:33
 * @LastEditTime: 2020-12-17 16:10:25
 */

import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './pages/login'
import RouterConfig from './router_config'
import { userMenusUrl} from './utils'
const router = ({menus,user}) =>{

    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login}/>
                {
                    RouteWithSubRoutes(userMenusUrl(menus,user),RouterConfig)
                    
                }
            </Switch>
        </Router>
    )
}

const mapStateProps = state => ({menus:state.userMenus,user:state.user})

export default connect(mapStateProps)(router);

const RouteWithSubRoutes = (menusUrl,routerConfig) =>{
    return  routerConfig.map( (item, index) =>{
        if(item.children ){
            return <Route path={item.path} key={index} render={ () =>{
                if(item.component!=null){
                    return <item.component>
                        { RouteWithSubRoutes(menusUrl,item.children)} 
                    </item.component>
                }   
            }}/>
        }else{
            return menusUrl.indexOf(item.path)>-1?<Route  {...item} key={index}/>
            : <Route path={item.path}  render={ () => <Redirect to="/login"/>} key={index}/>
        }
    })
}

