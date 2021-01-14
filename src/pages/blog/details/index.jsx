/*
 * @Descripttion: 博客详情
 * @Author: Hades
 * @Date: 2021-01-06 12:04:57
 * @LastEditTime: 2021-01-14 23:27:01
 */

import React, { useState, useEffect} from 'react';
import { Card, Button, Modal, Form, Select, Input, Upload, Switch,InputNumber,message,Table } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getTags, postDetails,getDetails } from '../../../axios'
import Apis from '../../../axios/api'
const Details = () =>{

    const [refresh,setRefresh] = useState(false)
    const [visible,setVisible] = useState(false)
    const [tagsList,setTagsList] = useState([{id:0}])
    const [blogList,setBlogList] = useState([])
    const [fileList,setFileList] = useState([])
    const [editForm] = Form.useForm()

    useEffect(()=>{
        getDetails().then(res => {
            setBlogList(res.data.list)
        })
    },[refresh])

    useEffect(()=>{
        getTags().then(res =>{
            setTagsList(res.list)
        })
    },[])
    //添加按钮
    const addHandler = () =>{
        setVisible(true)
    }
    //保存按钮
    const okHandler = () =>{
        editForm.validateFields().then( value =>{
            let image =''
            let sid =''
            let source = value.source?1:0;
            if(value.upload.length>0){
                image = value.upload[0].response.data.url
            }
            tagsList.forEach(element => {
                if(element.id===value.tid){
                    sid =element.sid
                }
            });
            postDetails({...value,sid,image,source}).then( res =>{
                if(res.code === 200){
                    message.success('添加成功')
                    setVisible(false)
                    setRefresh(!refresh)
                }
            })
        })
    }
   
    const normFile = (e) => {
        //console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }
    const columns =[{
        title: '分类',
        dataIndex: 'name',
        key: 'name',
    },{
        title: '标签',
        dataIndex: 'tname',
        key: 'tname',
    },{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '描述',
        dataIndex: 'des',
        key: 'des',
    },{
        title: '来源',
        dataIndex: 'source',
        key: 'source',
        render:source=><div>{source===0?'原创':'转载'}</div>
    },
    {
        title: '排序',
        dataIndex: 'orderIn',
        key: 'orderIn'
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
    },{
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        render:image=><img src={image} alt='' width='80'/>
    },{
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
    },
    ]
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
                    dataSource={blogList}
                    columns={columns}
                    />
            </Card>
            <Modal 
                title="编辑"
                visible={visible}
                okText="保存"
                onOk={okHandler}
                onCancel={()=>setVisible(false)}
                >
                <Form form={editForm} {...layout}>
                    <Form.Item label="标签" name="tid" initialValue={tagsList[0].id}>
                        <Select>
                            {
                                tagsList.map(item=>{
                                    return <Select.Option key={item.id} value={item.id}>{item.tname}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入文章标题' }]}>
                        <Input  placeholder="文章标题"/>
                    </Form.Item>
                    <Form.Item label="描述" name="des" rules={[{ required: true, message: '请输入文章描述' }]}>
                        <Input  placeholder="文章描述"/>
                    </Form.Item>
                    <Form.Item label="图片" name="upload"  valuePropName="fileList" initialValue={fileList} getValueFromEvent={normFile} rules={[{ required: true, message: 'Please input your image!' }]}>
                        <Upload name="file" defaultFileList={fileList} onRemove={()=>setFileList([])} action={Apis.uploadOss} listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="来源" name="source" initialValue={false} valuePropName="checked" rules={[{ required: true, message: 'Please input your type!' }]}>
                        <Switch checkedChildren="转载" unCheckedChildren="原创" />
                    </Form.Item>
                    <Form.Item label="类型" name="type" initialValue={0} rules={[{ required: true, message: 'Please input your type!' }]}>
                        <InputNumber min={0} max={2} step={1}/>
                    </Form.Item>
                    <Form.Item label="排序" name="order_in" initialValue={0} rules={[{ required: true, message: 'Please input your type!' }]}>
                        <InputNumber min={0} max={100} step={1}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Details;
