/*
 * @Descripttion: http请求的封装
 * @Author: Hades
 * @Date: 2020-12-11 16:45:51
 * @LastEditTime: 2020-12-11 17:03:40
 */

import axios from 'axios'
import { Modal, message } from 'antd'

const Axios = (options) => {
    return new Promise((resolve, reject) => {
        axios({
            url: options.url,
            method: options.method,
            timeout: 12000,
            data: options.data,
            headers:{ },
            params: (options.data && options.data.params) || '',
        }).then((response) => {
            if (response.status === 200) {
                let res = response.data
                if (res.code === 200) {
                    if(options.all){
                        resolve(res)
                    }else{
                        resolve(res.data)
                    }
                   
                } else {
                    reject(res)
                    message.error(JSON.stringify(res.message))
                }
            }
        }).catch(err => {
            Modal.warn({
                title: '提示',
                content: err.message
            })
        })
    })
}

export default Axios;