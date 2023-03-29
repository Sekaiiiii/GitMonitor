// import logger from "@/util/logger";
// import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // 渲染器调用接口(单项)
    send: (event, ...args) => ipcRenderer.send(event, ...args),
    // 渲染器调用接口(双向)
    // invoke: (message) => ipcRenderer.invoke('invoke', message),
    invoke: (apiName, data) => ipcRenderer.invoke(apiName, data),
    // 渲染器监听接口(双向)
    handle: (callback) => ipcRenderer.on('handler', callback)
})