
import { ipcRenderer } from 'electron';
import channels from '../channels.mjs';


const preloadFileApis = {
    onAlertMessage: (callback) => {
      ipcRenderer.on(channels.ALERT_MESSAGE, (event, value) => callback(value));
    },
    getFilesMetadata: (filesGrid) => {      
      ipcRenderer.send(channels.FILE_METADATA_REQUEST, filesGrid); //async
    },
    onFilesMetadataResponse: (callback) => {
      ipcRenderer.on(channels.FILE_METADATA_RESPONSE, (event, value) => callback(value));
    },
    compressFile: (index, filePath, filesGrid) => {
      ipcRenderer.send(channels.COMPRESS_FILE_REQUEST, index, filePath, filesGrid); //async
    },
    onCompressFileResponse: (callback) => {
      ipcRenderer.on(channels.COMPRESS_FILE_RESPONSE, (event, index, value) => callback(index, value));
    },
    openNativeFile: (filePath) => { //Function to open image file with default viewer
      ipcRenderer.send(channels.OPEN_NATIVE_FILE, filePath); //async
    }
}

export default preloadFileApis