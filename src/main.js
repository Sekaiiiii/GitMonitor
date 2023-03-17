// main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const moment = require('moment');

const vueClientWindowApi = {

}

const createVueClientWindow = () => {
  const vueClientWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'lib', 'vue-client-preload.js')
    }
  })

  ipcMain.handle('invoke', (event, message) => {
    console.log('INVOKE', message);
    return message;
    // todo: dispatch event
  })
  ipcMain.on('sendResponse', (event, message) => {
    console.log('sendResponse', message);
  })

  // todo: pack funciton to send message to renderer
  vueClientWindowApi.send = (message) => {
    vueClientWindow.webContents.send('handler', message)
  }

  vueClientWindow.loadURL('http://localhost:8080')
  vueClientWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createVueClientWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createVueClientWindow()
  })
  // test
  setInterval(() => {
    vueClientWindowApi.send(moment().format('YYYY-MM-DD HH:mm:ss'));
  }, 1000)

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

