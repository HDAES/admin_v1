/*
 * @Descripttion: 打字效果组件
 * @Author: Hades
 * @Date: 2020-12-11 15:52:41
 * @LastEditTime: 2020-12-11 16:03:00
 */

import React,{ useEffect } from 'react';
import { Card } from 'antd'
import { init } from 'ityped'

const Ityped = ({text}) => {
    useEffect( () =>{
        const strings = new Array(text)
        const myElement = document.querySelector('#des')
        init(myElement, { 
            strings,
            disableBackTyping:true,
            showCursor: false, 
        })
    },[text])

    return (
        <Card title="何时使用" hoverable={true} style={{flexBasis: '100%',marginBottom:20}}>
            <div id="des" style={{height:30}}></div>
        </Card>
    )
}

export default Ityped;
