/*
 * @Descripttion: 用户组
 * @Author: Hades
 * @Date: 2020-12-13 21:43:11
 * @LastEditTime: 2020-12-15 23:29:00
 */

import React,{ useEffect, useState} from 'react';
import { Card, Table, Button, Modal, Tree, Form, Input, message } from 'antd'
import { PlusOutlined,ApartmentOutlined} from '@ant-design/icons';
import { connect } from 'react-redux'
import { deepMenus} from '../../utils'
import { getUserGroup, postAddGroup,getDelGroup } from '../../axios'
const Group = ({allMenus}) =>{
    const [list,setList] = useState()
    const [menusVisible, setMenusVisible ] = useState(false)
    const [auVisible,setAuVisible] = useState(false)
    const [checkedKeys,setCheckedKeys] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [groupForm] = Form.useForm()
    useEffect( ( ) =>{
        userGroup()
    },[refresh])

    //获取用户组
    const userGroup = () =>{
        getUserGroup().then( res =>{
            setList(res.list)
        })
    }
    const showMenus = (menus) =>{
        setMenusVisible(true)
        let arryMenus = menus.split(',')
        setCheckedKeys(arryMenus)
    }
    //添加用户组
    const saveGroup = () =>{
        groupForm.validateFields().then( res =>{
            postAddGroup({...res,menus:checkedKeys}).then( res =>{
                if(res.code === 200){
                    message.success('添加成功!')
                    setRefresh(!refresh)
                    setAuVisible(false)
                }
            })
        })
    }
    //删除用户组
    const delGroup = ({id}) =>{
        getDelGroup(id).then( res =>{
            if(res.code === 200){
                message.success('删除成功')
                setRefresh(!refresh)
            }
        })
    }
    const columns = [{
        title: '名字',
        dataIndex: 'name',
        key: 'name',
    },{
        title: '菜单',
        dataIndex: 'menus',
        key: 'menus',
        render: menus => <ApartmentOutlined onClick={()=>showMenus(menus)}/>
    },{
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },{
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
    },{
        title: '操作',
        key: 'operation',
        fixed: 'right',
        align:'center',
        width: 250,
        render: (e) => <div style={{display:'flex'}}>
            <Button type="link" onClick={()=>{}}>
                修改
            </Button>
            <Button type="link" onClick={()=>delGroup(e)} danger>
                删除
            </Button>
        </div>
    }]
    const layout = {
        labelCol: { span: 4},
        wrapperCol: { span: 20 },
    }
    return (
        <div>
            <Card style={{marginBottom:10}}>
                <Button icon={<PlusOutlined />} onClick={()=>{setAuVisible(true);setCheckedKeys([])}}>添加菜单</Button>
            </Card>
            <Card>
                <Table
                    rowKey={record => record.id}
                    dataSource={list}
                    columns={columns}/>
            </Card>

            <Modal 
                title="菜单目录"
                visible={menusVisible}
                footer={null}
                onCancel={()=>setMenusVisible(false)}
            >
                <Tree 
                checkable
                defaultExpandAll
                defaultCheckedKeys={checkedKeys}
                treeData={allMenus}/>
            </Modal>
            <Modal 
                title="添加用户组"
                visible={auVisible}
                onOk={saveGroup}
                onCancel={()=>setAuVisible(false)}
            >
                <Form form={groupForm} {...layout}>
                    <Form.Item label="用户组名" name="name">
                        <Input placeholder="请输入用户组名"/>
                    </Form.Item>
                    <Form.Item label="菜单" name="menus">
                        <Tree 
                            checkable
                            defaultExpandAll 
                            onCheck={(checkedKeys)=>setCheckedKeys(checkedKeys)}
                            treeData={allMenus}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
const mapStateProps = state => ({allMenus:deepMenus(state.userMenus)})
export default connect(mapStateProps)(Group);