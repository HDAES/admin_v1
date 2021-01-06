/*
 * @Descripttion: 博客详情
 * @Author: Hades
 * @Date: 2021-01-06 12:04:57
 * @LastEditTime: 2021-01-06 13:54:55
 */

import React, { useState, useEffect} from 'react';
import { Card, Button, Modal, Form, Select, Input, Upload, Switch,InputNumber } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getTags } from '../../../axios'
import Apis from '../../../axios/api'
const Details = () =>{

    const [visible,setVisible] = useState(false)
    const [tagsList,setTagsList] = useState([{id:0}])
    const [fileList,setFileList] = useState([])
    const [editForm] = Form.useForm()
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
            console.log(value)
        })
    }
   
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }
    const layout = {
        labelCol: { span: 4},
        wrapperCol: { span: 20 },
    }
    return (
        <div>
            <Card>
                <Button onClick={addHandler}>添加<PlusOutlined /></Button>
            </Card>
            <Modal 
                title="编辑"
                visible={visible}
                okText="保存"
                onOk={okHandler}
                onCancel={()=>setVisible(false)}
                >
                <Form form={editForm} {...layout}>
                    <Form.Item label="标签" name="t_id" initialValue={tagsList[0].id}>
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
                    <Form.Item label="排序" name="order" initialValue={0} rules={[{ required: true, message: 'Please input your type!' }]}>
                        <InputNumber min={0} max={100} step={1}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Details;
