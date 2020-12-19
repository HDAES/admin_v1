/*
 * @Descripttion: 标签页
 * @Author: Hades
 * @Date: 2020-12-19 16:56:10
 * @LastEditTime: 2020-12-19 17:08:49
 */

import React,{ useState, useEffect} from 'react';
import { Card, Radio, Select, Switch, Tabs } from "antd";

import { AppleOutlined, AndroidOutlined,WindowsOutlined } from '@ant-design/icons';
import Ityped from "../../../components/Ityped";
const text = "标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。";
const MyTabs = () =>{

    const [size,setSize] = useState('default')
    const [position,setPosition] = useState('top')
    const [icon,setIcon] = useState(false)
    const [card,setCard] = useState(false)
    const [ad,setAD] = useState(false)
    const [adstate,setADState] = useState(false)
    const [panes,setPanes] = useState([
        {title: 'Tab 1', content: 'Content of Tab 1', key: '1',iconType:<AppleOutlined/>},
        {title: 'Tab 2', content: 'Content of Tab 2', key: '2',iconType:<AndroidOutlined/>},
        {title: 'Tab 3', content: 'Content of Tab 3', key: '3',iconType:<WindowsOutlined/>}]
    )
    useEffect( ()=>{
     
    },[adstate])
    
    function onEdit(action,targetKey){
        switch(action){
          case 'add' :
              add()
              break;
          case 'remove' : 
              remove(targetKey)
              break;
          default :
              break
        }
      }
  
   
      function add () {
          setADState(e=>!e)
          setPanes((panes)=>{
              let new_panes =  panes
              let key = new_panes.length >0? parseInt(new_panes[new_panes.length-1].key) + 1 : 1
              new_panes.push( {title: 'Tab '+key , content: 'Content of Tab '+key, key,iconType:'apple'},)
              return new_panes
          })
      }
      function remove(idx){
          setADState(e=>!e)
          setPanes((panes)=>{
              let new_panes= []
              panes.forEach( (item) =>{
                  if(parseInt(item.key)  !== parseInt(idx)){
                      new_panes.push(item)
                  }
              })
              return new_panes
          })
      }

    return (
        <div className="ui-base">
            <Ityped text={text}/>
            <Card title="基本按钮" hoverable={true} style={{flex:1}}>
                <div>
                    <span style={{marginRight:20}}>size：</span> 
                    <Radio.Group value={size} onChange={(e)=>setSize(e.target.value)} style={{ marginBottom: 16 }}>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{margin:'20px 0'}}>
                    <span style={{marginRight:20}}>Tab position：</span> 
                    <Select
                        style={{width:150}}
                        value={position}
                        onChange={(value)=>setPosition(value)}
                        dropdownMatchSelectWidth={false}
                    >
                        <Select.Option value="top">top</Select.Option>
                        <Select.Option value="bottom">bottom</Select.Option>
                        <Select.Option value="left">left</Select.Option>
                        <Select.Option value="right">right</Select.Option>
                    </Select>
                </div>
                <div  style={{margin:'20px 0'}}>
                    <span style={{marginRight:20}}>Icon：</span> 
                    <Switch  onChange={(checked) =>setIcon(checked) } />
                </div>
                <div>
                    <span style={{marginRight:20}}>Card：</span> 
                    <Switch  onChange={(checked) =>setCard(checked) } />
                </div>

                <div style={{margin:'20px 0'}}>
                    <span style={{marginRight:20}}>ADD and DELECT：</span> 
                    <Switch  onChange={(checked) =>setAD(checked) } />
                </div>
                <Tabs defaultActiveKey="1"  size={size} tabPosition={position} type={card?'card':'' || ad?'editable-card':''} onEdit={(targetKey, action)=>onEdit(action,targetKey)}>
                    {
                        panes.map( (item) => {
                            return  <Tabs.TabPane key={item.key} tab={icon?<span>{item.iconType}{item.title}</span>:item.title }>{item.content}</Tabs.TabPane>
                        })
                    }
                    
                </Tabs>
            </Card>
        </div>
    )
}


export default MyTabs;