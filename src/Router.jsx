/*
 * @Descripttion: 路由文件
 * @Author: Hades
 * @Date: 2020-12-10 16:27:33
 * @LastEditTime: 2020-12-10 22:16:25
 */

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './pages/login'
import Layout from './layout'


const router = () =>{
    return (
        <Router>
            <Switch>
                <Layout>
                    <Route path='/' component={Login} />
                </Layout>
            </Switch>
        </Router>
    )
}

export default router;