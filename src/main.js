const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const main = require('./module/main');
const test = require('./module/test');
const vueClientWindowApi = {}
const createVueClientWindow = () => {
  const vueClientWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'renderer', 'vue-client-preload.js')
    }
  })

  vueClientWindow.loadURL('http://localhost:8080')
}

app.whenReady().then(async () => {
  main.run(); //main module run
  test.run(); //test module run
  createVueClientWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createVueClientWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

