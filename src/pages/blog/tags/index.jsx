/*
 * @Descripttion: 标签管理
 * @Author: Hades
 * @Date: 2021-01-05 10:06:37
 * @LastEditTime: 2021-01-17 15:54:27
 */

import React,{ useState, useEffect} from 'react';
import { Card, Button, Modal, Form, Input, Select , message, Table } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { postAddTags, getSort,getTags, getDelTags,PostUpdateTags } from '../../../axios'
const Tags = () =>{
    const [visible,setVisible] = useState(false)
    const [isAdd,setIsAdd] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [tagsList,setTagsList] = useState([])
    const [sortList,setSortList] = useState([{id:0}])
    const [form] = Form.useForm()

    useEffect(()=>{
        getSort().then(res =>{
            setSortList(res.list)
        })
        getTags().then(res =>{
            setTagsList(res.list)
        })
    },[refresh])
    //添加按钮
    const addHandler = () =>{
        setVisible(true)
        setIsAdd(true)
        form.resetFields()
    }

    const okHandler = () =>{
        form.validateFields().then( value =>{
            if(isAdd){
                postAddTags({...value}).then(res =>{
                    if(res.code === 200){
                        message.success('添加成功')
                        setVisible(false)
                        setRefresh(!refresh)
                    }
                }) 
            }else{
                PostUpdateTags({...value}).then(res =>{
                    if(res.code === 200){
                        message.success('修改成功')
                        setVisible(false)
                        setRefresh(!refresh)
                    }
                })
            }
        })
    }
    //修改
    const modifyHandler = item =>{
        setVisible(true)
        form.setFieldsValue(item)
    }
    //删除
    const delHander = id =>{
        Modal.confirm({
            title: 'Are you sure delete this sort?',
            icon: <ExclamationCircleOutlined />,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                getDelTags(id).then(res =>{
                    if(res.code === 200){
                        message.success('添加成功')
                        setRefresh(!refresh)
                    }
                })
            },
            onCancel() {
              console.log('Cancel');
            },
        })
        
    }
    const layout = {
        labelCol: { span: 4},
        wrapperCol: { span: 20 },
    }
    const columns =[{
            title: '分类',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '标签',
            dataIndex: 'tname',
            key: 'tname',
        },
        {
            title: '图标',
            dataIndex: 'ticon',
            key: 'ticon',
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align:'center',
            width: 250,
            render: (e) => <div style={{display:'flex'}}>
                <Button type="link"  onClick={()=>modifyHandler(e)}>
                    修改
                </Button>
                <Button type="link" danger onClick={()=>delHander(e.id)}>
                    删除
                </Button>
            </div>
        }
    ]
    return (
        <div>
            <Card>
                <Button onClick={addHandler}>添加<PlusOutlined /></Button>
            </Card>
            <Card style={{marginTop:20}}>
                <Table
                    rowKey={record => record.id}
                    dataSource={tagsList}
                    columns={columns}
                    />
            </Card>
            <Modal
                title="编辑"
                visible={visible}
                onCancel={()=>setVisible(false)}
                onOk={okHandler}
                >
                    <Form form={form} {...layout}>
                        {
                            isAdd?null: <Form.Item label="id" name="id">
                                <Input  disabled/>
                            </Form.Item>
                        }
                       <Form.Item label="分类" name="sid" initialValue={sortList[0].id}>
                           <Select>
                               {
                                    sortList.map(item =>{
                                       return <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>
                                   })
                               }
                           </Select>
                       </Form.Item>
                        <Form.Item label="标题" name="tname" rules={[{ required: true, message: 'Please input your title!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="图标" name="ticon" rules={[{ required: true, message: 'Please input your icon!' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
        </div>
    )
}

export default Tags;


