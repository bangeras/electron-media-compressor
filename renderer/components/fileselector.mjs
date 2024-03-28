import React, { useRef, useState, useEffect } from 'react';
import compressIcon from '../images/compress.png';
import deleteIcon from '../images/delete.png';
import LoadingIcons from 'react-loading-icons';
import MediaPlayer from './mediaplayer.mjs';
import { toast } from 'react-toastify';
import { logger } from '../../common/logger.mjs';

const FileSelector = () => {
    const [filesGrid, setFilesGrid] = useState([]);
    const [isCompressAllButtonDisabled, setIsCompressAllButtonDisabled] = useState(false);

    // Special mechanism to access the React State within Event listeners/Callbacks (of )
    const filesGridRef = useRef(filesGrid);
    const setFilesGridRef = (data) => {
        filesGridRef.current = data;
        setFilesGrid(data);
    };

    // Array to hold refs for each item
    const loadingIconRefs = useRef([]);
    const mediaPlayerRefs = useRef([]);
    const fileGridRef = useRef(null);
    const compressAllButtonRef = useRef(null);

    useEffect(() => {
        // This function will be invoked only once after component mount
        logger.info('FileSelector mounted');
        // You can perform any one-time setup or initialization here

        onAlertMessageHandler();
        onFilesMetadataResponseHandler();
        onCompressFileResponseHandler();
    }, []); // Empty dependency array indicates that the effect should run only once

    useEffect(() => {
        logger.info(`useEffect for filesGrid..`);
    }, [filesGrid]);

    const onAlertMessageHandler = ()=>{
        window.electronApis.filesApi.onAlertMessage((message)=>{
            console.error('Alert:', message, filesGridRef.current);
            toast.error(message);
        });
    };
    
    const onFilesMetadataResponseHandler = () => {
        window.electronApis.filesApi.onFilesMetadataResponse((filesGrid)=>{
            setFilesGridRef(filesGrid);
            fileGridRef.current.hidden = false // Display the File grid after metadata is ready to display
        });
    };

    const onCompressFileResponseHandler = () => {
        window.electronApis.filesApi.onCompressFileResponse((index, compressedFilesGrid)=>{
            const currentStateData = filesGridRef.current;
            const updatedData = compressedFilesGrid[index];

            //Create new object inorder to update the state:
            const result = [];
            for (let i=0; i < currentStateData.length; i++){
                const fileData = (i === index) ? updatedData : currentStateData[i];
                result.push(fileData);
            }

            setFilesGridRef(result);
    
            fileGridRef.current.hidden = false // Display the File grid after metadata is ready to display
            loadingIconRefs.current[index].hidden = true; // hide the spinner
            mediaPlayerRefs.current[index].hidden = false; // display the launch file icon
        });
    };

    const getSelectedFilesMetadata = (filesGrid) => {
        logger.info("FileSelector.mjs getSelectedFilesMetadata() invoked.");
        disableCompressAllButton(false);
        window.electronApis.filesApi.getFilesMetadata(filesGrid);
    };

    const compressFile = (index, filePath, filesGrid)=>{
        logger.info(`compressFile() for ${filePath} at ${index}`);

        loadingIconRefs.current[index].hidden = false; // load the spinner
        mediaPlayerRefs.current[index].hidden = true; // display the launch file icon

        window.electronApis.filesApi.compressFile(index, filePath, filesGrid);
    };

    const compressAllFiles = (filesGrid)=>{
        logger.info('compressAllFiles()..');

        disableCompressAllButton(true);

        filesGrid.map((fileMetadata, index) => {
            compressFile(index, fileMetadata.filePath, filesGrid);
        });
 
    }

    const deleteFileAtIndex = (index)=>{
        logger.info(`deleteFile() for ${filesGrid[index]}`);
        
        //Create new object inorder to update the state:
        const result = [];
        for (let i=0; i < filesGrid.length; i++){
            const fileData = filesGrid[i];
            if (i !== index) result.push(fileData);
        }
                
        setFilesGridRef(result);
    };

    const disableCompressAllButton = (isDisabled) => {
        if (compressAllButtonRef.current) compressAllButtonRef.current.disabled = isDisabled ? true : false;
        setIsCompressAllButtonDisabled(isDisabled ? true : false);
    };


    return (
        <div>
            <div className="container">
                <button  className='button' onClick={(e) => getSelectedFilesMetadata (filesGrid)}>Choose file(s)</button>
                { filesGrid.length !== 0 ? (<button ref={compressAllButtonRef} className={ isCompressAllButtonDisabled ? 'button disabled-button' : 'button' }  onClick={(e) => compressAllFiles (filesGrid)}>Compress All</button>) : ''}
            </div>
            
            <div >
                <table ref={fileGridRef} hidden className='table-container'>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>File</th>
                            <th>Original</th>
                            <th>Compressed</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        filesGrid.map((fileMetadata, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="icon-container">
                                        <img src={deleteIcon} width={20} height={20} onClick={(e) => deleteFileAtIndex(index)} ></img>
                                        <img src={compressIcon} width={20} height={20} onClick={(e) => compressFile(index, fileMetadata.filePath, filesGrid)} ></img>
                                    </div>
                                </td>
                                <td>
                                    <div className="icon-container">
                                        <div ref={el => (loadingIconRefs.current[index] = el) } hidden> <LoadingIcons.Rings stroke="Blue" strokeOpacity={.125} speed={0.75}  /></div>
                                        <div ref={el => (mediaPlayerRefs.current[index] = el) }>
                                            <MediaPlayer filePath={fileMetadata.outputFilePath} fileType={fileMetadata.outputFileType}></MediaPlayer> 
                                        </div>
                                    </div>
                                </td>
                                <td><div></div>{fileMetadata.fileName} </td>
                                <td>{((fileMetadata.fileStat.size)/1024/1024).toFixed(2)} Mb</td> 
                                <td>
                                    { fileMetadata.outputFileStat ? (((fileMetadata.outputFileStat.size)/1024/1024).toFixed(2)) + 'Mb' : '' }
                                    
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                
            </div>
        </div>
    )
}

export default FileSelector