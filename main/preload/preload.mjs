import { ipcRenderer, contextBridge } from 'electron';
import preloadNotificationApis from './preload.notification.mjs';
import preloadFileApis from './preload.file.mjs';

(()=>{
    console.log('preload invoked..')

    // Pernmissioned APIs within the renderer process sandbox:
    contextBridge.exposeInMainWorld('electronApis', {
        notificationApi: preloadNotificationApis,
        filesApi: preloadFileApis
        
    });

    console.log('preloaded!')
})()