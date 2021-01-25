/*
 * @Descripttion: 用户组
 * @Author: Hades
 * @Date: 2020-12-16 11:20:36
 * @LastEditTime: 2021-01-25 17:33:49
 */


import React,{ useEffect, useState} from 'react';
import { Card, Table, Button, message, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { connect } from "react-redux"
import { getUserList, getDelectUser, postAddUser, postUpdateUser } from '../../axios'
import { HmacSHA1 } from '../../utils' 
const User = ({groups}) =>{

    const [userList, setUserList] = useState()
    const [refresh, setRefresh] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [visible, setVisible] = useState(false)

    const [userForm] = Form.useForm()

    useEffect(() =>{
        getList()
    },[refresh])
    
    const getList = () =>{
        getUserList().then( res =>{
            setUserList(res)
        })
    }
    //删除用户
    const delUser = ({id}) =>{
        getDelectUser(id).then( _ =>{
            message.success('删除成功')
            setRefresh(!refresh)
        })
    }
    //弹窗点击事件
    const okHandle = () =>{
        userForm.validateFields().then( res =>{
            if(isEdit){
                postAddUser({...res,passWord:HmacSHA1(res.passWord)}).then( res =>{
                    if(res.code === 200){
                        setVisible(false)
                        message.success('添加成功!')
                        setRefresh(!refresh)
                    }
                })
            }else{
                postUpdateUser({...res,passWord:HmacSHA1(res.passWord)}).then( res =>{
                    if(res.code === 200){
                        setVisible(false)
                        message.success('修改成功!')
                        setRefresh(!refresh)
                    }
                })
            }
            
        })
    }
    //添加用户按钮点击事件
    const addHandle = () =>{
        setVisible(true)
        setIsEdit(true)
        userForm.resetFields()
    }
    //编辑按钮点击事件
    const editHandle = item =>{
        setIsEdit(false)
        setVisible(true)
        userForm.setFieldsValue(item)
    }
    const columns = [{  
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
    },{
        title: '账号',
        dataIndex: 'account',
        key: 'account',
    },{  
        title: '职位',
        dataIndex: 'gname',
        key: 'gname',
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
        render: _ => <div style={{display:'flex'}}>
            <Button type="link" onClick={()=>editHandle(_)} >修改</Button>
            <Button type="link" onClick={()=>delUser(_)} danger>删除</Button>
        </div>
    }]
    const layout = {
        labelCol: { span: 4},
        wrapperCol: { span: 20 },
    }
    return (
        <div>
            <Card style={{marginBottom:10}}>
                <Button icon={<PlusOutlined />} onClick={()=>addHandle()}>添加用户</Button>
            </Card>
            <Card>
                <Table 
                    rowKey={record => record.id}
                    dataSource={userList}
                    columns={columns}
                    />
            </Card>
            <Modal 
                title="添加用户组"
                visible={visible}
                onOk={okHandle}
                onCancel={()=>setVisible(false)}
                >
                    <Form form={userForm} {...layout}>
                        <Form.Item label="ID" name="id">
                            <Input placeholder="默认自动生成" disabled/>
                        </Form.Item>
                        <Form.Item label="昵称" name="name">
                            <Input placeholder="请输入账号"/>
                        </Form.Item>
                        <Form.Item label="账号" name="account">
                            <Input placeholder="请输入账号"/>
                        </Form.Item>
                        <Form.Item label="密码" name="passWord">
                            <Input placeholder="请输入账号" type="password"/>
                        </Form.Item>
                        <Form.Item label="用户组" name="groupId">
                            <Select >
                                {
                                    groups.map( item =>{
                                        return <Select.Option value={item.id} key={item.gname}>{item.gname}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
        </div>
    )
 }

 const mapStateProps = state => ({groups:state.groups})
 export default connect(mapStateProps)(User);