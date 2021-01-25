/*
 * @Descripttion: 菜单管理
 * @Author: Hades
 * @Date: 2020-12-13 09:51:34
 * @LastEditTime: 2021-01-25 17:40:47
 */

import React, { useState } from 'react';
import { Card ,Tree, Button, Modal, Form, Select, Input, message} from 'antd'
import { connect } from 'react-redux'
import { PlusOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { deepMenus} from '../../utils'
import { postAddMenu, postUpdateMenu, getRemoveMenu} from '../../axios'
import { setUserMenus } from '../../redux/action'
const Menus = ({menus,menusTree, dispatch}) =>{

    //添加菜单弹窗
    const [addModalVisible, setAddModalVisible] = useState(false)
    //编辑菜单
    const [editModalVisible, setEditModalVisible] = useState(false)
    //删除菜单ID
    const [delId, setDelId] = useState('0')
    //菜单时候父级菜单
    const [mainMenus,setMainMenus] = useState(false)

    const [addMenusForm] = Form.useForm();
    const [editMenusForm] = Form.useForm();
    //保存菜单
    const saveMenu = () =>{
        addMenusForm.validateFields().then( formValue =>{
            const mid = mainMenus ? formValue.m_id : '0'
            let url = formValue.url
            menusTree.forEach(item =>{
                if(item.id === mid){
                    url = item.url+'/'+formValue.url
                }
            })
            postAddMenu({...formValue,mid,url}).then( res =>{           
                message.success('添加成功')
                setAddModalVisible(false)
                menusTree.push({...formValue,m_id:mid,id:res.id,url})
                dispatch(setUserMenus(menusTree)) 
            })
        })
    }

    const selectMenus = (e) =>{
        let menu = {}
        menusTree.forEach( item =>{
            if(e === item.id){
                menu = item
            }
        })
        editMenusForm.setFieldsValue({...menu})
    }

    //编辑保存
    const saveEditMenu = () =>{
        editMenusForm.validateFields().then(formValue =>{
            postUpdateMenu({...formValue}).then( res =>{
                if(res.code === 200){
                    message.success('修改成功')
                    dispatch(setUserMenus(res.data)) 
                    setEditModalVisible(false)
                }
            })
        } )
    }
    //删除菜单
    const delMenus = () =>{
        if(delId === '0'){
            message.error('请先选择要删除的菜单')
        }else{   
            Modal.confirm({
                title: '是否删除该菜单?',
                icon: <ExclamationCircleOutlined />,
                content: '注：如果删除父菜单下有子菜单，会一并删除',
                okText:'删除',
                cancelText:'取消',
                onOk() {
                    getRemoveMenu(delId).then( res =>{
                        if(res.code === 200){
                            message.success('删除成功')
                            dispatch(setUserMenus(res.data)) 
                        }
                    })
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
        }
    }
    const layout = {
        labelCol: { span: 4},
        wrapperCol: { span: 20 },
    }
    return(
        <div className="auth-menus">
            <Card>
                <Button icon={<PlusOutlined />} onClick={()=>setAddModalVisible(true)}>添加菜单</Button>
                <Button icon={<EditOutlined />} onClick={()=>setEditModalVisible(true)} style={{marginLeft:20,marginRight:20}} >修改菜单</Button>
                <Select onSelect={ e => setDelId(e)} style={{width:200}} placeholder="请选择删除的菜单">
                    {
                        menusTree.map( item =>{
                            return <Select.Option value={item.id} key={item.url}>{item.name}</Select.Option> 
                        })
                    } 
                </Select>
                <Button danger style={{marginLeft:20}} onClick={delMenus}>删除</Button>
            </Card>
            <Card>
            <Tree 
                checkable
                checkStrictly={true}  
                defaultExpandAll 
                treeData={menus}/>
            </Card>

            <Modal 
                title="添加菜单"
                okText="保存"
                onOk={saveMenu}
                cancelText="取消"
                onCancel={_ => setAddModalVisible(false)}
                visible={addModalVisible}>
                    <Form form={addMenusForm} {...layout}>
                        <Form.Item label="菜单类型" name="menus_type" initialValue="0">
                            <Select onSelect={ e => setMainMenus(e==='0'?false:true)}>
                                <Select.Option value="0">父级菜单</Select.Option>
                                <Select.Option value="1">子级菜单</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="父级菜单" name="m_id" >
                            <Select placeholder="选择父级菜单" disabled={!mainMenus}>
                                {
                                    menus.map( item =>{
                                        return <Select.Option value={item.id} key={item.url}>{item.name}</Select.Option> 
                                    })
                                } 
                            </Select>
                        </Form.Item>
                        <Form.Item label="菜单名字" name="name" rules={[{ required: true }]}>
                            <Input placeholder="请输入菜单名字"/>
                        </Form.Item>
                        <Form.Item label="菜单路径" name="url"rules={[{ required: true }]} >
                            <Input placeholder="请输入菜单路径(如：/index)"/>
                        </Form.Item>
                        <Form.Item label="菜单排序" name="sort" >
                            <Input placeholder="请输入菜单顺序" type="number" />
                        </Form.Item>
                        <Form.Item label="菜单Icon" name="icon" >
                            <Input placeholder="请输入菜单icon"/>
                        </Form.Item>
                    </Form>
                </Modal>
                                
            {/* 编辑菜单 */}
            <Modal 
                title="编辑菜单"
                okText="保存"
                onOk={saveEditMenu}
                cancelText="取消"
                onCancel={_ => setEditModalVisible(false)}
                visible={editModalVisible}>
                    <Form form={editMenusForm} {...layout}>
                        <Form.Item label="菜单" name="id" >
                            <Select onSelect={ e => selectMenus(e)}>
                                {
                                    menusTree.map( item =>{
                                        return <Select.Option value={item.id} key={item.url}>{item.name}</Select.Option> 
                                    })
                                } 
                            </Select>
                        </Form.Item>
                        <Form.Item label="菜单名字" name="name" rules={[{ required: true }]}>
                            <Input placeholder="请输入菜单名字"/>
                        </Form.Item>
                        <Form.Item label="菜单路径" name="url"rules={[{ required: true }]} >
                            <Input placeholder="请输入菜单路径(如：/index)"/>
                        </Form.Item>
                        <Form.Item label="菜单排序" name="sort" >
                            <Input placeholder="请输入菜单顺序" type="number" />
                        </Form.Item>
                        <Form.Item label="菜单Icon" name="icon" >
                            <Input placeholder="请输入菜单icon"/>
                        </Form.Item>
                    </Form>
                </Modal>
        </div>
    )
}

const mapStateProps = state => ({menus:deepMenus(state.userMenus),menusTree:state.userMenus})
export default connect(mapStateProps)(Menus);