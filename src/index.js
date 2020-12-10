/*
 * @Descripttion: 入口文件
 * @Author: Hades
 * @Date: 2020-12-05 16:52:12
 * @LastEditTime: 2020-12-10 22:39:31
 */
import React from 'react';
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux'
import Router from './Router'
import './common.less'
import config from './redux/store'
const store = config()
ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>, 
  document.getElementById('root')
);

