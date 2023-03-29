// import logger from "@/util/logger";
// import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer } = require('electron');

console.log('1234');

contextBridge.exposeInMainWorld('electronAPI', {
    // 渲染器调用接口(单项)
    send: (event, ...args) => ipcRenderer.send(event, ...args),
    // 渲染器调用接口(双向)
    invoke: (message) => ipcRenderer.invoke('invoke', message),
    // 渲染器监听接口(双向)
    handle: (callback) => ipcRenderer.on('handler', callback)
})