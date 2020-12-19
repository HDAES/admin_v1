/*
 * @Descripttion: 加载动画
 * @Author: Hades
 * @Date: 2020-12-19 11:18:06
 * @LastEditTime: 2020-12-19 11:35:54
 */
import React,{ useState} from 'react';

import { Card, Spin, Divider, Space,Alert,Switch } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Ityped from "../../../components/Ityped";
import './index.less'
const text = "页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。";
const Loading = () =>{

    const [loading,setLoading] = useState(false)
    return (
        <div className="ui-base">
            <Ityped text={text}/>
            <Card title="基本用法" hoverable={true} className="ui-card" >
                <Space size="middle">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                    <Spin indicator={<LoadingOutlined/>} />
                </Space>
                <Divider orientation="left" plain>基本用法</Divider>
                <p>一个简单的 loading 状态。</p>
            </Card>
            <Card title="内容遮罩" hoverable={true} className="ui-card">
                <Spin tip="Loading..." spinning={loading}>
                    <Alert
                    message="Alert message title"
                    description="Further details about the context of this alert."
                    type="info"
                    />
                </Spin>
                <Switch checked={loading} onChange={(value) =>setLoading(value)} />
                <Divider orientation="left" plain>卡片加载中</Divider>
                <p>可以直接把内容内嵌到 Spin 中，将现有容器变为加载状态。自定义描述文案。</p>
            </Card>
            <Card title="自定义1" className="ui-card" hoverable={true}>
                <div className="load-container1">
                    <div className="boxLoading"></div>
                </div>
            </Card>
            <Card title="自定义2" className="ui-card" hoverable={true}>
                <div className="load-container2">
                    <div className="container">
                        <div className="boxLoading boxLoading1"></div>
                        <div className="boxLoading boxLoading2"></div>
                        <div className="boxLoading boxLoading3"></div>
                        <div className="boxLoading boxLoading4"></div>
                        <div className="boxLoading boxLoading5"></div>
                    </div>
                </div>
            </Card>
            <Card title="自定义3" className="ui-card" hoverable={true}>
                <div className="load-container3">
                    <div className="load load1"></div>
                    <div className="load load2"></div>
                    <div className="load"></div>
                </div>
            </Card>
            <Card title="自定义4" className="ui-card" hoverable={true}>
                <div className="load-container4"></div>
            </Card>
        </div>
    )
}

export default Loading;