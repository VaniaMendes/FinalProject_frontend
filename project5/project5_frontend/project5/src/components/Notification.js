import React, { useEffect, useState } from "react";
import { showNotificationsPainel } from "../stores/boardStore";
import {RiCloseFill } from "react-icons/ri";
import {getNotifications, markedNotificationsAsRead} from '../endpoints/messages';
import {userStore} from '../stores/UserStore';
import { IntlProvider, FormattedMessage } from "react-intl";
import languages from "../translations";

function Notification() {
  const [notifications, setNotifications] = useState([]);

 //Obtem a linguagem de exibição da página
 const locale = userStore((state) => state.locale);

  //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  console.log(notifications);

  const { setShowNotifications} = showNotificationsPainel();

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await getNotifications(tokenUser);
      await markedNotificationsAsRead(tokenUser);
      console.log(notifications);
       // Formatar o timestamp de cada mensagem
  const formattedResult = notifications.map(msg => {
    const date = new Date(msg.timestamp);
    msg.timestamp = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return msg;
  });
      
        setNotifications(formattedResult); // Alteração aqui para definir as notificações diretamente
      };
  
      fetchNotifications();
  }, [tokenUser]);

  const closeModal = () => {
    setShowNotifications(false);
    
  };

  console.log(notifications);

  return (
    <div className="notification_container">
       <IntlProvider locale={locale} messages={languages[locale]}>
      <div className="notification_modal">
        <h1 className="title">Notifications</h1>
        <button className="close" onClick={closeModal}><RiCloseFill /></button>
      </div>
      <div className="notification_body">
        <div className="notification_list">
          {Array.isArray(notifications) && notifications.map((notification, index) => (
            <p className = "item-notification" key={index}><FormattedMessage id="notification">

              
            {(message) => <span>{message} </span>}  </FormattedMessage> 
            <a href= {`http://localhost:3000/profile/${notification.sender.username}`}>{notification.sender.username}</a>  {notification.timestamp} 
         
              
            </p>
          ))}
        </div>
      </div>
      </IntlProvider>
    </div>
  );
}

export default Notification;