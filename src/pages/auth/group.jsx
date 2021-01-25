/*
 * @Descripttion: 用户组
 * @Author: Hades
 * @Date: 2020-12-13 21:43:11
 * @LastEditTime: 2021-01-25 17:34:37
 */

import React,{ useEffect, useState} from 'react';
import { Card, Table, Button, Modal, Tree, Form, Input, message } from 'antd'
import { PlusOutlined,ApartmentOutlined} from '@ant-design/icons';
import { connect } from 'react-redux'
import { deepMenus} from '../../utils'
import { getUserGroup, postAddGroup,getDelGroup, postUpdateGroup } from '../../axios'
const Group = ({allMenus}) =>{
    const [list,setList] = useState()
    const [menusVisible, setMenusVisible ] = useState(false)
    const [auVisible,setAuVisible] = useState(false)
    const [checkedKeys,setCheckedKeys] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [edit,setEdit] = useState(false)
    const [groupForm] = Form.useForm()
    useEffect( ( ) =>{
        userGroup()
    },[refresh])

    //获取用户组
    const userGroup = () =>{
        getUserGroup().then( res =>{
            setList(res)
        })
    }
    //显示用户组菜单
    const showMenus = (menus) =>{
        setMenusVisible(true)
        let arryMenus = menus.split(',')
        setCheckedKeys(arryMenus)
    }
    //添加用户组
    const saveGroup = () =>{
        edit?groupForm.validateFields().then( res =>{
            postAddGroup({name:res.gname,menus:checkedKeys}).then( _ =>{
                message.success('添加成功!')
                setRefresh(!refresh)
                setAuVisible(false)
            })
        }):groupForm.validateFields().then( res =>{
            postUpdateGroup({...res,menus:checkedKeys}).then( _ =>{
                message.success('添加成功!')
                setRefresh(!refresh)
                setAuVisible(false)
            })
        })
    }
    //删除用户组
    const delGroup = ({id}) =>{
        getDelGroup(id).then( res =>{
            message.success('删除成功')
            setRefresh(!refresh)
        })
    }
    //修改用户组
    const update = (e) =>{
        let arryMenus = e.menus.split(',')
        setCheckedKeys(arryMenus)
        setAuVisible(true)
        setEdit(false)
        groupForm.setFieldsValue({name:e.name,id:e.id})
    }
    const columns = [{
        title: '名字',
        dataIndex: 'gname',
        key: 'gname',
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
            <Button type="link" onClick={()=>update(e)} >
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
                <Button icon={<PlusOutlined />} onClick={()=>{setAuVisible(true);setCheckedKeys([]);setEdit(true);groupForm.resetFields()}}>添加菜单</Button>
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
                checkedKeys={checkedKeys}
                treeData={allMenus}/>
            </Modal>
            <Modal 
                title="添加用户组"
                visible={auVisible}
                onOk={saveGroup}
                onCancel={()=>setAuVisible(false)}
            >
                <Form form={groupForm} {...layout}>
                    <Form.Item  label="用户id" name="id">
                        <Input  disabled/>
                    </Form.Item>
                    <Form.Item label="用户组名" name="gname">
                        <Input placeholder="请输入用户组名"/>
                    </Form.Item>
                    <Form.Item label="菜单" name="menus">
                        <Tree 
                            checkable
                            defaultExpandAll 
                            checkStrictly={true}
                            checkedKeys={checkedKeys}
                            onCheck={({checked})=>setCheckedKeys(checked)}
                            treeData={allMenus}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
const mapStateProps = state => ({allMenus:deepMenus(state.userMenus)})
export default connect(mapStateProps)(Group);