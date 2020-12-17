/*
 * @Descripttion: 用户组
 * @Author: Hades
 * @Date: 2020-12-16 11:20:36
 * @LastEditTime: 2020-12-17 14:30:39
 */


import React,{ useEffect, useState} from 'react';
import { Card, Table, Button, message } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { getUserList, getDelectUser } from '../../axios'
 const User = () =>{

    const [userList, setUserList] = useState()
    const [refresh, setRefresh] = useState(false)
    useEffect(() =>{
        getList()
    },[refresh])
    
    const getList = () =>{
        getUserList().then( res =>{
            console.log(res)
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
    const columns = [{  
        title: '账号',
        dataIndex: 'name',
        key: 'name',
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
    return (
        <div>
            <Card style={{marginBottom:10}}>
            <Button icon={<PlusOutlined />} onClick={()=>{}}>添加用户</Button>
            </Card>
            <Card>
                <Table 
                    rowKey={record => record.id}
                    dataSource={userList}
                    columns={columns}
                    />
            </Card>
        </div>
    )
 }


 export default User;