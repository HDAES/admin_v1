/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2020-12-10 21:32:56
 * @LastEditTime: 2020-12-17 15:11:55
 */
export const type = {
    COLLAPSED: 'COLLAPSED',//收起状态
    USERMENUS: 'USERMENUS',
    GROUPS:'GROUPS',//用户组
    USER:'USER',//用户
}

//改变左边导航栏
export function changeCollapsed() {
    return {
       type: type.COLLAPSED
    }
}

//设置菜单
export function setUserMenus(menus) {
    return {
        type: type.USERMENUS,
        userMenus:menus
    }
}

export function setGroup(groups){
    return {
        type: type.GROUPS,
        groups
    }
}

export function setUser(user){
    return {
        type: type.USER,
        user
    }
}