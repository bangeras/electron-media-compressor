import { app, BrowserWindow } from 'electron';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { registerHotReload } from './hotreloader.mjs';
import registerIPCHandlers from './ipc/ipc.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDev = !app.isPackaged;

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
        nodeIntegration: true, // Disable Node.js integration in renderer process
        contextIsolation: true, // Enable context isolation in renderer process
        preload: path.join(__dirname, './preload/preload.mjs'), // Use the ESM preload path
    }
  });
  mainWindow.loadFile('./renderer/dist/index.html');

  if (isDev) {
    mainWindow.webContents.openDevTools();
    registerHotReload(); // Register for live reload of main and renderer processes on any change of code
  } 
  return mainWindow;
};

app.whenReady().then(() => {
  mainWindow = createWindow(); //Launch Renderer process
  registerIPCHandlers(); // Handlers within main process for native API / NodeJS calls
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

const getMainWindow = () => { //An alternative to BrowserWindow.getFocusedWindow() 
  return mainWindow;
}

export default getMainWindow;
