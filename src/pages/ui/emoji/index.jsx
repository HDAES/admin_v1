/*
 * @Descripttion: Emoji 表情
 * @Author: Hades
 * @Date: 2020-12-19 17:13:29
 * @LastEditTime: 2020-12-19 17:34:22
 */
import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Card, Button } from 'antd';
const Emoji = () =>{
    const [emoji, setEmoji] = useState('apple')
    const [ hanldeEmoji, handleClickEmoji] = useState('')
    return (
        <Card title="Emoji Mart" style={{display:'flex',flexDirection:'column'}}>
           <div style={{margin:'20px 0'}}>
                <Button onClick={ () => setEmoji('apple')}>apple</Button>
                <Button onClick={ () => setEmoji('google')} style={{margin:'0 20px'}}>google</Button>
                <Button onClick={ () => setEmoji('twitter')}>twitter</Button>
                <Button onClick={ () => setEmoji('emojione')} style={{margin:'0 20px'}}>emojione</Button>
                <Button onClick={ () => setEmoji('messenger')}>messenger</Button>
                <Button onClick={ () => setEmoji('facebook')} style={{margin:'0 20px'}}>facebook</Button>
            </div> 
           
            <Picker set={emoji} onSelect={(emoji)=>handleClickEmoji(emoji.native)} />
            
            <div style={{marginTop:20}}>
                {hanldeEmoji}
            </div>
        </Card>
    )
}

export default Emoji;