import React, { useEffect, useState } from "react";
import { notificationStore } from "../stores/NotificationStore";
import { showNotificationsPainel } from "../stores/boardStore";
import {RiCloseFill } from "react-icons/ri";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const { notifications: userNotifications } = notificationStore.getState();

  console.log(notifications);

  const {showNotifications, setShowNotifications} = showNotificationsPainel();

  useEffect(() => {
    const fetchNotifications = async () => {
        setNotifications(userNotifications); // Alteração aqui para definir as notificações diretamente
      };
  
      fetchNotifications();
  }, [userNotifications]);

  const closeModal = () => {
    setShowNotifications(false);
    
  };

  return (
    <div className = "notification_container">
        <div className="notification_modal">
      <h1 className="title" >Notifications</h1>
      <button className="close" onClick = {closeModal}><RiCloseFill/></button>     </div>
      <div className = "notification_body">
 <div className="notification_list">
      {Array.isArray(notifications) && notifications.map((notification, index) => (
  <p key={index}>{notification}</p>
))}
      </div>
      </div>
    </div>
  );
}

export default Notification;