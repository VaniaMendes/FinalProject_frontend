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
import { notificationStore } from "../stores/NotificationStore";
import { getNotificationsUnRead } from "../endpoints/messages";
import { DiScrum } from "react-icons/di";
import { FaUsers } from "react-icons/fa6";
import { MdTask } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { BiTaskX } from "react-icons/bi";

function Menu() {
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
    setShowUserTasks(true);
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

  // Função para lidar com a exibição da tabela de utilizadores
  const handleShowUserTable = () => {
    navigate("/activeUsers");
  };

  // Função para lidar com a exibição da tabela de tarefas inativas
  const handleInativeTasks = () => {
    navigate("/deletedTasks");
  };

  //Estado para controlar a exibição dos botões
  const [showButtons, setShowButtons] = useState(false);

  //Função para exibir ou ocultar os botoes associados ao botão USERS
  const seeButtons = () => {
    setShowButtons(!showButtons);
  };

  // Função para exibir a tabela de categorias
  const handleShowCategoriesTable = () => {
    navigate("/categories");
  };

  // Função para exibir a tabela de utilizadores inativos
  const handleInativeUsers = () => {
    navigate("/inactiveUsers");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="menuSide">
      <IntlProvider locale={locale} messages={languages[locale]}>
        <div className="menuPO">
          <ul className="menu_list">
            <li className="item_PO" id="profile" onClick={homeClick}>
              <DiScrum />
              <FormattedMessage id="scrumBoard">
                {(message) => <span>{message}</span>}
              </FormattedMessage>
            </li>
            <li className="item_PO" id="profile" onClick={handleClick}>
              <RiEdit2Fill />{" "}
              <FormattedMessage id="myProfile">
                {(message) => <span>{message}</span>}
              </FormattedMessage>
            </li>

            <li className="item_PO" onClick={() => handleMyTaks(tokenUser)}>
              <BiTask />{" "}
              <FormattedMessage id="myTasks">
                {(message) => <span>{message}</span>}
              </FormattedMessage>
            </li>

            {(role === "developer" || role === "scrum_master") && (
              <li className="item_PO" onClick={handleShowUserTable}>
                {" "}
                <FaUsers />{" "}
                <FormattedMessage id="users">
                  {(message) => <span>{message}</span>}
                </FormattedMessage>
              </li>
            )}

            {role === "scrum_master" && (
              <li className="item_PO" onClick={handleInativeTasks}>
                {" "}
                <MdTask />{" "}
                <FormattedMessage id="deletedTasks">
                  {(message) => <span>{message}</span>}
                </FormattedMessage>
              </li>
            )}

            {role === "product_owner" && (
              <ul>
                <li className="item_PO" onClick={seeButtons}>
                  {" "}
                  <FaUsers />
                  <FormattedMessage id="users">
                    {(message) => <span>{message}</span>}
                  </FormattedMessage>
                </li>
                {showButtons && (
                  <ul>
                    <li
                      className="item_PO"
                      id="active"
                      onClick={handleShowUserTable}
                    >
                      <FaUserCheck className="icon" />

                      <FormattedMessage id="active">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                    </li>
                    <li
                      className="item_PO"
                      id="active"
                      onClick={handleInativeUsers}
                    >
                      <FaUserAltSlash className="icon" />

                      <FormattedMessage id="inactive">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                    </li>
                  </ul>
                )}
                <li className="item_PO" onClick={handleInativeTasks}>
                  {" "}
                  <BiTaskX />
                  <FormattedMessage id="deletedTasks">
                    {(message) => <span>{message}</span>}
                  </FormattedMessage>
                </li>
                <li className="item_PO" onClick={handleShowCategoriesTable}>
                  <BiSolidCategoryAlt />{" "}
                  <FormattedMessage id="categories">
                    {(message) => <span>{message}</span>}
                  </FormattedMessage>
                </li>
                <li className="item_PO" onClick={handleDashboard}>
                  {" "}
                  <AiFillDashboard />{" "}
                  <FormattedMessage id="dashboard">
                    {(message) => <span>{message}</span>}
                  </FormattedMessage>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </IntlProvider>
    </div>
  );
}

export default Menu;
