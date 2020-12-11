/*
 * @Descripttion: 按钮样式
 * @Author: Hades
 * @Date: 2020-12-11 15:58:56
 * @LastEditTime: 2020-12-11 16:27:27
 */
import React from 'react';
import Ityped from "../../../components/Ityped";
import { Card, Button, Divider } from "antd";
import { SearchOutlined } from '@ant-design/icons';

const text = "标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。";
const MButton = () =>{
    return (
        <div className="ui-base">
            <Ityped text={text}/>
            <Card title="基本按钮" hoverable={true} className="ui-card">
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button>
                <Divider orientation="left" plain>按钮类型</Divider>
                <p>按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。</p>
            </Card>
            <Card title="基本按钮" hoverable={true} className="ui-card">
                <Button shape="circle" icon={<SearchOutlined />} />
                <Button icon={<SearchOutlined />}>Search</Button>
                <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
                <Button type="dashed" icon={<SearchOutlined />}>Search</Button>
                <Divider orientation="left" plain>图标按钮</Divider>
                <p>当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon 组件</p>
            </Card>
        </div>
    )
}

export default MButton;

