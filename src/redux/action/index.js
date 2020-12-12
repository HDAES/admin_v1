/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2020-12-10 21:32:56
 * @LastEditTime: 2020-12-12 23:10:45
 */
export const type = {
    COLLAPSED: 'COLLAPSED',//收起状态
    USERMENUS: 'USERMENUS',
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