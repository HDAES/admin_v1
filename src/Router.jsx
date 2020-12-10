/*
 * @Descripttion: 路由文件
 * @Author: Hades
 * @Date: 2020-12-10 16:27:33
 * @LastEditTime: 2020-12-10 16:35:00
 */

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './pages/login'

const router = () =>{
    return (
        <Router>
            <Switch>
                <Route path='/' component={Login} />
            </Switch>
        </Router>
    )
}

export default router;