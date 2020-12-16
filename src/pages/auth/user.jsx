/*
 * @Descripttion: 用户组
 * @Author: Hades
 * @Date: 2020-12-16 11:20:36
 * @LastEditTime: 2020-12-16 11:42:59
 */


import React,{ useEffect, useState} from 'react';
import { Card, Table, Button } from 'antd';
import { getUserList } from '../../axios'
 const User = () =>{

    const [userList, setUserList] = useState()
    useEffect(() =>{
        getList()
    },[])
    
    const getList = () =>{
        getUserList().then( res =>{
            console.log(res)
            setUserList(res.list)
        })
    }
    const columns = [{  
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
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
            <Button type="link" onClick={()=>{}} danger>删除</Button>
        </div>
    }]
    return (
        <div>
            <Card style={{marginBottom:10}}></Card>
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