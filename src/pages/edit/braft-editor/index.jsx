/*
 * @Descripttion: braft-editor编辑器
 * @Author: Hades
 * @Date: 2020-12-20 22:47:51
 * @LastEditTime: 2021-01-04 16:42:28
 */

import React, { useState } from 'react';
import BraftEditor from 'braft-editor'
import Apis from '../../../axios/api'
import 'braft-editor/dist/index.css'

const MyBraftEditor = () =>{

    const [editorState, SetEditorState] = useState()
    
    const handleEditorChange = (editorState) => {
        SetEditorState(editorState)
    }
    const preview = () =>{
        if (window.previewWindow) {
            window.previewWindow.close()
        }
        window.previewWindow = window.open()
        window.previewWindow.document.write(buildPreviewHtml(editorState.toHTML()))
        window.previewWindow.document.close()
    }
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: preview
      }
    ]
    const myUploadFn = (param) => {
      const serverURL = Apis.serverUrl+'/upload/oss'
      const xhr = new XMLHttpRequest()
      const fd = new FormData()

      const successFn = () => {
        // 假设服务端直接返回文件上传后的地址
        // 上传成功后调用param.success并传入上传后的文件地址
        param.success({
          url:JSON.parse(xhr.responseText).data.url,
          meta: {
            id: param.id,
            title: param.file.name,
            alt: param.file.name
          }
        })
      }

      const progressFn = (event) => {
        param.progress(event.loaded / event.total * 100)
      }
      const errorFn = (response) => {
        // 上传发生错误时调用param.error
        param.error({
          msg: 'unable to upload.'
        })
      }

      xhr.upload.addEventListener("progress", progressFn, false)
      xhr.addEventListener("load", successFn, false)
      xhr.addEventListener("error", errorFn, false)
      xhr.addEventListener("abort", errorFn, false)
      fd.append('file', param.file)
      xhr.open('POST', serverURL, true)
      xhr.send(fd)
    }
    return (
        <div className="my-component">
            <BraftEditor
              media={{uploadFn: myUploadFn}}
              value={editorState}
              extendControls={extendControls}
              onChange={handleEditorChange}
            />
        </div>
    )
}

export default MyBraftEditor;

const buildPreviewHtml = html =>{
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${html}</div>
        </body>
      </html>
    `
}