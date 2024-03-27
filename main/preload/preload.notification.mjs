
import { ipcRenderer } from 'electron';
import channels from '../channels.mjs';


const preloadNotificationApis = {
    sendNotification(message) {
      console.log('Received notification=', message)
      
      ipcRenderer.send(channels.NOFIFY, message); //async
    }
}

export default preloadNotificationApis