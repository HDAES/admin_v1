/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2020-12-10 21:32:56
 * @LastEditTime: 2020-12-10 21:50:09
 */
export const type = {
    COLLAPSED: 'COLLAPSED',//收起状态
}

//改变左边导航栏
export function changeCollapsed() {
    return {
       type: type.COLLAPSED
    }
 }