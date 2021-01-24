/*
 * @Descripttion: 公共方法
 * @Author: Hades
 * @Date: 2020-12-11 17:21:00
 * @LastEditTime: 2021-01-24 19:39:41
 */
import CryptoJS from 'crypto-js'
const SHA1 = "HADESXL"
// 递归菜单
export function deepMenus(menus,id = '0'){
    let tempMenus = [] 
    menus.forEach( item =>{
        if((item.m_id === '0' && id === '0') || (item.m_id !=='0' && item.m_id === id)){
            item.title = item.name
            item.key = item.id
            item.children = []
            tempMenus.push(item)
        }
    })

    tempMenus.forEach( item =>{
       if(deepMenus(menus, item.id).length >0){
            item.children  = deepMenus(menus, item.id)
       }
    })

    return tempMenus
}

export function userMenusUrl(menus,user){
    const arrMenus = user.menus.split(',')
    let menusUrl =[]
    menus.forEach( item =>{
        if(arrMenus.indexOf(item.id)>-1){
            menusUrl.push(item.url)
        }
    })
    return menusUrl
}

//密码加密
export function HmacSHA1(password){
    return CryptoJS.HmacSHA1(password,SHA1).toString()
}

//类型格式化
export function formateType(type){
    switch(type){
        case 0 :
            return <div>
                <i className="iconfont icon-weixin1x" style={{width:50,color:'green',marginRight:10}}></i>
                <i className="iconfont icon-pc" style={{width:50,color:'green'}}></i>
            </div>
        case 1 : 
            return <div>
                <i className="iconfont icon-weixin1x" style={{width:50,color:'green',marginRight:10}}></i>
                <i className="iconfont icon-pc" style={{width:50}}></i>
            </div>
        case 2 :
            return <div>
                <i className="iconfont icon-weixin1x" style={{width:50,marginRight:10}}></i>
                <i className="iconfont icon-pc" style={{width:50,color:'green'}}></i>
            </div>
        default :
            return "未知"
    }
}

