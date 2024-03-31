import { app, BrowserWindow } from 'electron';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { registerHotReload } from './hotreloader.mjs';
import registerIPCHandlers from './ipc/ipc.mjs';
import { logger } from '../common/logger.mjs';
import { grantPermissionsOnFolder } from './modules/folderPermissions.mjs';
import { getDocumentsPath } from './modules/filePath.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDev = !app.isPackaged;

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    // useContentSize: true,
    frame: false, // frameless window
    webPreferences: {
        
        nodeIntegration: false, // Disable Node.js integration in renderer process
        contextIsolation: true, // Enable context isolation in renderer process
        preload: path.join(__dirname, './preload/preload.mjs'), // Use the ESM preload path
        sandbox: false
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

  grantPermissionsOnFolder(getFilePath(getDocumentsPath(), app.getName())); // Grant write permissions on the output folder to save compressed files
  
  logger.info('mainWindow created!');
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});


// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error}`);
  // Optionally, perform cleanup or other actions before exiting
  app.quit();
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

const getMainWindow = () => { //An alternative to BrowserWindow.getFocusedWindow() 
  return mainWindow;
}

export default getMainWindow;
