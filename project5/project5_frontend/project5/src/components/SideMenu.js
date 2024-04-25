import React, { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import "react-notifications/lib/notifications.css";
import { getUserByToken } from "../endpoints/users";
import WebSocketClient from "./websocket";
import {notificationStore} from '../stores/NotificationStore';
import {getNotificationsUnRead} from '../endpoints/messages';
import Menu from './Menu';


function SideMenu() {
  //Obtem o tipo de utilizador da store
  const { role, setRole } = userStore();

  //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;


  //Estado para guardar os dados do utilizador
  const [userData, setUserData] = useState({});



 
  const { setNotifications } = notificationStore();
  WebSocketClient();


  // Efeito para buscar os dados do usuário ao montar o componente
  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserByToken(tokenUser);
        setUserData(user);
        setRole(user.typeOfUser);

        //Quando cria o componente vai buscar a lista de mensagens não lidas do utilizador e coloca-as na store
        const unreadNotifications = await getNotificationsUnRead(tokenUser);
       

        setNotifications(unreadNotifications);
       
        
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    }
    fetchData();
  }, [tokenUser, setRole, setNotifications]);

   
  return (


        <div className= "side_menu" id="side_menu">
          <div id="menu">
            <div className="menu_image" id="user_name">
              <div id="user_info">
                              
                <img
                  id="user_img"
                  src={userData && userData.imgURL}
                  alt="User logo"
                />
                <span className="welcome">
                  {userData && userData.firstName}
                </span>
              </div>
<div className="menuForTablet">
              <Menu/></div>
            </div>
          </div>
        </div>

  );
}

export default SideMenu;
