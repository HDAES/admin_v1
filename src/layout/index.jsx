/*
 * @Descripttion: 布局文件
 * @Author: Hades
 * @Date: 2020-12-10 21:18:58
 * @LastEditTime: 2020-12-10 23:05:25
 */

import React from 'react';
import {Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menus from './menus'
import Header from './header'
import './index.less'

const layout = ({children}) =>{
    return (
        <Layout className='layout'>
            <Menus />
            <Layout className="main">
                <Header />
                <Scrollbars autoHide>
                    <div className="content">
                        {children}
                    </div>
                </Scrollbars>
            </Layout>
        </Layout>
    )
}

export default layout;