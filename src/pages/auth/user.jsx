/*
 * @Descripttion: 用户组
 * @Author: Hades
 * @Date: 2020-12-16 11:20:36
 * @LastEditTime: 2020-12-17 22:50:09
 */


import React,{ useEffect, useState} from 'react';
import { Card, Table, Button, message, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { connect } from "react-redux"
import { getUserList, getDelectUser, postAddUser } from '../../axios'
import { HmacSHA1 } from '../../utils' 
const User = ({groups}) =>{

    const [userList, setUserList] = useState()
    const [refresh, setRefresh] = useState(false)
    const [visible, setVisible] = useState(false)

    const [userForm] = Form.useForm()

    useEffect(() =>{
        getList()
    },[refresh])
    
    const getList = () =>{
        getUserList().then( res =>{
            setUserList(res.list)
        })
    }
    //删除用户
    const delUser = ({id}) =>{
        getDelectUser(id).then( res =>{
            if(res.code === 200){
                message.success('删除成功')
                setRefresh(!refresh)
            }
        })
    }
    //弹窗点击事件
    const okHandle = () =>{
        userForm.validateFields().then( res =>{
            postAddUser({...res,passWord:HmacSHA1(res.passWord)}).then( res =>{
                if(res.code === 200){
                    setVisible(false)
                    message.success('添加成功!')
                    setRefresh(!refresh)
                }
            })
        })
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
        render: (e) => <div style={{display:'flex'}}>
            <Button type="link" onClick={()=>{}} >修改</Button>
            <Button type="link" onClick={()=>delUser(e)} danger>删除</Button>
        </div>
    }]
    const layout = {
        labelCol: { span: 4},
        wrapperCol: { span: 20 },
    }
    return (
        <div>
            <Card style={{marginBottom:10}}>
            <Button icon={<PlusOutlined />} onClick={()=>{setVisible(true)}}>添加用户</Button>
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
                                        return <Select.Option value={item.gid} key={item.gid}>{item.gname}</Select.Option>
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