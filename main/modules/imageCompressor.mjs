import imagemin from 'imagemin'
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import getFilePath, { getDocumentsPath } from './filePath.mjs';
import { app } from 'electron';
import { logger } from '../../common/logger.mjs';

const compressImage = async(filePath) => {
    const outputDir = getFilePath(getDocumentsPath(), app.getName());
    logger.info(`imageCompressor.compressImage() for ${filePath}. Generating within ${outputDir}`);
    
    const result = await imagemin([filePath], {
        destination: outputDir,
        plugins: [
          imageminJpegtran(), // JPEG optimization
          imageminPngquant({ quality: [0.6, 0.8] }), // PNG optimization
          imageminGifsicle(), // GIF optimization
          imageminSvgo() // SVG optimization
        ]
    });

    const outputFileName = result[0].destinationPath;

    return outputFileName;
}

export default compressImage;