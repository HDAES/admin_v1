/*
 * @Descripttion: 路由文件
 * @Author: Hades
 * @Date: 2020-12-10 16:27:33
 * @LastEditTime: 2020-12-11 16:43:10
 */

import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/login'
import RouterConfig from './router_config'

const router = () =>{

    console.log()

    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login}/>
                {
                    RouteWithSubRoutes(RouterConfig)
                }
            </Switch>
        </Router>
    )
}

export default router;

const RouteWithSubRoutes = routerConfig =>{
    return  routerConfig.map( (item, index) =>{
        if(item.children){
            return <Route path={item.path} key={index} render={ () =>{
                if(item.component!=null){
                    return <item.component>
                        { RouteWithSubRoutes(item.children)} 
                    </item.component>
                }   
            }}/>
        }else{
            return item.auth?<Route  {...item} key={index}/>
            : <Route path={item.path}  render={ () => <Redirect to="/login"/>} key={index}/>
        }
    })
}