import React, { useState, useContext } from 'react';
import './Notification.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from "../../../context/AuthContext";
import { useNotifications } from "../../../hooks/useNotifications";

const Notification = ({ notification,  }) => {
    const { isAuth } = useContext(AuthContext);
    const { useSeeNotification } = useNotifications();
    const [seen, setSeen] = useState(false);

    const notificationSeen = (id) => {
        if (isAuth) {
            useSeeNotification(id);
            setSeen(true);
        } else {
            console.log('login');
        }
    }

    return (
        <div className="alert alert-dismissible fade show" role="alert" hidden={seen}>
            {notification.desc}
            <FontAwesomeIcon className='seen_btn' icon="fa-solid fa-check" onClick={() => notificationSeen(notification.id)}/>
        </div>
    )
}

export default Notification;