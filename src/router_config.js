/*
 * @Descripttion: 完整路由文件
 * @Author: Hades
 * @Date: 2020-12-11 15:25:56
 * @LastEditTime: 2020-12-17 15:48:35
 */
import Layout from './layout'
import Index from './pages/index'
import Button from './pages/ui/button'
import Menus from './pages/auth/menus'
import Group from './pages/auth/group'
import User from './pages/auth/user'
const Routes = [
    {
        path:'/', name:'Layout', component:Layout, auth:true, children:[
            {path:'/index', name:'Index', component:Index, auth:true},
            {path:'/ui/button', name:'button', component:Button, auth:true},
            {path:'/auth/menus', name:'Menus', component:Menus, auth:true},
            {path:'/auth/group', name:'Group', component:Group, auth:true},
            {path:'/auth/user', name:'User', component:User, auth:true},
        ]
    }
]

export default Routes;