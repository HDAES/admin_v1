/*
 * @Descripttion: 完整路由文件
 * @Author: Hades
 * @Date: 2020-12-11 15:25:56
 * @LastEditTime: 2020-12-11 16:00:25
 */
import Layout from './layout'
import Index from './pages/index'
import Button from './pages/ui/button'
const Routes = [
    {
        path:'/', name:'Layout', component:Layout, auth:true, children:[
            {path:'/index', name:'Index', component:Index, auth:true},
            {path:'/ui/button', name:'button', component:Button, auth:true}
        ]
    }
]

export default Routes;