import { ipcRenderer, contextBridge } from 'electron';
import preloadNotificationApis from './preload.notification.mjs';
import preloadFileApis from './preload.file.mjs';
import { logger } from '../../common/logger.mjs';

(()=>{
    logger.info('preload invoked..')

    // Pernmissioned APIs within the renderer process sandbox:
    contextBridge.exposeInMainWorld('electronApis', {
        notificationApi: preloadNotificationApis,
        filesApi: preloadFileApis
        
    });

    logger.info('preloaded!')
})();