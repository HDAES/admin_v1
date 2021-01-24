/*
 * @Descripttion: 博客详情
 * @Author: Hades
 * @Date: 2021-01-06 12:04:57
 * @LastEditTime: 2021-01-25 00:17:31
 */

import React, { useState, useEffect} from 'react';
import { Card, Button, Modal, Form, Select, Input, Upload, Switch,InputNumber,message,Table } from 'antd'
import { PlusOutlined, UploadOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import Editor from 'for-editor'
import { getTags, postDetails,getDetails,delDetails,putDetails,PostContent,getContent } from '../../../axios'
import Apis from '../../../axios/api'
import { formateType } from '../../../utils'
const Details = () =>{

    const [refresh,setRefresh] = useState(false)
    const [visible,setVisible] = useState(false)
    const [visibleContent,setVisibleContent] = useState(false)
    const [isAdd,setIsAdd] = useState(false)
    const [tagsList,setTagsList] = useState([{id:0}])
    const [blogList,setBlogList] = useState([])
    const [fileList,setFileList] = useState([])
    const [article,setArticle] = useState('')
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
        setIsAdd(true)
        editForm.resetFields()
        setFileList([])
    }
    //保存按钮
    const okHandler = () =>{
        editForm.validateFields().then( value =>{
            let sid =''
            let source = value.source?1:0;
            tagsList.forEach(element => {
                if(element.id===value.tid){
                    sid =element.sid
                }
            });
            if(fileList.length===0){
                message.error('请上传图片')
            }else{
                let image =fileList[0].url
                if(isAdd){
                    postDetails({...value,sid,image,source}).then( res =>{
                        message.success('添加成功')
                        setVisible(false)
                        setRefresh(!refresh)
                    })
                }else{
                    putDetails({...value,sid,image,source}).then(res=>{
                        message.success('修改成功')
                        setVisible(false)
                        setRefresh(!refresh)
                    })
                }
            }
           
            
        })
    }
    //编辑按钮
    const editHandler = (item) =>{
        setIsAdd(false)
        editForm.setFieldsValue(item)
        setFileList([
            {
                status: 'done',
                url: item.image,
            }
        ])
        setVisible(true)
    }
    //删除按钮
    const delHandler = id =>{
        Modal.confirm({
            title: 'Are you sure delete this sort?',
            icon: <ExclamationCircleOutlined />,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                delDetails(id).then(res =>{
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
    const handleChange = (e) => {
        console.log('Upload event:', e);
        if(e.file.status==="done"&&e.file.response.code===200){
            //上传成功
            setFileList([{
                status: 'done',
                url: e.file.response.data.url,
            }])
        }
    }
    //打开文章
    const openContent = item =>{
        getContent(item.id).then(res =>{
            console.log(res)
            //
            if(res.code ===200){
                setVisibleContent(true)
            }
        }).catch((e)=>{
            Modal.confirm({
                title:"你还没有创建博客",
                cancelText:"取消",
                okText:"创建",
                onOk(){
                    PostContent({id:item.id}).then(res =>{
                        setVisibleContent(true)
                    })
                }
            })
        })
        
    }
    //保存文章
    const saveContent = ()=>{
        
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
        key: 'type',
        render:type =><div>{formateType(type)}</div>
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
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        align:'center',
        width: 250,
        render: (e) => <div style={{display:'flex'}}>
            <Button type="link" onClick={()=>openContent(e)}>
                文章
            </Button>
            <Button type="link" onClick={()=>editHandler(e)}>
                修改
            </Button>
            <Button type="link" danger onClick={()=>delHandler(e.id)}>
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
                    {
                        isAdd?null: <Form.Item label="id" name="id">
                            <Input  disabled/>
                        </Form.Item>
                    }
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
                    <Form.Item label="图片">
                        <Upload name="file" onChange={handleChange} fileList={fileList} onRemove={()=>setFileList([])} action={Apis.uploadOss} listType="picture">
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
            <Modal
                width={1000}
                title="博客编辑"
                visible={visibleContent}
                onCancel={()=>setVisibleContent(false)}
                onOk={()=>saveContent}
                >
                    <Editor 
                    preview={true}
                    subfield={true}
                    value={article} 
                    onChange={(value)=>setArticle(value)}
                    />
                </Modal>
        </div>
    )
}

export default Details;
