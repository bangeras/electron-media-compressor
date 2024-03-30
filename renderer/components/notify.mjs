import React from 'react'
import { logger } from '../../common/logger.mjs';


const Notify = (props) => {
    const sendNotification = async () => {
        logger.info("notify.mjs sendNotification() invoked...")
        await window.electronApis.notificationApi.sendNotification("Notification from renderer(react app)");
    };

    return (
        <div>
            <button onClick={sendNotification}>Notify</button>
        </div>
    )
};

export default Notify