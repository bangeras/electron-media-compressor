import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import getFilePath, { getDocumentsPath } from './filePath.mjs';
import { app } from 'electron';
import path from 'path';
import { logger } from '../../common/logger.mjs';

ffmpeg.setFfmpegPath(ffmpegPath.path);

const compressVideo = async(filePath) => {
  const outputDir = getFilePath(getDocumentsPath(), app.getName());
  const outputFileName = path.join(outputDir, path.basename(filePath));
  logger.info(`videoCompressor.compressVideo() for ${filePath}. Generating ${outputFileName}`);
  
  const bitrate = '500k'; // Set the desired bitrate for compression

  
  await new Promise((resolve, reject) => {
    ffmpeg(filePath)
    .videoBitrate(bitrate)
    .on('error', err => {
      logger.error(`Error compressing video: ${err}`);
      reject(err);
    })
    .on('end', () => {
      logger.info(`Video compression complete! Saved to ${outputFileName}`);
      resolve();
    })
    .saveToFile(outputFileName);
  })

  return outputFileName;
}

export default compressVideo;