/*
 * @Descripttion: 接口测试
 * @Author: Hades
 * @Date: 2021-02-02 14:44:51
 * @LastEditTime: 2021-02-02 16:26:12
 */
import React, { useEffect,useState } from 'react';
import { Card, Select, Table, Button, message } from 'antd'
import axios from 'axios'
import { getApiList } from '../../../axios'
const TestApi = () =>{
    const [header,setHeader] = useState('http://www.ibengou.vip')
    const [list,setList] = useState([])
    useEffect(()=>{
        getApiList().then( res =>{
            setList(res)
        })
    },[])

    const testHandler = item => {
        let clikTime = new Date().getTime()
        axios({method:'get',url:header+item.url}).then( res =>{
            message.success(`所用时间为${new Date().getTime()-clikTime}`)
        })
    }

    const requestHandler = () =>{
        let tempList = []
        list.forEach(item =>{
            let clikTime = new Date().getTime()
            axios({method:'get',url:header+item.url}).then( res =>{
                item.time = new Date().getTime()-clikTime
            }).catch(e=>{
                item.time = 'error'
            })
            tempList.push(item)
        })
    }

    //改变头部
    const headerChange = header =>{
        setHeader(header)
    }
    const columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },{
        title: '请求路径',
        dataIndex: 'url',
        key: 'url',
    },{
        title: '描述',
        dataIndex: 'des',
        key: 'des',
    },{
        title: '时间(ms)',
        dataIndex: 'time',
        key: 'time',
    },{
        title: '操作',
        key: 'operation',
        fixed: 'right',
        align:'center',
        width: 100,
        render: (e) => <div style={{display:'flex'}}>
            <Button type="link" onClick={()=>testHandler(e)}>
                测试
            </Button>
        </div>
    }]
    return (
        <div>
            <Card>
                <Select style={{width:250}} defaultValue="http://www.ibengou.vip" onChange={headerChange}>
                    <Select.Option value="http://www.ibengou.vip">笨狗阅读</Select.Option>
                    <Select.Option value="http://api.erxing.net">七蜜阅读</Select.Option>
                </Select>

                <Button style={{marginLeft:20}} onClick={requestHandler}>请求所有</Button>
            </Card>
            <Card style={{marginTop:20}}>
                <Table 
                    rowKey={record => record.id}
                    pagination={{defaultPageSize:20}}
                    dataSource={list}
                    columns={columns}
                    />
            </Card>
        </div>
    )
}

export default TestApi;