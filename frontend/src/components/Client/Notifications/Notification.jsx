import React, { useState } from "react";
import './Notification.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notification = ({ notification, seeNotification }) => {
    const [seen, setSeen] = useState(false);


    return (
        <div className="alert alert-dismissible fade show" role="alert" hidden={seen}>
            {notification.desc}
            <FontAwesomeIcon className='seen_btn' icon="fa-solid fa-check" onClick={() => setSeen(true)}/>
        </div>
        // <div className="notification">
        //     <br />
        //     <div id="container">
        //         <div id="success-box" onClick={() => seeNotification(notification.id)}>
        //             <div className="dot"></div>
        //             <div className="dot two"></div>
        //             <div className="face">
        //                 <div className="eye"></div>
        //                 <div className="eye right"></div>
        //                 <div className="mouth happy"></div>
        //             </div>
        //             <div className="shadow scale"></div>
        //             <div className="message"><h1 className="alert">New Notification</h1><p>{notification.desc}</p></div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Notification;