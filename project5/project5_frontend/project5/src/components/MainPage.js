import React, { useEffect, useState } from "react";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";
import { userStore } from "../stores/UserStore";
import { IoNotifications } from "react-icons/io5";
import { notificationStore } from "../stores/NotificationStore";
import { showNotificationsPainel } from "../stores/boardStore";
import { getNotificationsUnRead } from "../endpoints/messages";
import Notification from "./Notification";
import Language from "./language";
import { FaPowerOff } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import {logout} from '../endpoints/users';
import { NotificationManager } from "react-notifications";
import {cleanBoardStore } from "../stores/boardStore";
import { HiHome } from "react-icons/hi2";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

function HomePage() {
  //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;


  const [timerValue, setTimerValue] = useState("");

   const [showTimerSettings, setShowTimerSettings] = useState(false);
  

  const navigate = useNavigate();

  const { showNotifications, setShowNotifications } = showNotificationsPainel();

  const { clearNotifications, setNotifications } = notificationStore();
  const notifications = notificationStore((state) => state.notifications);
  //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);

  // Efeito para buscar os dados do usuário ao montar o componente
  useEffect(() => {
    async function fetchData() {
      try {
        //Quando cria o componente vai buscar a lista de mensagens não lidas do utilizador e coloca-as na store
        const unreadNotifications = await getNotificationsUnRead(tokenUser);
      

        setNotifications(unreadNotifications);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    }
    fetchData();
  }, [tokenUser]);

  const handleOpenNotifications = () => {
    clearNotifications();
    setShowNotifications(true);
  };

  const handleViewNotifications = () => {
    setShowNotifications(true);
   
  }


   //Função para efetuar o logout
   const logoutClick = async (event) => {
    event.preventDefault();
    try {
      const result = await logout(tokenUser);

      if (result === true) {
        // Limpa a store e o boardStore 
      cleanBoardStore();
      
      userStore.getState().setToken("");
      // Navega para a página de login após a limpeza
      navigate("/login");
      

      NotificationManager.success("Logout successfully");
      } else {
        console.log("Erro ao buscar dados do usuário:", result.error);
      }
    } catch (error) {
      console.log("Erro durante logout", error);
    }
  };

    //Função para navegar para a página principal
    const homeclick = () => {

      navigate("/principalPage");
    };

    const toggleTimerSettings = () => {
      setShowTimerSettings(true);
    };

    const handleSessionTimeOut = () => {
      setShowTimerSettings(false);
    }
  

  return (
    <IntlProvider locale={locale} messages={languages[locale]}>
      <div id="login_body">
        <div id="body_color">
          {tokenUser && ( 
            <>
          <div
            className="notifications_button"
            onClick={
              handleViewNotifications
            }
          >
            <IoNotifications />
          </div>
          <div className = "home_button" onClick={homeclick}><HiHome/></div>
          <div className="logout_buttoon" title= "Logout" onClick={logoutClick}>
            <FaPowerOff />
           
          </div>
          <div className="timer_button" title= "Time Out" onClick={toggleTimerSettings}><MdOutlineAccessTimeFilled/></div>
          </>
          )}
          <div className="location">
            <Language />
          </div>
          
          <div className="notification-icon">
            {notifications && notifications.length > 0 && (
              <div
                className="notification-badge"
                onClick={() => {
                  handleOpenNotifications()
                }}
              >
                {notifications.length}
              </div>
            )}
          </div>
          {/* Html para o div para definir o sessiont time out*/}
          {showTimerSettings && (
        <aside className="timer_settings">
      
          <div className="timer_settings_title">
            <FormattedMessage id="timerSettings">
              {(message) => <span>{message}</span>}
            </FormattedMessage>
         
          <input type="number" min="0" placeholder="Time in minutes" value={timerValue} onChange={(e) =>setTimerValue(e.target.value)}></input>
          <button type="button" onClick={handleSessionTimeOut}>OK</button>
          </div>
      
        </aside>
      )}
   
        </div>
        <div id="aside_color"></div>
        <header>
          <h1 id="page-logo">
            <img src={"/scrum_image.png"} id="scrum_img" alt="App logo" />
            &nbsp;AgileUp
          </h1>
        </header>

  
        <div className="footer">
          <div>
            <FormattedMessage id="poweredBy">
              {(message) => <span>{message}</span>}
            </FormattedMessage>
          </div>
          <ul>
            <li>Vânia Mendes</li>
          </ul>
          <br />
          <p>© Acertar o Rumo 2024</p>
        </div>
        {showNotifications && <Notification />}
      </div>
    </IntlProvider>
  );
}

export default HomePage;
