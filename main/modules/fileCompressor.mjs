import getFileType, { FILETYPES } from "../../common/fileType.mjs";
import compressImage from "./imageCompressor.mjs";
import compressVideo from "./videoCompressor.mjs";

const compressFile = async(filePath) => {
    let compressedFilePath;
    const fileType = getFileType(filePath);
    switch (fileType) {
        case FILETYPES.IMAGE:
            compressedFilePath = await compressImage(filePath);
            break;
        case FILETYPES.VIDEO:
            compressedFilePath = await compressVideo(filePath);
            break;
        default:
            throw new Error("Unknown filetype to compress");

    }
    return compressedFilePath;

};

export default compressFile;

