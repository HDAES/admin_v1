/*
 * @Descripttion: 名言管理
 * @Author: Hades
 * @Date: 2021-01-25 13:32:32
 * @LastEditTime: 2021-01-25 14:39:02
 */
import React,{ useState, useEffect} from 'react';
import { Card ,Button, Table, Modal, Form, Input, message} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { postSaying, getSaying, delSaying,putSaying } from '../../../axios'
const Saying = () =>{

    const [sayingList,setSayingList] = useState([])
    const [isAdd,setIsAdd] = useState(false)
    const [visible,setVisible] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [sayingForm] = Form.useForm()
    
    useEffect(()=>{
        getSaying().then(res=>{
            setSayingList(res)
        })
    },[refresh])
    //添加按钮事件
    const addHandler = () =>{
        setIsAdd(true)
        setVisible(true)
        sayingForm.resetFields()
    }
    //保存按钮事件
    const saveHandler = () =>{
        sayingForm.validateFields().then( value =>{
            if(isAdd){
                postSaying(value).then(res =>{
                    message.success('添加成功')
                    setVisible(false)
                    setRefresh(!refresh)
                })
            }else{
                putSaying(value).then(res =>{
                    message.success('修改成功')
                    setVisible(false)
                    setRefresh(!refresh)
                })
            }
        })
    }
    //修改按钮事件
    const editHandler = item =>{
        setVisible(true)
        setIsAdd(false)
        sayingForm.setFieldsValue(item)
    }
    //删除按钮
    const delHandler = item =>{
        delSaying(item.id).then(res =>{
            message.success('删除成功！')
            setRefresh(!refresh)
        })
    }
    const columns =[{
        title: '内容',
        dataIndex: 'content',
        key: 'content',
    },{
        title: '作者',
        dataIndex: 'author',
        key: 'author', 
    },{
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime' 
    },{
        title: '操作',
        key: 'operation',
        fixed: 'right',
        align:'center',
        width: 250,
        render: (e) => <div style={{display:'flex'}}>
            <Button type="link" onClick={()=>editHandler(e)}>
                修改
            </Button>
            <Button type="link" danger onClick={()=>delHandler(e)}>
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
            <Card>
                <Button onClick={addHandler}>添加<PlusOutlined /></Button>
            </Card>
            <Card style={{marginTop:20}}>
                <Table
                    rowKey={record => record.id}
                    dataSource={sayingList}
                    columns={columns}
                    />
            </Card>
            <Modal
                title="编辑"
                visible={visible}
                cancelText="取消"
                okText="保存"
                onCancel={()=>setVisible(false)}
                onOk={saveHandler}
                >
                <Form form={sayingForm} {...layout}>
                    {
                        isAdd?null: <Form.Item label="id" name="id">
                            <Input  disabled/>
                        </Form.Item>
                    }
                    <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入名言内容' }]}>
                        <Input.TextArea placeholder="内容" />
                    </Form.Item>
                    <Form.Item label="作者" name="author" rules={[{ required: true, message: '请输入名言作者' }]}>
                        <Input  placeholder="作者"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Saying;