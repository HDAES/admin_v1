/*
 * @Descripttion: 博客分类
 * @Author: Hades
 * @Date: 2021-01-05 10:06:37
 * @LastEditTime: 2021-01-05 15:15:33
 */

import React,{ useState, useEffect} from 'react';
import { Card, Button, Modal, Form, Input, InputNumber, Upload, message, Table } from 'antd'
import { PlusOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { postAddSort, getSort, getDelSort,postUpdateSort } from '../../../axios'
import Apis from '../../../axios/api'
const Sort = () =>{
    const [visible,setVisible] = useState(false)
    const [isAdd,setIsAdd] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [sortList,setSortList] = useState([])
    const [fileList,setFileList] = useState([])
    const [form] = Form.useForm()

    useEffect(()=>{
        getSort().then(res =>{
            setSortList(res.list)
        })
    },[refresh])
    //添加按钮
    const addHandler = () =>{
        setVisible(true)
        setIsAdd(true)
        setFileList([])
        form.resetFields()
    }

    const okHandler = () =>{
        form.validateFields().then( value =>{
            let image =''
            if(isAdd){
                if(value.upload.length>0){
                    image = value.upload[0].response.data.url
                }
                postAddSort({...value,image}).then(res =>{
                    if(res.code === 200){
                        message.success('添加成功')
                        setVisible(false)
                        setRefresh(!refresh)
                    }
                })
            }else{
                if(value.upload.length>0){
                    image = value.upload[0].url || value.upload[0].response.data.url
                    postUpdateSort({...value,image}).then(res =>{
                        if(res.code === 200){
                            message.success('修改成功')
                            setVisible(false)
                            setRefresh(!refresh)
                        }
                    })
                }
            }
        })
    }
    //修改
    const modifyHandler = item =>{
        setVisible(true)
        form.setFieldsValue(item)
        setFileList([
            {
                status: 'done',
                url: item.image,
            }
        ])
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
                getDelSort(id).then(res =>{
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
    //类型格式化
    const formateType = type =>{
        switch(type){
            case 0 :
                return "网站"
            case 1 : 
                return "微信小程序"
            case 2 :
                return "网站/微信小程序"
            default :
                return "未知"
        }
    }
    const layout = {
        labelCol: { span: 4},
        wrapperCol: { span: 20 },
    }
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }
    const columns =[{
            title: '标题',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
        },
        {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            render:image => <img src={image} alt={image} width="100"/>
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: type => <div>{formateType(type)}</div>
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
                    dataSource={sortList}
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
                       
                        <Form.Item label="标题" name="name" rules={[{ required: true, message: 'Please input your title!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="图标" name="icon" rules={[{ required: true, message: 'Please input your icon!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="类型" name="type" initialValue={0} rules={[{ required: true, message: 'Please input your type!' }]}>
                            <InputNumber min={0} max={2} step={1}/>
                        </Form.Item>
                        <Form.Item label="图片"   name="upload"  valuePropName="fileList" initialValue={fileList} getValueFromEvent={normFile} rules={[{ required: true, message: 'Please input your image!' }]}>
                            <Upload name="file" defaultFileList={fileList} onRemove={()=>setFileList([])} action={Apis.uploadOss} listType="picture">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
        </div>
    )
}
export default Sort;


