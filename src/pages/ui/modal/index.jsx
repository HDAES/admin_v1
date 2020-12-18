/*
 * @Descripttion: 弹窗
 * @Author: Hades
 * @Date: 2020-12-18 10:41:37
 * @LastEditTime: 2020-12-18 13:46:35
 */


import React, { useState } from 'react';
import { Card, Button, Modal, Divider } from 'antd';
import Ityped from "../../../components/Ityped";
import {ExclamationCircleOutlined } from '@ant-design/icons';

const text = "需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。";
const MyModel = () =>{

    const [modal1Visible,setModal1Visible] = useState(false)
    const [modal2Visible,setModal2Visible] = useState(false)
    const [modal3Visible,setModal3Visible] = useState(false)
    const [modal4Visible,setModal4Visible] = useState(false)
    const [modal5Visible,setModal5Visible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const showConfirm = (id) =>{
        switch(id){
            case 0 :
                Modal.confirm({
                    title: 'Do you Want to delete these items?',
                    icon: <ExclamationCircleOutlined />,
                    content: 'Some descriptions',
                    onOk() {
                      console.log('OK');
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                }) 
                break;
            case 1: 
                Modal.confirm({
                    title: 'Are you sure delete this task?',
                    icon: <ExclamationCircleOutlined />,
                    content: 'Some descriptions',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk() {
                    console.log('OK');
                    },
                    onCancel() {
                    console.log('Cancel');
                    },
                })
                break;
            default :
                break;
        }
    }
    const showModal = (id) => {
        switch(id){
            case 0 :
                Modal.info({
                    title: 'This is a notification message',
                    content: (
                      <div>
                        <p>some messages...some messages...</p>
                        <p>some messages...some messages...</p>
                      </div>
                    ),
                    onOk() {},
                })
                break;
            case 1 :
                Modal.success({
                    content: 'some messages...some messages...',
                });
                break;
            case 2 :
                Modal.error({
                    title: 'This is an error message',
                    content: 'some messages...some messages...',
                });
                break;
            case 3 :
                Modal.warning({
                    title: 'This is a warning message',
                    content: 'some messages...some messages...',
                });
                break;
            default :
                break;
        }
    }
    return (
        <div className="ui-base">
            <Ityped text={text}/>
            <Card title="基本弹窗" hoverable={true} className="ui-card">
                <Button onClick={()=>setModal1Visible(true)}>默认弹窗</Button>
                <Button onClick={()=>setModal2Visible(true)}>自定义底部</Button>
                <Button onClick={()=>setModal3Visible(true)}>顶部20px</Button>
                <Button onClick={()=>setModal4Visible(true)}>左右垂直居中</Button>
                <Button onClick={()=>setModal5Visible(true)}>异步关闭</Button>
                <Divider orientation="left" plain>基本</Divider>
                <p>第一个对话框。</p>
            </Card>
            <Card title="确认对话框" hoverable={true} className="ui-card">
                <Button onClick={()=>showConfirm(0)}>Confirm</Button>
                <Button onClick={()=>showConfirm(1)} type="dashed">Delete</Button>
                <Divider orientation="left" plain>确认对话框</Divider>
                <p>使用 confirm() 可以快捷地弹出确认框。onCancel/onOk 返回 promise 可以延迟关闭。</p>
            </Card>
            <Card title="信息提示" hoverable={true} className="ui-card">
                <Button onClick={()=>showModal(0)}>Info</Button>
                <Button onClick={()=>showModal(1)}>Success</Button>
                <Button onClick={()=>showModal(2)}>Error</Button>
                <Button onClick={()=>showModal(3)}>Warning</Button>
                <Divider orientation="left" plain>信息提示</Divider>
                <p>各种类型的信息提示，只提供一个按钮用于关闭。</p>
            </Card>
            
            <Modal 
                title="Basic Modal" 
                visible={modal1Visible} 
                onOk={()=>setModal1Visible(false)} 
                onCancel={()=>setModal1Visible(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Modal 
                title="自定义底部" 
                visible={modal2Visible} 
                okText="确定"
                cancelText="取消"
                onOk={()=>setModal2Visible(false)} 
                onCancel={()=>setModal2Visible(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Modal 
                title="顶部20px" 
                style={{top:'20px'}}
                visible={modal3Visible} 
                onOk={()=>setModal3Visible(false)} 
                onCancel={()=>setModal3Visible(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Modal 
                title="左右垂直居中" 
                centered
                visible={modal4Visible} 
                onOk={()=>setModal4Visible(false)} 
                onCancel={()=>setModal4Visible(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Modal 
                title="异步关闭"
                visible={modal5Visible} 
                onOk={()=>{setConfirmLoading(true);setTimeout(()=>{setModal5Visible(false);setConfirmLoading(false)},2000)} } 
                confirmLoading={confirmLoading}
                onCancel={()=>setModal5Visible(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default MyModel;
