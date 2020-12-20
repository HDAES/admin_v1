/*
 * @Descripttion: 完整路由文件
 * @Author: Hades
 * @Date: 2020-12-11 15:25:56
 * @LastEditTime: 2020-12-20 22:49:16
 */
import Layout from './layout'
import Index from './pages/index'
import Button from './pages/ui/button'
import Menus from './pages/auth/menus'
import Group from './pages/auth/group'
import User from './pages/auth/user'
import Modal from './pages/ui/modal'
import MyDrawer from './pages/ui/drawer'
import Loading from './pages/ui/loading'
import Note from './pages/ui/note'
import MyTabs from './pages/ui/tabs'
import Emoji from './pages/ui/emoji'
import G2Line from './pages/chart/line'
import G2Bar from './pages/chart/bar'
import G2Pie from './pages/chart/pie'
import G2Liquid from './pages/chart/liquid'
import G2Word from './pages/chart/word'
import BraftEditor from './pages/edit/braft-editor'
const Routes = [
    {
        path:'/', name:'Layout', component:Layout, auth:true, children:[
            {path:'/index', name:'Index', component:Index, auth:true},
            {path:'/ui/button', name:'button', component:Button, auth:true},
            {path:'/ui/modal', name:'model', component:Modal, auth:true},
            {path:'/ui/drawer', name:'MyDrawer', component:MyDrawer, auth:true},
            {path:'/ui/loading', name:'Loading', component:Loading, auth:true},
            {path:'/ui/note', name:'Note', component:Note, auth:true},
            {path:'/ui/tabs', name:'MyTabs', component:MyTabs, auth:true},
            {path:'/ui/emoji', name:'Emoji', component:Emoji, auth:true},
            {path:'/auth/menus', name:'Menus', component:Menus, auth:true},
            {path:'/auth/group', name:'Group', component:Group, auth:true},
            {path:'/auth/user', name:'User', component:User, auth:true},
            {path:'/chart/line', name:'G2Line', component:G2Line, auth:true},
            {path:'/chart/bar', name:'G2Bar', component:G2Bar, auth:true},
            {path:'/chart/pie', name:'G2Pie', component:G2Pie, auth:true},
            {path:'/chart/liquid', name:'G2Liquid', component:G2Liquid, auth:true},
            {path:'/chart/word', name:'G2Word', component:G2Word, auth:true},
            {path:'/editor/braft', name:'BraftEditor', component:BraftEditor, auth:true},
               
        ]
    }
]

export default Routes;