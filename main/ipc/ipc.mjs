import { logger } from "../../common/logger.mjs";
import registerFileMetadataIPCHandler from "./ipc.file.mjs";
import registerNotificationIPCHandler from "./ipc.notification.mjs";

const registerIPCHandlers = ()=>{
    logger.info('Registering all ipcMain handlers..');

    registerNotificationIPCHandler();
    registerFileMetadataIPCHandler();

    logger.info('Registered all ipcMain handlers!');
};

export default registerIPCHandlers;