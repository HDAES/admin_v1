/*
 * @Descripttion: 抽屉
 * @Author: Hades
 * @Date: 2020-12-18 14:48:28
 * @LastEditTime: 2020-12-18 15:04:51
 */
import React, { useState } from 'react';
import { Card, Divider,Radio, Button, Drawer } from 'antd'
import Ityped from "../../../components/Ityped";

const text = "抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。";
const MyDrawer = () =>{

    const [placement, setPlacement] = useState('left')
    const [visible, setVisible] = useState(false)

    return (
        <div className="ui-base">
            <Ityped text={text}/>
            <Card title="基本弹窗" hoverable={true} className="ui-card">
                <Radio.Group defaultValue={placement} onChange={e=>setPlacement(e.target.value)}>
                    <Radio value="top">top</Radio>
                    <Radio value="right">right</Radio>
                    <Radio value="bottom">bottom</Radio>
                    <Radio value="left">left</Radio>
                </Radio.Group>
                <Button type="primary" onClick={()=>setVisible(true)}>Open</Button>
                <Divider orientation="left" plain>自定义位置</Divider>
                <p>自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭</p>
            </Card>
            <Drawer
                title="Basic Drawer"
                placement={placement}
                closable={false}
                onClose={()=>setVisible(false)}
                visible={visible}
                key={placement}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}

export default MyDrawer;