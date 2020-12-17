/*
 * @Descripttion: 登录页面
 * @Author: Hades
 * @Date: 2020-12-10 16:31:29
 * @LastEditTime: 2020-12-17 22:33:27
 */

import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux'
import { postLogin } from '../axios'
import { setUserMenus,setGroup, setUser } from '../redux/action'
import { HmacSHA1 } from '../utils'
const Login = ({dispatch}) => {

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      };

      const onFinish = values => {
        postLogin({...values,passWord:HmacSHA1(values.passWord)}).then( res =>{
            dispatch(setUserMenus(res.menus))
            dispatch(setGroup(res.groups))
            dispatch(setUser(res.user))
            
            window.location.href='/#/index'
        })
      };

    return  <div className="login">
        <div className="login-box">
            <h1>登陆</h1>
            <Form
                {...layout}
                onFinish={onFinish}
                className="form"
            >
                <Form.Item
                    label="用户名"
                    name="account"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="passWord"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item   wrapperCol={{sm: { span: 7, offset: 17 }}}>
                    <Button type="primary" htmlType="submit">
                    登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}

export default connect()(Login);
