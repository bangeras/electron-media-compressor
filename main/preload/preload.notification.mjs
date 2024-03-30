
import { ipcRenderer } from 'electron';
import channels from '../channels.mjs';
import { logger } from '../../common/logger.mjs';


const preloadNotificationApis = {
    sendNotification(message) {
      logger.info(`Received notification ${message}`);
      
      ipcRenderer.send(channels.NOFIFY, message); //async
    }
}

export default preloadNotificationApis