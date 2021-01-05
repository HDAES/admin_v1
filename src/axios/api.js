/*
 * @Descripttion: 请求路径
 * @Author: Hades
 * @Date: 2020-12-11 16:46:45
 * @LastEditTime: 2021-01-05 14:25:10
 */

let serverUrl = ''

//let serverUrl1 = 'http://cqapi.iutme.com'
//判断运行环境
if(process.env.NODE_ENV === 'development'){
    //serverUrl = 'http://sb.xl686.com'
    serverUrl = 'http://127.0.0.1:8001' 
}else{
    serverUrl = 'http://sb.xl686.com'
}


const Apis = {
    serverUrl,
    login: serverUrl + '/admin/login', //登录
    addMenu: serverUrl + '/admin/menu/add',//添加菜单
    updateMenu: serverUrl+'/admin/menu/update',//修改菜单
    delMenu: serverUrl+"/admin/menu/delMenu",
    usergroup: serverUrl+'/admin/usergroup',//用户组
    addGroup: serverUrl+'/admin/usergroup/addGroup',//添加用户组
    delGroup: serverUrl+'/admin/usergroup/delGroup',//删除用户组
    updateGroup: serverUrl+'/admin/usergroup/updateGroup',//修改用户组
    userList: serverUrl+'/admin/user/getUserList',//获取用户
    delectUser: serverUrl+'/admin/user/delectUser',//删除用户
    addUser:serverUrl+'/admin/user/addUser',//添加用户
    updateUser: serverUrl+'/admin/user/updateUser',//修改用户
    addSort:serverUrl+'/admin/blog/sort/add',//添加分类
    getSort: serverUrl+'/admin/blog/sort' ,//得到所有分类
    delSort: serverUrl+ '/admin/blog/sort/del',//删除分类
    updateSort: serverUrl+'/admin/blog/sort/update',//修改分类
    
    uploadOss:serverUrl+'/upload/oss',//上传图片
}

export default Apis;