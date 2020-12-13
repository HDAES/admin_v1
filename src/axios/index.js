/*
 * @Descripttion: 请求方法
 * @Author: Hades
 * @Date: 2020-12-11 16:48:13
 * @LastEditTime: 2020-12-13 18:43:31
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
