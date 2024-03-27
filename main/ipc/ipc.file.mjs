import channels from "../channels.mjs"
import { ipcMain, dialog, BrowserWindow, shell } from "electron";
import fs from 'fs/promises';
import path from "path";
import compressFile from "../modules/fileCompressor.mjs";
import getFileType from "../../common/fileType.mjs";
import getMainWindow from "../main.mjs";

const registerFileMetadataIPCHandler = ()=>{

    ipcMain.on(channels.FILE_METADATA_REQUEST, (event, filesGrid)=>{
        console.log("loading file dialog..");

        const maxSelections = 5; // Set the maximum number of selections

        dialog.showOpenDialog({
            title: "Select media files:",
            buttonLabel: "Select File(s)",
            filters: [
                { name: 'Images/Movies', extensions: ['jpg', 'png', 'gif', 'mkv', 'avi', 'mp4'] },
                { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
                { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
              ],
            properties: ["openFile", "multiSelections"],
            message: "Choose the file(s) for compression"
        })
        .then(async(result) =>  {
            console.log(result.filePaths);
            if (!result.canceled) {
                if (result.filePaths.length > maxSelections) {
                    const message = `Allowed to select only ${maxSelections} files!`;
                    getMainWindow().webContents.send(channels.ALERT_MESSAGE, message);
                    return;
                }
              
                const metaData = await getMetaData(result.filePaths);
                filesGrid = metaData;
                getMainWindow().webContents.send(channels.FILE_METADATA_RESPONSE, filesGrid); //Async mode of IPC communication from Main -> Renderer process
                
                
            };
        }).catch(err => {
            console.error("Error in registerFileMetadataIPCHandler.FILE_METADATA_REQUEST=", err)
        });
    });

    const getMetaData = async(filePaths)=>{
        const stats = await Promise.all(filePaths.map(async (filePath) => {
            // Retrieve the file stats using fs.stat()
            const fileStat = await fs.stat(filePath);
            const fileName = path.basename(filePath);
            return {fileName, fileStat, filePath}
        }));

        return stats;
    };

    ipcMain.on(channels.COMPRESS_FILE_REQUEST, async(event, index, filePath, filesGrid)=>{
        console.log("Compressing file - ", filePath);
        const outputFilePath = await compressFile(filePath);
        console.log("outputFilePath=", outputFilePath);

        //Merge compressed metadata on the original grid
        const compressedFileMetadata = await getMetaData([outputFilePath]);

        const originalFileMetadata = filesGrid[index];
        originalFileMetadata.outputFileStat = compressedFileMetadata[0].fileStat;
        originalFileMetadata.outputFilePath = outputFilePath;
        originalFileMetadata.outputFileType = getFileType(outputFilePath);
        filesGrid[index] = originalFileMetadata;

        getMainWindow().webContents.send(channels.COMPRESS_FILE_RESPONSE, index, filesGrid); //Async mode of IPC communication from Main -> Renderer process
            
    });


    ipcMain.on(channels.OPEN_NATIVE_FILE, (event, filePath)=>{
        console.log("loading native file viewer..");
        shell.openPath(filePath).then(() => {
            console.log('File opened with default application');
        }).catch(err => {
            console.error('Error opening file:', err);
        });

    });


    console.log("Registered FileMetadataIPCHandler!");
}

export default registerFileMetadataIPCHandler
