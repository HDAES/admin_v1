/*
 * @Descripttion: 请求方法
 * @Author: Hades
 * @Date: 2020-12-11 16:48:13
 * @LastEditTime: 2021-02-02 15:33:03
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

export function getUserList(){
    return http({
        method:'get',
        url:api.userList
    })
}

export function getDelectUser(id){
    return http({
        method:'get',
        url:api.delectUser+`/${id}`,
        all:true,
    })
}

export function postAddUser(data){
    return http({
        method:'post',
        url:api.addUser,
        data,
        all:true,
    })
}


export function postUpdateUser(data){
    return http({
        method:'post',
        url:api.updateUser,
        data,
        all:true,
    })
}

export function postAddSort(data){
    return http({
        method:'post',
        url:api.addSort,
        data,
        all:true
    })
}

export function getSort(){
    return http({
        method:'get',
        url:api.getSort
    })
}

export function getDelSort(id){
    return http({
        method:'get',
        url:api.delSort+`/${id}`,
        all:true
    })
}

export function postUpdateSort(data){
    return http({
        method:'post',
        url:api.updateSort,
        data,
        all:true
    })
}
export function postAddTags(data){
    return http({
        method:'post',
        url:api.addTags,
        data,
        all:true
    })
}
export function getTags(){
    return http({
        method:'get',
        url:api.tags,
    })
}
export function PostUpdateTags(data){
    return http({
        method:'post',
        url:api.updateTags,
        data,
        all:true
    })
}
export function getDelTags(id){
    return http({
        method:'get',
        url:api.delTags+`/${id}`,
        all:true
    })
}

export function getDetails(){
    return http({
        method:'get',
        url:api.blogDetails,
        all:true
    })
}

export function postDetails(data){
    return http({
        method:'post',
        url:api.blogDetails,
        data,
        all:true
    })
}

export function delDetails(id){
    return http({
        method:'delete',
        url:api.blogDetails+`/${id}`,
        all:true
    })
}

export function putDetails(data){
    return http({
        method:'put',
        url:api.blogDetails,
        data,
        all:true
    })
}

export function getContent(id){
    return http({
        method:'get',
        url:api.blogContent+`/${id}`
    })
}

export function PostContent(data){
    return http({
        method:'Post',
        url:api.blogContent,
        data,
        all:true
    })
}

export function putContent(data){
    return http({
        method:'put',
        url:api.blogContent,
        data,
    })
}

export function postImage(data){
    return http({
        method:'POST',
        url:api.uploadOss,
        headers:{"Content-Type":"multipart/form-data"},
        data
    })
}

export function postSaying(data){
    return http({
        method:'POST',
        url:api.saying,
        data
    }) 
}
export function getSaying(){
    return http({
        method:'get',
        url:api.saying
    }) 
}

export function delSaying(id){
    return http({
        method:'delete',
        url:api.saying+`/${id}`
    }) 
}

export function putSaying(data){
    return http({
        method:'put',
        url:api.saying,
        data
    }) 
}

export function getApiList(){
    return http({
        method:'get',
        url:api.testApi
    })
}
