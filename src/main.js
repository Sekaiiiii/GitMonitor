import { app, Menu, BrowserWindow, ipcMain } from 'electron';
import mainWindowListener from '@/renderer/listener/mainWindow'
import path from 'node:path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import main from '@/module/main';
import test from '@/module/test';

const createVueClientWindow = () => {
  Menu.setApplicationMenu(null);
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'renderer', 'preload', 'mainWindow.js')
    }
  })
  mainWindow.setBackgroundColor('#00000000');
  mainWindow.webContents.openDevTools();

  mainWindow.loadURL('http://localhost:8080')

  return mainWindow;
}

app.whenReady().then(async () => {
  // main.run(); //main module run
  // test.run(); //test module run
  const mainWinHandler = createVueClientWindow()
  mainWindowListener(mainWinHandler);
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

