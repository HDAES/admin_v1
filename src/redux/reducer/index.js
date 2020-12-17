/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2020-12-10 21:28:59
 * @LastEditTime: 2020-12-17 15:35:15
 */
import { type } from "../action";
const userMenus = JSON.parse(sessionStorage.getItem(type.USERMENUS)) ? JSON.parse(sessionStorage.getItem(type.USERMENUS)) : [];
const groups = JSON.parse(sessionStorage.getItem(type.GROUPS)) ? JSON.parse(sessionStorage.getItem(type.GROUPS)) : [];
const user = sessionStorage.getItem(type.USER)?JSON.parse(sessionStorage.getItem(type.USER)):{menus:''}
const initialState = {
    collapsed: false, //收起左边导航
    userMenus,
    groups,
    user
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case type.COLLAPSED :
            return {
                ...state,
                collapsed: !state.collapsed
            }
        case type.USERMENUS :
            sessionStorage.setItem(type.USERMENUS, JSON.stringify(action.userMenus))
            return {
                ...state,
                userMenus: action.userMenus
            }
        case type.GROUPS :
            sessionStorage.setItem(type.GROUPS, JSON.stringify(action.groups))
            return {
                ...state,
                groups: action.groups
            }
        case type.USER :
            sessionStorage.setItem(type.USER, JSON.stringify(action.user))
            return {
                ...state,
                user: action.user
            }
        default :
            return {
                ...state
            }
    }
}

export default reducer;