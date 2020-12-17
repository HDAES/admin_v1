/*
 * @Descripttion: 公共方法
 * @Author: Hades
 * @Date: 2020-12-11 17:21:00
 * @LastEditTime: 2020-12-17 16:17:14
 */

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


