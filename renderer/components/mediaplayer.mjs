import React, { useRef, useState, useEffect } from 'react';
import { FILETYPES } from '../../common/fileType.mjs';
import cameraIcon from '../images/camera.png';
import videoIcon from '../images/video.png';
import infoIcon from '../images/info.png';
import { toast } from 'react-toastify';

const MediaPlayer = (props) => {

    useEffect(() => {
        console.log('useEffect called..', props.filePath, props.FileType);
    }, []); 

    const openMedia = (filePath)=>{
        console.log('openMedia for ', filePath);
        window.electronApis.filesApi.openNativeFile(filePath);
    };

    const displayFileInfo = (filePath) => {
        toast.info(`Located at ${filePath}`);
    };

    return (
        <div>
            <p>
                {props.filePath ? (<img src={infoIcon} width={20} height={20} onClick={(e) => displayFileInfo(props.filePath)} ></img>) : ''}
                {props.filePath && props.fileType === FILETYPES.IMAGE ? ( <img src={cameraIcon} width={20} height={20} onClick={(e) => openMedia(props.filePath)} alt='Open Image'></img>): ''} 
                {props.filePath && props.fileType === FILETYPES.VIDEO ? ( <img src={videoIcon} width={20} height={20} onClick={(e) => openMedia(props.filePath)} alt='Open Video'></img>): ''} 
            </p>
        </div>
    )
        
}

export default MediaPlayer