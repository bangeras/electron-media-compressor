
const FILETYPES = {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio'
};

const getFileType = (filepath) => {
    const extension = filepath.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    const videoExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'];
    const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'];
  
    if (imageExtensions.includes(extension)) {
      return FILETYPES.IMAGE;
    } else if (videoExtensions.includes(extension)) {
      return FILETYPES.VIDEO;
    } else if (audioExtensions.includes(extension)) {
      return FILETYPES.AUDIO;
    } else {
      return 'unknown';
    }
};

export default getFileType;

export {
    FILETYPES
};