import React, { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { RiEdit2Fill } from "react-icons/ri";
import { getUserByToken } from "../endpoints/users";
import { useNavigate } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { myTasks } from "../endpoints/tasks";
import { showMyTasks, showModal, showMessages } from "../stores/boardStore";
import WebSocketClient from "./websocket";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";
import {notificationStore} from '../stores/NotificationStore';
import {getNotificationsUnRead} from '../endpoints/messages';
import { DiScrum } from "react-icons/di";


function SideMenu() {
  //Obtem o tipo de utilizador da store
  const { role, setRole } = userStore();

  //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  //Estado para mostrar o comoponente do chat
  const { setShowMessageChat } = showMessages();


  //Obtem o estado de ativação do filtro
  const { setFilterOn } = showModal();
    //Obtem  o estado de exibição das tarefas apenas do utilizador
    const { setShowUserTasks } = showMyTasks();


  //Estado para guardar os dados do utilizador
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();



 

  //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);
 
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


  //Função para navegar para a página de edição de perfil
  const handleClick = () => {
    navigate("/myProfile");
    setFilterOn(false);
    setShowUserTasks(false);
    setShowMessageChat(false);
  };

  const homeClick = () => {
    navigate("/principalPage");
    setFilterOn(false);
    setShowUserTasks(false);
    setShowMessageChat(false);
  };


  //Função para consultar apenas as tarefas do próprio utilizador
  const handleMyTaks = async (tokenUser) => {
    navigate("/principalPage");

    //Vai buscar as tasks do user que está logado
    const result = await myTasks(tokenUser);

    if (result !== null) {
      userStore.getState().setMyTasks(result); //Guarda a lista de tasks na store
      setShowUserTasks(true); //Ativa o estado de exibição das próprias tarefas
    } else {
      NotificationManager.warning("No tasks found", "", 800);
    }
  };

   
  return (
    <div>
      <IntlProvider locale={locale} messages={languages[locale]}>
        <div id="side_menu">
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

              <div className="menuSide">
                <div className="menuPO">
                 
                  <ul className="menu_list">  
                    
                   
                    <li className="item_PO" id="profile" onClick={homeClick}><DiScrum />
                    <FormattedMessage id="scrumBoard">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                    </li>
                    <li className="item_PO" id="profile" onClick={handleClick}>
                      <RiEdit2Fill /> <FormattedMessage id="myProfile">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                    </li>

                    <li
                      className="item_PO"
                      onClick={() => handleMyTaks(tokenUser)}
                    >
                      <BiTask /> <FormattedMessage id="myTasks">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IntlProvider>
    
    </div>
  );
}

export default SideMenu;
