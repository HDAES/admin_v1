/*
 * @Descripttion: 请求方法
 * @Author: Hades
 * @Date: 2020-12-11 16:48:13
 * @LastEditTime: 2020-12-16 11:02:55
 */

import http from './http'
import api from './api'

export function postLogin(data) {
    return http({
        method:'post',
        url:api.login,
        data
    })
}

export function postAddMenu(data) {
    return http({
        method:'post',
        url:api.addMenu,
        data
    })
}
export function postUpdateMenu(data) {
    return http({
        method:'post',
        url:api.updateMenu,
        all:true,
        data
    })
}

export function getRemoveMenu(id) {
    return http({
        method:'get',
        url:api.delMenu+`/${id}`,
        all:true,
    })
}

//获取用户组
export function getUserGroup(){
    return http({
        method:'get',
        url:api.usergroup
    })
}

export function postAddGroup(data){
    return http({
        method:'post',
        url:api.addGroup,
        data,
        all:true,
    })
}

export function getDelGroup(id){
    return http({
        method:'get',
        url:api.delGroup+`/${id}`,
        all:true,
    })
}

export function postUpdateGroup(data){
    return http({
        method:'post',
        url:api.updateGroup,
        data,
        all:true,
    })
}
