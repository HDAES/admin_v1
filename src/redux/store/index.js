/*
 * @Descripttion: redux文件
 * @Author: Hades
 * @Date: 2020-12-10 21:28:19
 * @LastEditTime: 2020-12-10 21:30:37
 */

import { createStore } from 'redux'
import reducer from '../reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

let store = ''

if(process.env.NODE_ENV === 'development'){
    store = () => createStore(reducer,composeWithDevTools()) 
}else{
    store = () => createStore(reducer) 
}

export default store
