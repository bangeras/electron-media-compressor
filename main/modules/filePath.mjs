import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { app } from 'electron';
import { logger } from '../../common/logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getDocumentsPath = () => {
    // Retrieve the path to the documents folder across OS:
    const documentsPath = app.getPath('documents');
    logger.info(`Documents folder path := ${documentsPath}`);

    return documentsPath;
};

const getFilePath = (basePath, ...args) => {
    return path.join(basePath, ...args);
};

export default getFilePath;

export {
     getDocumentsPath
};