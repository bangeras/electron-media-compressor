import registerFileMetadataIPCHandler from "./ipc.file.mjs";
import registerNotificationIPCHandler from "./ipc.notification.mjs";

const registerIPCHandlers = ()=>{
    console.log('Registering all ipcMain handlers..');

    registerNotificationIPCHandler();
    registerFileMetadataIPCHandler();

    console.log('Registered all ipcMain handlers!');
};

export default registerIPCHandlers;