/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2020-12-10 21:28:59
 * @LastEditTime: 2020-12-10 21:51:09
 */
import { type } from "../action";
const initialState = {
    collapsed: false, //收起左边导航
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case type.COLLAPSED :
            return {
                ...state,
                collapsed: !state.collapsed
            }
        default :
            return {
                ...state
            }
    }
}

export default reducer;