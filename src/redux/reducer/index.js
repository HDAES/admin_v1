/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2020-12-10 21:28:59
 * @LastEditTime: 2020-12-12 23:15:37
 */
import { type } from "../action";
const userMenus = JSON.parse(sessionStorage.getItem('userMenus')) ? JSON.parse(sessionStorage.getItem('userMenus')) : [];
const initialState = {
    collapsed: false, //收起左边导航
    userMenus,
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case type.COLLAPSED :
            return {
                ...state,
                collapsed: !state.collapsed
            }
        case type.USERMENUS :
            sessionStorage.setItem('userMenus', JSON.stringify(action.userMenus))
            return {
                ...state,
                userMenus: action.userMenus
            }
        default :
            return {
                ...state
            }
    }
}

export default reducer;