/*
 * @Descripttion: 请求路径
 * @Author: Hades
 * @Date: 2020-12-11 16:46:45
 * @LastEditTime: 2020-12-12 23:38:38
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

}

export default Apis;