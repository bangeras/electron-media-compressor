
import { logger } from '../../common/logger.mjs';
import * as fs from 'node:fs';

const grantPermissionsOnFolder = (folderPath) => {
    // Set permissions using fs.chmod
    fs.chmod(folderPath, '755', (err) => {
        if (err) {
            logger.error(`Error granting permissions:${err}`);
        } else {
            logger.info(`Permissions granted on folder:${folderPath}`);
        }
    });
}

export {
    grantPermissionsOnFolder
}