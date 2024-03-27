
import channels from "../channels.mjs"
import { ipcMain, Notification } from "electron";


const registerNotificationIPCHandler = ()=>{

    ipcMain.on(channels.NOFIFY, (event, message)=>{
        new Notification({ title: 'MEDIA COMPRESSOR', body: message }).show();
    });
    console.log("Registered NotificationIPCHandler!");
}

export default registerNotificationIPCHandler;