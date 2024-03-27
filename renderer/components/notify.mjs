import React from 'react'


const Notify = (props) => {
    const sendNotification = async () => {
        console.log("notify.mjs sendNotification() invoked..")
        await window.electronApis.notificationApi.sendNotification("Notification from renderer(react app)");
    };

    return (
        <div>
            <button onClick={sendNotification}>Notify</button>
        </div>
    )
};

export default Notify