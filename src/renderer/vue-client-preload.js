const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    // 渲染器调用接口(双向)
    invoke: (message) => ipcRenderer.invoke('invoke', message),
    // 渲染器监听接口(双向)
    handle: (callback) => ipcRenderer.on('handler', callback)
})